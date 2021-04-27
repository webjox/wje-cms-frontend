import request from '../request';
import config from '../../config';

class PagesApi {
  constructor() {
    this.pathName = `pages`;
  }

  async getPages() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addPage(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getPageById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updatePage(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
  }

  async deletePage(id) {
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

export default new PagesApi();
