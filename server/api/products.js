import request from '../request';
import config from '../../config';

class ProductsApi {
    constructor() {
        this.pathName = `products`
    }

    async getProducts() {
        return await request(`${config.serverAPIurl}/${this.pathName}`);
    }

    async addProducts(body) {
        return await request(`${config.serverAPIurl}/${this.pathName}`, `POST`, body);
    }

    async getProductsById(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`);
    }

    async updateProducts(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'PUT', body);
    }

    async deleteProducts(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}`, 'DELETE');
    }

    async getProductSKU(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/sku`);
    }

    async getProductSLUG(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/slug`);
    }

    // product Images start

    async getProductImages(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/images`);
    }

    async addProductImages(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/images`, `POST`, body, {}, 'multipart/form-data');
    }

    async updateProductImages(id, image, body) { 
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/images/${image}`, `PUT`, body);
    }
    
    async deleteProductImages(id, image) { 
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/images/${image}`, `DELETE`);
    }
    // product Images end

    // product Files start
    async getProductFiles(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/files`);
    }
    async addProductFiles(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/files`, `POST`, body, {}, 'multipart/form-data');
    }

    async deleteProductFiles(id, file) { 
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/files/${file}`, `DELETE`);
    }
    // product Files end

    // product shops start

    async addProductShop(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/shops`, `POST`, body);
    }

    async updateProductShop(id, shop, body) { 
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/shops/${shop}`, `PUT`, body);
    }

    async deleteProductShop(id, shop) { 
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/shops/${shop}`, `DELETE`);
    }

    // product shops end

    // start product Options
    async getProductOptions(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options`);
    }

    async addProductOption(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options`, `POST`, body);
    }

    async getProductOptionById(id, optionId) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}`);
    }

    async updateProductOption(id, optionId, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}`, 'PUT', body);
    }

    async deleteProductOption(id, optionId) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}`, 'DELETE');
    }
    // end product Options

    // start product Values
    async getProductValues(id, optionId) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}/values`);
    }
    
    async addProductValue(id, optionId, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}/values`, `POST`, body);
    }
    
    async getProductValueById(id, optionId, valueId) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}/values/${valueId}`);
    }
    
    async updateProductValue(id, optionId, valueId, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}/values/${valueId}`, 'PUT', body);
    }
    
    async deleteProductValue(id, optionId, valueId) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/options/${optionId}/values/${valueId}`, 'DELETE');
    }
    // end product Values

    // start product Variants
    async getProductVariants(id) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/variants`);
    }

    async addProductVariant(id, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/variants`, `POST`, body);
    }

    async getProductVariantById(id, variantId) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/variants/${variantId}`);
    }

    async updateProductVariant(id, variantId, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/variants/${variantId}`, 'PUT', body);
    }

    async deleteProductVariant(id, variantId) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/variants/${variantId}`, 'DELETE');
    }

    async setVariantOptions(id, variantId, body) {
        return await request(`${config.serverAPIurl}/${this.pathName}/${id}/variants/${variantId}/options`, 'PUT', body);
    }
    // end product Options

    // start product helperData
    async getEffects() {
        return await request(`${config.serverAJAXurl}/${this.pathName}/effects`);
    }

    async getManufacturers() {
        return await request(`${config.serverAJAXurl}/${this.pathName}/manufacturers`);
    }
    // end product helperData
}

export default new ProductsApi();