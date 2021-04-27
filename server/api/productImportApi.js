import request from '../request';
import config from '../../config';

class ProductImportApi {
  constructor() {
    this.pathName = `import`;
  }
  async importProducts(xmlFile) {
    return await request(
      `${config.serverAPIurl}/${this.pathName}`,
      `POST`,
      xmlFile,
      {},
      'multipart/form-data',
    );
  }
}

export default new ProductImportApi();
