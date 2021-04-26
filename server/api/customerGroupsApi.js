import request from '../request';
import config from '../../config';

class CustomerGroupsApi {
    constructor() {
        this.pathName = `customer_groups`
    }

    async getCustomersGroups() {
        return await request(`${config.serverAPIurl}/${this.pathName}`);
    }

    async addCustomersGroup(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}`, 'POST', body);
    }

    async getCustomersGroupById(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
    }

    async updateCustomersGroup(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `PUT`, body);
    }

    async deleteCustomersGroupById(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, `DELETE`);
    }
}

export default new CustomerGroupsApi();