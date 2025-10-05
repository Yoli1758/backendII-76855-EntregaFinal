import { ProductService } from "../service/product.service.js";
import mongoose from 'mongoose'
import { validProductFields } from '../dtos/product.dto.js'

export class ProductController {
    static async create(req, res) {
        try {
            
            const productData = {
                ...req.body,
                status: req.body.status === "true"
            }
            validProductFields(productData)
            const product = await ProductService.CreateProduct(productData)
           
            res.redirect("/editProducts?result=success")
        } catch (error) {
            
            res.redirect("/editProducts?result=error&message=" + encodeURIComponent(error.message));
        }
    }

    static async getProducts(req, res) {
        try {



          
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const productsResult = await ProductService.getAllProducts({ page, limit });

            const view = req.user.role === "admin" ? "adminP" : "products";
            const basePath = req.user.role === "admin" ? "/editProducts" : "/products";


            if (!productsResult || productsResult.docs.length === 0) {
                return res.render(view, { products: null, result: req.query.result, message: req.query });
            }

            const currentPage = productsResult.page;
            const totalPages = productsResult.totalPages;

            const prevLink = productsResult.hasPrevPage
                ? `${basePath}?page=${productsResult.prevPage}&limit=${productsResult.limit}`
                : null;

            const nextLink = productsResult.hasNextPage
                ? `${basePath}?page=${productsResult.nextPage}&limit=${productsResult.limit}`
                : null;
            return res.render(

                view,
                {
                    products: productsResult.docs.map(p => p.toObject()),
                    currentPage,
                    totalPages,
                    hasPrevPage: productsResult.hasPrevPage,
                    hasNextPage: productsResult.hasNextPage,
                    prevLink,
                    nextLink
                });

        } catch (error) {
            return res.status(400).json({ status: "error", message: error.message })
        }
    }


    static async getProduct(req, res) {
        try {
            const { pid } = req.params
            if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "id product invalid" })
            const productResult = await ProductService.getProductById(pid)
            if (!productResult) return res.status(404).json({ error: "Product not found" })
            res.render("editProduct", {
                product: productResult.toObject(),
                user: req.user
            })
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }


    static async update(req, res) {
        const updateData =
        {
            ...req.body,
            status: req.body.status === "true" ? true : false
        }
        try {
            const pid = req.params.pid;
            if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "id product invalid" })
            const product = await ProductService.updateProduct(pid, updateData)
            if (!product) return res.status(404).json({ status: "error", message: "Product not found" })
            res.redirect("/editProducts")
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }


    static async delete(req, res) {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "id product invalid" })
            await ProductService.deleteProduct(id);
            res.redirect("/editProducts")
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }
}