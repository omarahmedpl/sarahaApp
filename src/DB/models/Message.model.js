import mongoose, { Schema, Types, model } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50000,
      trim: true,
    },
    accountId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || model("Message", messageSchema);
export default Message;
