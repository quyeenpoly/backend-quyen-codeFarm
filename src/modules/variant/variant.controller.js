import Variant from "./variant.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"
import MESSAGES from "../../common/constant/messages.js"

// Create
export const createVariant = handleAsync(async (req, res, next) => {
    const data = await Variant.create(req.body)
    return res.json(createResponse(true, 201, MESSAGES.VARIANT.CREATE_SUCCESS, data))
})

// Get All
export const getAllVariant = handleAsync(async (req, res, next) => {
    const data = await Variant.find()
        .populate('productId', 'title')
        .populate('attributeValues')
    if (!data || data.length === 0) {
        return next(createError(404, MESSAGES.VARIANT.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.VARIANT.GET_SUCCESS, data))
})

// Get Detail
export const getDetailVariant = handleAsync(async (req, res, next) => {
    const data = await Variant.findById(req.params.id)
        .populate('productId', 'title')
        .populate('attributeValues')
    if (!data) {
        next(createError(404, MESSAGES.VARIANT.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.VARIANT.GET_BY_ID_SUCCESS, data))
})

// Update
export const updateVariant = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Variant.findByIdAndUpdate(id, req.body, { new: true })
            .populate('productId', 'title')
            .populate('attributeValues')
        return res.json(createResponse(true, 200, MESSAGES.VARIANT.UPDATE_SUCCESS, data))
    }
    next(createError(400, MESSAGES.VARIANT.UPDATE_ERROR))
})

// Delete
export const deleteVariant = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Variant.findByIdAndDelete(id)
        return res.json(createResponse(true, 200, MESSAGES.VARIANT.DELETE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.VARIANT.DELETE_ERROR))
})

// Soft Delete
export const softDeleteVariant = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Variant.findOneAndUpdate(
            { _id: id, deletedAt: null },
            {
                deletedAt: new Date(),
                deletedBy: req.user?._id
            },
            { new: true }
        )
        return res.json(createResponse(true, 200, MESSAGES.VARIANT.SOFT_DELETE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.VARIANT.SOFT_DELETE_FAILED))
})

// Restore
export const restoreVariant = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Variant.findOneAndUpdate(
            { _id: id },
            {
                deletedAt: null,
                deletedBy: null
            },
            { new: true }
        )
        return res.json(createResponse(true, 200, MESSAGES.VARIANT.RESTORE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.VARIANT.RESTORE_FAILED))
}) 