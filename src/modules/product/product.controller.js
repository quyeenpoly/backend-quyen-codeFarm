import Product from "./product.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"

export const createProducts = handleAsync(
    async(req, res, next)=>{
        const existing = await Product.findOne({title: req.body.title})
        if(existing) next(createError(400, "Product Already Exists !"))
        const data = await Product.create(req.body)
        return res.json(createResponse(true, 201
            , "Create Product Successfully !", data))
    }
)
export const getAllProducts = handleAsync(
    async (req, res, next) => {
        const data = await Product.find()
        return res.json(createResponse(true, 200, "Get All Product Successfully !", data))
    }
)

// GetDetail
export const getDetailProducts = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Product.findById(id)
            return res.json(createResponse(true, 200, "Get Detail Product Successfully !", data))
        }
        next(createError(false, 404, "Not Found Product !"))
    }
)
// Update
export const updateProducts = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Product.findByIdAndUpdate(id, req.body)
            return res.json(createResponse(true, 200, "Update Product Successfully !", data))
        }
        next(createError(false, 400, "Update Product Failed!"))
    }
)
// Delete
export const deleteProducts = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Product.findByIdAndDelete(id)
            return res.json(createResponse(true, 200, "Delete Product Successfully !"))
        }
        next(createError(false, 404, "Delete Product Failed !"))
    }
)
// Soft-Delete
export const softDeleteProducts = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            await Product.findByIdAndUpdate(id, { deletedAt: new Date(Date.now() + 7 * 60 * 60 * 1000) })
            return res.json(createResponse(true, 200, "Hidden Product Successfully !"))
        }
        next(createError(false, 404, "Product Hidden Failed"))
    }
)
// Restore
export const restoreProducts = handleAsync(
     async (req, res, next) => {
        const { id } = req.params
        if (id) {
            await Product.findByIdAndUpdate(id, { deletedAt: null })
            return res.json(createResponse(true, 200, "Restore Product Successfully !"))
        }
        next(createError(false, 404, "Restore Product Failed"))
    }
)