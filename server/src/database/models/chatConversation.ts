import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("chatConversation");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const ChatConversationSchema = new Schema(
    {
      customer: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
      },

      lastMessage: { type: String },

      lastMessageType: {
        type: String,
        enum: ["text", "image"],
        default: "text",
      },

      lastMessageAt: { type: Date },

      lastSenderType: {
        type: String,
        enum: ["customer", "admin"],
      },

      unreadByAdmin: { type: Number, default: 0 },
      unreadByCustomer: { type: Number, default: 0 },

      autoReplySent: { type: Boolean, default: false },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      importHash: { type: String },
    },
    { timestamps: true }
  );

  ChatConversationSchema.index(
    { tenant: 1, customer: 1 },
    { unique: true }
  );

  ChatConversationSchema.index({ tenant: 1, lastMessageAt: -1 });

  ChatConversationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  ChatConversationSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ChatConversationSchema.set("toJSON", { getters: true });
  ChatConversationSchema.set("toObject", { getters: true });

  return database.model("chatConversation", ChatConversationSchema);
};
