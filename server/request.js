import jwt from 'jsonwebtoken';
import config from '../config';

const TOKEN_PAYLOAD = { email: "store", scopes: ["admin"] };
const STORE_ACCESS_TOKEN = jwt.sign(TOKEN_PAYLOAD, config.jwtSecretKey);

const request = async(url, method = "GET", body = null, headers = {}, contentType = 'application/json') => {
    try {
        if(body) {
            if(contentType === 'multipart/form-data') delete headers['Content-Type'];
            else { 
                body = JSON.stringify(body);
                headers['Content-Type'] = contentType;
            }
        }
        headers['user'] = STORE_ACCESS_TOKEN;
        const response = await fetch(url, { method, body, headers });
        const data = await response.json() || null;
        const status = await response.status;
        if(!response.ok) {
            throw new Error(data.message || "Something went wrong!")
        }
        return {data, status};
    } catch (error) {
        throw(error);
    }
}

export default request;