import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import chatConversation from "../models/chatConversation";
import chatMessage from "../models/chatMessage";
import user from "../models/user";

class ChatRepository {
  static async findOrCreateForCustomer(options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      chatConversation(options.database)
        .findOne({
          tenant: currentTenant.id,
          customer: currentUser.id,
        })
        .populate("customer"),
      options
    );

    if (!record) {
      const [created] = await chatConversation(options.database).create(
        [
          {
            tenant: currentTenant.id,
            customer: currentUser.id,
            status: "open",
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
          },
        ],
        options
      );

      record = await chatConversation(options.database)
        .findById(created._id)
        .populate("customer");
    }

    return record;
  }

  static async findConversationById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const record: any = await MongooseRepository.wrapWithSessionIfExists(
      chatConversation(options.database)
        .findById(MongooseQueryUtils.uuid(id))
        .populate("customer"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return record;
  }

  static async listConversations(
    { filter, limit = 0, offset = 0, orderBy = "" }: any,
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [{ tenant: currentTenant.id }];

    if (filter) {
      if (filter.status) {
        criteriaAnd.push({ status: filter.status });
      }

      if (filter.search) {
        const matchingUsers = await user(options.database)
          .find({
            $or: [
              {
                email: {
                  $regex: MongooseQueryUtils.escapeRegExp(filter.search),
                  $options: "i",
                },
              },
              {
                fullName: {
                  $regex: MongooseQueryUtils.escapeRegExp(filter.search),
                  $options: "i",
                },
              },
            ],
          })
          .select("_id");

        criteriaAnd.push({
          customer: { $in: matchingUsers.map((u) => u._id) },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "lastMessageAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const rows = await chatConversation(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("customer");

    const count = await chatConversation(options.database).countDocuments(
      criteria
    );

    return { rows, count };
  }

  static async listMessages(
    conversationId,
    { limit = 0, offset = 0 }: any,
    options: IRepositoryOptions
  ) {
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { conversation: conversationId };

    const rows = await chatMessage(options.database)
      .find(criteria)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limitEscaped);

    const count = await chatMessage(options.database).countDocuments(
      criteria
    );

    return { rows, count };
  }

  static async createMessage(
    conversationId,
    data: {
      senderType: "customer" | "admin";
      type?: "text" | "image";
      text?: string;
      attachmentUrl?: string;
    },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const conversation = await this.findConversationById(
      conversationId,
      options
    );

    const type = data.type || "text";
    const senderType = data.senderType;

    const [created] = await chatMessage(options.database).create(
      [
        {
          tenant: currentTenant.id,
          conversation: conversation.id,
          sender: currentUser.id,
          senderType,
          type,
          text: data.text,
          attachmentUrl: data.attachmentUrl,
          readByAdmin: senderType === "admin",
          readByCustomer: senderType === "customer",
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options
    );

    const preview = type === "image" ? "📷 Photo" : data.text || "";

    const setFields: any = {
      lastMessage: preview,
      lastMessageType: type,
      lastMessageAt: new Date(),
      lastSenderType: senderType,
      updatedBy: currentUser.id,
    };

    const incField: any =
      senderType === "customer"
        ? { unreadByAdmin: 1 }
        : { unreadByCustomer: 1 };

    if (senderType === "customer") {
      setFields.status = "open";
    }

    await chatConversation(options.database).updateOne(
      { _id: conversation.id },
      { $set: setFields, $inc: incField },
      options
    );

    const message = await chatMessage(options.database).findById(created._id);
    const updatedConversation = await this.findConversationById(
      conversation.id,
      options
    );

    return { message, conversation: updatedConversation };
  }

  static async closeConversation(conversationId, options: IRepositoryOptions) {
    const conversation = await this.findConversationById(
      conversationId,
      options
    );

    await chatConversation(options.database).updateOne(
      { _id: conversation.id },
      { $set: { status: "closed" } },
      options
    );

    return this.findConversationById(conversationId, options);
  }

  static async reopenConversation(conversationId, options: IRepositoryOptions) {
    const conversation = await this.findConversationById(
      conversationId,
      options
    );

    await chatConversation(options.database).updateOne(
      { _id: conversation.id },
      { $set: { status: "open" } },
      options
    );

    return this.findConversationById(conversationId, options);
  }

  static async deleteConversation(conversationId, options: IRepositoryOptions) {
    const conversation = await this.findConversationById(
      conversationId,
      options
    );

    await chatMessage(options.database).deleteMany(
      { conversation: conversation.id },
      options
    );

    await chatConversation(options.database).deleteOne(
      { _id: conversation.id },
      options
    );

    return conversation;
  }

  static async markRead(
    conversationId,
    side: "admin" | "customer",
    options: IRepositoryOptions
  ) {
    const conversation = await this.findConversationById(
      conversationId,
      options
    );

    const counterField = side === "admin" ? "unreadByAdmin" : "unreadByCustomer";
    const readField = side === "admin" ? "readByAdmin" : "readByCustomer";
    const oppositeSenderType = side === "admin" ? "customer" : "admin";

    await chatConversation(options.database).updateOne(
      { _id: conversation.id },
      { $set: { [counterField]: 0 } },
      options
    );

    await chatMessage(options.database).updateMany(
      { conversation: conversation.id, senderType: oppositeSenderType },
      { $set: { [readField]: true } },
      options
    );
  }
}

export default ChatRepository;
