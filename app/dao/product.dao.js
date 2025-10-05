
import { Product } from '../../config/models/product.model.js'
import { paginate } from '../../utils/paginate.js'


export class ProductDAO {
    static async createProduct(data) {
    return Product.create(data)
    }
    static async getProductById(id) { return Product.findById(id) }
 
    static async getProducts({ page, limit, sort, filter }) {return paginate(Product, { page, limit, sort, filter }) }
    static async updateProduct(id, data) { return Product.findByIdAndUpdate(id, data, { new: true }) }
    static async deleteProduct(id) { return Product.findByIdAndDelete(id) }
    
}

