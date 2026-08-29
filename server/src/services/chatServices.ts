import Error403 from "../errors/Error403";
import MongooseRepository from "../database/repositories/mongooseRepository";
import ChatRepository from "../database/repositories/chatRepository";
import PermissionChecker from "./user/permissionChecker";
import Roles from "../security/roles";
import settings from "../database/models/settings";
import { IServiceOptions } from "./IServiceOptions";

export default class ChatServices {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  get isAdmin() {
    const roles = new PermissionChecker(this.options).currentUserRolesIds;
    return (
      roles.includes(Roles.values.admin) || roles.includes(Roles.values.agent)
    );
  }

  _assertCanAccess(conversation) {
    if (this.isAdmin) {
      return;
    }

    const customerId = conversation.customer.id || conversation.customer;

    if (String(customerId) !== String(this.options.currentUser.id)) {
      throw new Error403(this.options.language);
    }
  }

  async myConversation() {
    return ChatRepository.findOrCreateForCustomer(this.options);
  }

  async _isReopenAllowed() {
    const currentTenant = MongooseRepository.getCurrentTenant(this.options);
    const record = await settings(this.options.database).findOne({
      tenant: currentTenant.id,
    });
    return !record || record.chatAllowReopenClosed !== false;
  }

  async listConversations(query, io?) {
    if (!this.isAdmin) {
      throw new Error403(this.options.language);
    }

    const { rows, count } = await ChatRepository.listConversations(
      query,
      this.options
    );

    const decorated = rows.map((row: any) => {
      const obj = row.toObject ? row.toObject() : row;
      const customerId = String(obj.customer?.id || obj.customer);
      obj.online = Boolean(io && io.users && io.users[customerId]);
      return obj;
    });

    return { rows: decorated, count };
  }

  async listMessages(conversationId, query, io?) {
    const conversation = await ChatRepository.findConversationById(
      conversationId,
      this.options
    );

    this._assertCanAccess(conversation);

    const isAdmin = this.isAdmin;

    await ChatRepository.markRead(
      conversationId,
      isAdmin ? "admin" : "customer",
      this.options
    );

    const result = await ChatRepository.listMessages(
      conversationId,
      query,
      this.options
    );

    // The unread counter is shared across the whole support team, so once
    // one agent reads it, refresh everyone's sidebar/topbar badge.
    if (isAdmin && io && conversation.unreadByAdmin > 0) {
      io.emit("admin", "customerSupport");
    }

    return { ...result, conversation };
  }

  async sendMessage(conversationId, data, io?) {
    const conversation = await ChatRepository.findConversationById(
      conversationId,
      this.options
    );

    this._assertCanAccess(conversation);

    const senderType = this.isAdmin ? "admin" : "customer";

    if (
      senderType === "customer" &&
      conversation.status === "closed" &&
      !(await this._isReopenAllowed())
    ) {
      throw new Error403(this.options.language);
    }

    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const { message, conversation: updated } =
        await ChatRepository.createMessage(
          conversationId,
          { ...data, senderType },
          { ...this.options, session }
        );

      await MongooseRepository.commitTransaction(session);

      if (io) {
        const customerId = String(
          updated.customer.id || updated.customer
        );
        const payload = { message, conversation: updated };

        // Broadcast to the customer (their other tabs/devices included)
        // and to every admin/agent watching the inbox, so a reply from one
        // agent shows up live for colleagues too.
        io.to(`user:${customerId}`).emit("chat:message", payload);
        io.to("admins").emit("chat:message", payload);

        // Refresh the sidebar/topbar unread badge for every connected admin,
        // even ones not currently on the Customer Support page — reuses the
        // same "admin" broadcast the rest of the app already listens to.
        if (senderType === "customer") {
          io.emit("admin", "customerSupport");
        }
      }

      return message;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async close(conversationId, io?) {
    if (!this.isAdmin) {
      throw new Error403(this.options.language);
    }

    const conversation = await ChatRepository.closeConversation(
      conversationId,
      this.options
    );

    if (io) {
      const customerId = String(
        conversation.customer.id || conversation.customer
      );
      io.to(`user:${customerId}`).emit("chat:closed", { conversationId });
      io.to("admins").emit("chat:closed", { conversationId });
    }

    return conversation;
  }

  async reopen(conversationId, io?) {
    if (!this.isAdmin) {
      throw new Error403(this.options.language);
    }

    const conversation = await ChatRepository.reopenConversation(
      conversationId,
      this.options
    );

    if (io) {
      const customerId = String(
        conversation.customer.id || conversation.customer
      );
      io.to(`user:${customerId}`).emit("chat:reopened", { conversationId });
      io.to("admins").emit("chat:reopened", { conversationId });
    }

    return conversation;
  }
}
