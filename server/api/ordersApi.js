import request from '../request';
import config from '../../config';

class OrdersApi {
  constructor() {
    this.pathName = `orders`;
  }

  async getOrders(filter = {}) {
    let searchParams = '';
    for (let key in filter) {
      const replacedItem = filter[key].toString().replace(/ /g, '%20');
      searchParams += `${key}=${replacedItem}&`;
    }
    return await request(`${config.serverAPIurl}/${this.pathName}?${searchParams}`);
  }

  async addOrder(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getOrderById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updateOrder(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `PUT`, body);
  }

  async deleteOrder(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `DELETE`);
  }

  async recalculate(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/recalculate`, `PUT`);
  }

  async checkout(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/checkout`, `PUT`);
  }

  async cancel(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/cancel`, `PUT`);
  }

  async close(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/close`, `PUT`);
  }

  async updateBillingAddress(id, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/billing_address`,
      `PUT`,
      body,
    );
  }

  async updateShippingAddress(id, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/shipping_address`,
      `PUT`,
      body,
    );
  }

  async addItem(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/items`, 'POST', body);
  }

  async updateItem(id, itemId, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/items/${itemId}`,
      'PUT',
      body,
    );
  }

  async deleteItem(id, itemId) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/items/${itemId}`, 'DELETE');
  }

  async addTransaction(id, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/transactions`,
      'POST',
      body,
    );
  }

  async updateTransaction(id, transactionId, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/transactions/${transactionId}`,
      'PUT',
      body,
    );
  }

  async deleteTransaction(id, transactionId) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/transactions/${transactionId}`,
      'DELETE',
    );
  }

  async addDiscount(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/discounts`, 'POST', body);
  }

  async updateDiscount(id, discountId, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/discounts/${discountId}`,
      'PUT',
      body,
    );
  }

  async deleteDiscount(id, discountId) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/discounts/${discountId}`,
      'DELETE',
    );
  }

  async getPaymenFormSettings(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/payment_form_settings`);
  }

  async chargeOrder(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/charge`, 'POST');
  }
}

export default new OrdersApi();
