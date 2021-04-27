import request from '../request';
import config from '../../config';

class CustomersApi {
  constructor() {
    this.pathName = `customers`;
  }

  async getCustomers() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addCustomer(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getCustomerById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updateCustomer(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `PUT`, body);
  }

  async deleteCustomer(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `DELETE`);
  }
}

export default new CustomersApi();
