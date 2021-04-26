import request from '../request';
import config from '../../config';

class SettingsApi {
    constructor() {
        this.pathName = `settings`
    }

    async getSettings() {
        return await request(`${config.serverAPIurl}/${this.pathName}`);
    }

    async updateSettings(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}`, 'PUT', body);
    }

    async getEmailSettings() {
        return await request(`${config.serverAPIurl}/${this.pathName}/email`);
    }    

    async getEmailTemplate(name) {
        return await request(`${config.serverAPIurl}/${this.pathName}/email/templates/${name}`);
    }

    async updateEmailTemplate(name) {
        return await request(`${config.serverAPIurl}/${this.pathName}/email/templates/${name}`, `PUT`, body);
    }

    async getCommerceSettings() {
        return await request(`${config.serverAPIurl}/${this.pathName}/commerceform`);
    }

    async updateCommerceSettings() {
        return await request(`${config.serverAPIurl}/${this.pathName}/commerceform`, `PUT`, body);
    }

    async getCheckoutFields() {
        return await request(`${config.serverAPIurl}/${this.pathName}/checkout/fields`);
    }

    async getCheckoutField(name) {
        return await request(`${config.serverAPIurl}/${this.pathName}/checkout/fields/${name}`);
    }

    async updateCheckoutField(name, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/checkout/fields/${name}`, `PUT`, body);
    }

    async uploadLogo(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/logo`, `POST`, body);
    }

    async deleteLogo() {
        return await request(`${config.serverAPIurl}/${this.pathName}/logo`, `DELETE`);
    }
}

export default new SettingsApi();