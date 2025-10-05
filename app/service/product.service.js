import { ProductRepository } from '../repositories/product.repository.js'
import { CartRepository } from '../repositories/cart.repository.js'

export class ProductService {
    static async CreateProduct(data) { return ProductRepository.createProduct(data)   }

    static async getProductById(id) { return ProductRepository.getProductById(id) }

    static async getAllProducts({ page, limit, sort, ...filter }) {

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        let sortOption = null;
        if (sort) {
            sortOption = sort.startsWith("-") ? { [sort.slice(1)]: -1 } : { [sort]: 1 };
        }
        return ProductRepository.getProducts({ page, limit, sort: sortOption, filter})
    }

    static async updateProduct(id, data) { return ProductRepository.updateProduct(id, data) }

    static async deleteProduct(id) { return ProductRepository.deleteProduct(id) }

}