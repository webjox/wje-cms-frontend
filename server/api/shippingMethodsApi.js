import request from '../request';
import config from '../../config';

class ShippingMethodsApi {
  constructor() {
    this.pathName = `shipping_methods`;
  }

  async getShippingMethods() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addShippingMethod(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getShippingMethodById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updateShippingMethod(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
  }

  async deleteShippingMethod(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
  }
}

export default new ShippingMethodsApi();
