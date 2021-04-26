import request from '../request';
import config from '../../config';

class OrderStatusesApi {
    constructor() {
        this.pathName = `order_statuses`
    }

    async getOrderStatuses() {
        return await request(`${config.serverAPIurl}/${this.pathName}`);
    }

    async addOrderStatuses(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
    }

    async getOrderStatusById(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
    }

    async updateOrderStatuses(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
    }

    async deleteOrderStatuses(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
    }
}

export default new OrderStatusesApi();