import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("chatMessage");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const ChatMessageSchema = new Schema(
    {
      conversation: {
        type: Schema.Types.ObjectId,
        ref: "chatConversation",
        required: true,
      },

      sender: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      senderType: {
        type: String,
        enum: ["customer", "admin"],
        required: true,
      },

      type: {
        type: String,
        enum: ["text", "image"],
        default: "text",
      },

      text: { type: String },
      attachmentUrl: { type: String },

      readByAdmin: { type: Boolean, default: false },
      readByCustomer: { type: Boolean, default: false },

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

  ChatMessageSchema.index({ conversation: 1, createdAt: 1 });

  ChatMessageSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  ChatMessageSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ChatMessageSchema.set("toJSON", { getters: true });
  ChatMessageSchema.set("toObject", { getters: true });

  return database.model("chatMessage", ChatMessageSchema);
};
