import request from '../request';
import config from '../../config';

class TokensApi {
    constructor() {
        this.pathName = `tokens`
    }

    async getTokens() {
        return await request(`${config.serverAPIurl}/${this.pathName}`);
    }

    async getBlacklist() {
        return await request(`${config.serverAPIurl}/${this.pathName}/blacklist`);
    }

    async addToken(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
    }

    async getTokenById(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
    }

    async updateToken(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `PUT`, body);
    }
    
    async deleteToken(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `DELETE`);
    }

    async authorize(body) { //email
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `POST`, body);
    }
}

export default new TokensApi();