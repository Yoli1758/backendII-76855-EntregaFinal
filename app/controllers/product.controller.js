import { ProductService } from "../service/product.service.js";
import mongoose from 'mongoose'
import { validProductFields } from '../dtos/product.dto.js'

export class ProductController {
    static async create(req, res) {
        try {
            console.log("estoy en el controlador de create en productController")

            validProductFields(req.body)
            const product = await ProductService.CreateProduct(req.body)
            res.status(200).json({ status: "success", product })
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }

    static async getProducts(req, res) {
        try {

            console.log("estoy en el controlador...",req.query.page)
            const productsResult = await ProductService.getAllProducts(req.query);

        // if (!productsResult || productsResult.docs.length === 0) {
        //     return res.status(404).json({ error: "No hay productos" });
        // }

        // res.json({ status: "success", ...productsResult });
        //    // const productsResult = await ProductService.getAllProducts({page, limit, sort: sortOption, filter})

           
            return (!productsResult || productsResult.docs.length === 0) 
            ? res.status(404).json({ error: "whitout Products" }) :
             res.json({ status: "success", ...productsResult });
        } catch (error) {
            return res.status(400).json({ status: "error", message: error.message })
        }
    }

    static async getProduct(req, res) {
        try {

            const { pid } = req.params
            if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "id product invalid" })

            const productResult = await ProductService.getProductById(pid)

            !productResult ? res.status(404).json({ error: "Product not found" }) : res.json({ status: "success", product: productResult })

        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }
    static async update(req, res) {

        const updateData = req.body;
        try {
            const pid = req.params.pid;
            if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "id product invalid" })


            console.log("voy a actualizar el producto con pid", pid, updateData)
            const product = await ProductService.updateProduct(pid, updateData)
            return product ? res.json({ status: "success", product }) : res.status(404).json({ status: "error", message: "Product not found" })
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }
    static async delete(req, res) {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "id product invalid" })
            await ProductService.deleteProduct(id);
            res.json({ status: "success", messsage: "Product deleted successfully" })
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }

    // static async addToCart(req, res) {
    //     try {
    //         const id = req.params.id;

    //         if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "id product invalid" })
    //         const cartId = req.user.cart._id;
    //         const cart = await ProductService.addProductToCart(id, cartId)
    //         res.json({ status: "success", cart: cart })
    //     } catch (error) {
    //         res.status(400).json({ status: "error", message: error.message })

    //     }
    // }
}