import request from '../request';
import config from '../../config';

class NotificationsApi {
    constructor() {
        this.pathName = `notifications`
    }
    
    async paymentNotification(gateway) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${gateway}`, `POST`);
    }
}

export default new NotificationsApi()