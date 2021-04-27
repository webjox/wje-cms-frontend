import request from '../request';
import config from '../../config';

class WebhooksApi {
  constructor() {
    this.pathName = `shipping_methods`;
  }

  async getWebhooks() {
    const result = await request(`${config.serverAPIurl}/${this.pathName}`);
    return result;
  }

  async addWebhooks(body) {
    const result = await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
    return result;
  }

  async getWebhooksById(id) {
    const result = await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
    return result;
  }

  async updateWebhooks(id, body) {
    const result = await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
    return result;
  }

  async deleteWebhooks(id) {
    const result = await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
    return result;
  }
}

export default new WebhooksApi();
