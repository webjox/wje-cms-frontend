import request from '../request';
import config from '../../config';

class ShopsApi {
  constructor() {
    this.pathName = `shops`;
  }

  async getShop() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addShop(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getShopById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updateShop(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
  }

  async deleteShop(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
  }

  async uploadImage(id, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/image`,
      `POST`,
      body,
      {},
      'multipart/form-data',
    );
  }

  async updateImage(id, alt) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/image`, `PUT`, {
      alt: alt,
    });
  }

  async deleteImage(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/image`, `DELETE`);
  }
}

export default new ShopsApi();
