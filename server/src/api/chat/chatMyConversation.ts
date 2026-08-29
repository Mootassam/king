import ApiResponseHandler from "../apiResponseHandler";
import Error403 from "../../errors/Error403";
import ChatServices from "../../services/chatServices";

export default async (req, res) => {
  try {
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403();
    }

    const payload = await new ChatServices(req).myConversation();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
