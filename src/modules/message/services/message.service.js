import Message from "../../../DB/models/Message.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { succuessResponse } from "../../../utils/response/succuess.response.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message, accountId } = req.body;
  const user = await User.findOne({ _id: accountId, deleted: false });
  if (user) {
    const sentMessage = await Message.create({
      message,
      accountId,
    });
    return succuessResponse({
      res,
      message: "Message Sent",
      data: { sentMessage },
      status: 201,
    });
  } else {
    return next(
      Object.assign(new Error("Recipient not found", { cause: 404 }))
    );
  }
});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { messageId } = req.params;
  const message = await Message.findOneAndDelete({
    _id: messageId,
    accountId: req.user._id,
  });
  if (message) {
    return succuessResponse({
      res,
      message: "Message Deleted Successfully",
      status: 200,
    });
  } else {
    return next(Object.assign(new Error("Message not found", { cause: 404 })));
  }
});
