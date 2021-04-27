import request from '../request';
import config from '../../config';

class PaymentMethodsApi {
  constructor() {
    this.pathName = `payment_methods`;
  }

  async getPaymentMethods() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addPaymentMethod(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getPaymentMethodById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updatePaymentMethod(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
  }

  async deletePaymentMethod(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
  }
}

export default new PaymentMethodsApi();
