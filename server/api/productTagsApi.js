import request from '../request';
import config from '../../config';

class ProductTagsApi {
  constructor() {
    this.pathName = `tags`;
  }

  async getProductTags() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addProductTag(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getProductTagById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updateProductTag(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
  }

  async deleteProductTag(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
  }
}

export default new ProductTagsApi();
