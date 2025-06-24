import Variant from "./product_variant.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"
import MESSAGES from "../../common/constant/messages.js"

// Create
export const createProductVariant = handleAsync(async (req, res, next) => {
    const data = await Variant.create(req.body)
    return res.json(createResponse(true, 201, MESSAGES.VARIANT.CREATE_SUCCESS, data))
})

// Get All
export const getAllProductVariant = handleAsync(async (req, res, next) => {
    const data = await Variant.find()
        .populate('productId', 'title')
        .populate('attributeValueId', 'title')
    if (!data || data.length === 0) {
        return next(createError(404, MESSAGES.VARIANT.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.VARIANT.GET_SUCCESS, data))
})

// Get Detail
export const getDetailProductVariant = handleAsync(async (req, res, next) => {
    const data = await Variant.findById(req.params.id)
        .populate('productId', 'title')
        .populate('attributeValues')
    if (!data) {
        next(createError(404, MESSAGES.VARIANT.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.VARIANT.GET_BY_ID_SUCCESS, data))
})

// Update
export const updateProductVariant = handleAsync(async (req, res, next) => {
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
export const deleteProductVariant = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Variant.findByIdAndDelete(id)
        return res.json(createResponse(true, 200, MESSAGES.VARIANT.DELETE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.VARIANT.DELETE_ERROR))
})

// Soft Delete
export const softDeleteProductVariant = handleAsync(async (req, res, next) => {
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
export const restoreProductVariant = handleAsync(async (req, res, next) => {
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