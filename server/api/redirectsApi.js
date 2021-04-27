import request from '../request';
import config from '../../config';

class RedirectsApi {
  constructor() {
    this.pathName = `redirects`;
  }

  async getRedirects() {
    return await request(`${config.serverAPIurl}/${this.pathName}`);
  }

  async addRedirect(body) {
    return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
  }

  async getRedirectById(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
  }

  async updateRedirect(id, body) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
  }

  async deleteRedirect(id) {
    return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
  }
}

export default new RedirectsApi();
