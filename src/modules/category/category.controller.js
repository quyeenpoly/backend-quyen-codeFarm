import Category from "./category.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"
import MESSAGES from "../../common/constant/messages.js"


// Add 
export const createCategory = handleAsync(
    async (req, res, next) => {
        const existing = await Category.findOne({ title: req.body.title })
        if (existing) next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR_EXISTS))
        const data = await Category.create(req.body)
        return res.json(createResponse(true, 201
            , MESSAGES.CATEGORY.CREATE_SUCCESS , data))

    }
)
// GetAll
export const getAllCategory = handleAsync(
    async (req, res, next) => {
        const data = await Category.find()
        return res.json(createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS , data))
    }
)
// GetDetail
export const getDetailCategory = handleAsync(
    async (req, res, next) => {
        const data = await Category.findById(req.params.id)
        console.log(data)
        if (!data) {
            next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND))
        }
        return res.json(createResponse(true, 200, MESSAGES.CATEGORY.GET_BY_ID_SUCCESS ,data))
    }
)
// Update
export const updateCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Category.findByIdAndUpdate(id, req.body)
            return res.json(createResponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data))
        }
        next(createError(false, 400, MESSAGES.CATEGORY.UPDATE_FAILED))
    }
)
// Delete
export const deleteCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
            const data = await Category.findByIdAndDelete(id)
            return res.json(createResponse(true, 200, MESSAGES.CATEGORY.DELETE_SUCCESS, data))
        }
        next(createError(false, 404, MESSAGES.CATEGORY.DELETE_ERROR))
    }
)
// Soft-Delete
export const softDeleteCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
           await Category.findOneAndUpdate(
			{ id, deletedAt: null },
			{
				deletedAt: new Date(),
			}
		);
            return res.json(createResponse(true, 200, MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS))
        }
        next(createError(false, 404, MESSAGES.CATEGORY.SOFT_DELETE_FAILED))
    }
)
// Restore
export const restoreCategory = handleAsync(
    async (req, res, next) => {
        const { id } = req.params
        if (id) {
		await Category.findOneAndUpdate(
			{ id, deletedAt: { $ne: null } },
			{
				deletedAt: null,
			}
		);
		// ne = not equal
		return res.json(createResponse(true, 200, MESSAGES.CATEGORY.RESTORE_SUCCESS));
	}
        next(createError(false, 404, MESSAGES.CATEGORY.RESTORE_FAILED))
    }
)