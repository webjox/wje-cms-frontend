import request from '../request';
import config from '../../config';

class SitemapApi {
    constructor() {
        this.pathName = `sitemap`
    }

    async getSitemap(href = '') {
        return await request(`${config.serverAPIurl}/${this.pathName}/${href}`);
    }
}

export default new SitemapApi();