import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class ChatService {
  static async listConversations(filter, orderBy = '', limit = 0, offset = 0) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/chat/conversations`,
      { params: { filter, orderBy, limit, offset } },
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

  static async closeConversation(conversationId) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/chat/conversations/${conversationId}/close`,
    );
    return response.data;
  }

  static async reopenConversation(conversationId) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/chat/conversations/${conversationId}/reopen`,
    );
    return response.data;
  }

  static async getSettings() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(`/tenant/${tenantId}/settings`);
    return response.data;
  }

  static async saveSettings(settings) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(`/tenant/${tenantId}/settings`, {
      settings,
    });
    return response.data;
  }
}
