import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class ChatService {
  static async myConversation() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/chat/conversation`,
    );
    return response.data;
  }

  static async listMessages(conversationId, { limit = 0, offset = 0 } = {}) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/chat/conversations/${conversationId}/messages`,
      { params: { limit, offset } },
    );
    return response.data;
  }

  static async sendMessage(conversationId, data) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.post(
      `/tenant/${tenantId}/chat/conversations/${conversationId}/messages`,
      { data },
    );
    return response.data;
  }

  static async getSettings() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(`/tenant/${tenantId}/settings`);
    return response.data;
  }
}
