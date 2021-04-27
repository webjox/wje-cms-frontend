import request from '../request';
import config from '../../config';

class CategoriesApi {
  constructor() {
    this.pathName = `categories`;
  }

  async getCategories() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addCategory(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getCategoryById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updateCategory(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `PUT`, body);
  }

  async deleteCategory(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
  }

  async addImage(id, body) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}/${id}/image`,
      `POST`,
      body,
      {},
      'multipart/form-data',
    );
  }

  async getImage(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/image`);
  }

  async updateImage(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/image`, `PUT`, body);
  }

  async deleteImage(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}/image`, `DELETE`);
  }
}

export default new CategoriesApi();
