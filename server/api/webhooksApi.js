import request from '../request';
import config from '../../config';

class WebhooksApi {
    constructor() {
        this.pathName = `shipping_methods`
    }

    async getWebhooks() {
        return await request(`${config.serverAPIurl}/${this.pathName}`);
    }

    async addWebhooks(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
    }

    async getWebhooksById(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
    }

    async updateWebhooks(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
    }

    async deleteWebhooks(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
    }
}

export default new WebhooksApi();