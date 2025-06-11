import Category from "./category.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"
import categorySchema from "./category.schema.js"


// Add 
export const createCategory = handleAsync(
    async (req, res, next) => {
     
        const existing = await Category.findOne({ title: req.body.title })
        if (existing) next(createError(400, "Category Already Exists !"))
        const data = await Category.create(req.body)
        return res.json(createResponse(true, 201
            , "Create Category Successfully !", data))

    }
)
// GetAll
export const getAllCategory = handleAsync(
    async (req, res, next) => {
        const data = await Category.find()
        return res.json(createResponse(true, 200, "Get All Category Successfully !", data))
    }
)
// GetDetail
export const getDetailCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Category.findById(id)
            return res.json(createResponse(true, 200, "Get Detail Category Successfully !", data))
        }
        next(createError(false, 404, "Not Found Category !"))
    }
)
// Update
export const updateCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Category.findByIdAndUpdate(id, req.body)
            return res.json(createResponse(true, 200, "Update Category Successfully !", data))
        }
        next(createError(false, 400, "Update Category Failed!"))
    }
)
// Delete
export const deleteCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Category.findByIdAndDelete(id)
            return res.json(createResponse(true, 200, "Delete Category Successfully !"))
        }
        next(createError(false, 404, "Delete Category Failed !"))
    }
)
// Soft-Delete
export const softDeleteCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            await Category.findByIdAndUpdate(id, { deletedAt: new Date(Date.now() + 7 * 60 * 60 * 1000) })
            return res.json(createResponse(true, 200, "Hidden Category Successfully !"))
        }
        next(createError(false, 404, "Category Hidden Failed"))
    }
)
// Restore
export const restoreCategory = handleAsync(
     async (req, res, next) => {
        const { id } = req.params
        if (id) {
            await Category.findByIdAndUpdate(id, { deletedAt: null })
            return res.json(createResponse(true, 200, "Restore Category Successfully !"))
        }
        next(createError(false, 404, "Restore Category Failed"))
    }
)