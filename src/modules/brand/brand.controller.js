import Brand from "./brand.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"
import MESSAGES from "../../common/constant/messages.js"

// Create
export const createBrand = handleAsync(async (req, res, next) => {
    const existing = await Brand.findOne({ title: req.body.title })
    if (existing) next(createError(400, MESSAGES.BRAND.CREATE_ERROR_EXISTS))
    const data = await Brand.create(req.body)
    return res.json(createResponse(true, 201, MESSAGES.BRAND.CREATE_SUCCESS, data))
})

// GetAll
export const getAllBrand = handleAsync(async (req, res, next) => {
    const data = await Brand.find()
    if (!data || data.length === 0) {
        return next(createError(404, MESSAGES.BRAND.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.BRAND.GET_SUCCESS, data))
})

// GetDetail
export const getDetailBrand = handleAsync(async (req, res, next) => {
    const data = await Brand.findById(req.params.id)
    if (!data) {
        next(createError(false, 404, MESSAGES.BRAND.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.BRAND.GET_BY_ID_SUCCESS, data))
})

// Update
export const updateBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Brand.findByIdAndUpdate(id, req.body)
        return res.json(createResponse(true, 200, MESSAGES.BRAND.UPDATE_SUCCESS, data))
    }
    next(createError(false, 400, MESSAGES.BRAND.UPDATE_FAILED))
})

// Delete
export const deleteBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Brand.findByIdAndDelete(id)
        return res.json(createResponse(true, 200, MESSAGES.BRAND.DELETE_SUCCESS, data))
    }
    next(createError(false, 404, MESSAGES.BRAND.DELETE_ERROR))
})

// Soft-Delete
export const softDeleteBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Brand.findOneAndUpdate(
            { _id: id, deletedAt: null },
            {
                deletedAt: new Date(),
            },
            {
                new: true,
            }
        )
        return res.json(createResponse(true, 200, MESSAGES.BRAND.SOFT_DELETE_SUCCESS, data))
    }
    next(createError(false, 404, MESSAGES.BRAND.SOFT_DELETE_FAILED))
})

// Restore
export const restoreBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Brand.findOneAndUpdate(
            { _id: id },
            {
                deletedAt: null,
            },
            { new: true }
        )
        return res.json(createResponse(true, 200, MESSAGES.BRAND.RESTORE_SUCCESS, data))
    }
    next(createError(false, 404, MESSAGES.BRAND.RESTORE_FAILED))
}) 