import request from '../request';
import config from '../../config';

class FilesApi {
    constructor() {
        this.pathName = `files`
    }

    async getFiles() {
        return await request(`${config.serverAPIurl}/${this.pathName}`);
    }

    async addFile(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
    }

    async deleteFile(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `DELETE`);
    }
}

export default new FilesApi()