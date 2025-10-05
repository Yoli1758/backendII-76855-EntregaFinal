import { ProductDAO } from '../dao/product.dao.js'

const pdao = ProductDAO;



export class ProductRepository {

    static createProduct(data) { return pdao.createProduct(data); }
    static getProductById(id) { return pdao.getProductById(id) }
    static getProducts({ page, limit, sort, filter }) { return pdao.getProducts({ page, limit, sort, filter })  }
    static updateProduct(id, data) { return pdao.updateProduct(id, data) }
    static deleteProduct(id) { return pdao.deleteProduct(id) }
}