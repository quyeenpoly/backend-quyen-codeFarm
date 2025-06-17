import AttributeValue from "./attribute_value.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"
import MESSAGES from "../../common/constant/messages.js"

// Create
export const createAttributeValue = handleAsync(async (req, res, next) => {
    const existing = await AttributeValue.findOne({ 
        attributeId: req.body.attributeId,
        value: req.body.value 
    })
    if (existing) next(createError(400, MESSAGES.ATTRIBUTE_VALUE.CREATE_ERROR_EXISTS))
    const data = await AttributeValue.create(req.body)
    return res.json(createResponse(true, 201, MESSAGES.ATTRIBUTE_VALUE.CREATE_SUCCESS, data))
})

// Get All
export const getAllAttributeValue = handleAsync(async (req, res, next) => {
    const data = await AttributeValue.find()
        .populate('attributeId', 'title')
    if (!data || data.length === 0) {
        return next(createError(404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.GET_SUCCESS, data))
})

// Get By Attribute
export const getByAttribute = handleAsync(async (req, res, next) => {
    const { attributeId } = req.params
    const data = await AttributeValue.find({ attributeId })
        .populate('attributeId', 'title')
    if (!data || data.length === 0) {
        return next(createError(404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.GET_SUCCESS, data))
})

// Get Detail
export const getDetailAttributeValue = handleAsync(async (req, res, next) => {
    const data = await AttributeValue.findById(req.params.id)
        .populate('attributeId', 'title')
    if (!data) {
        next(createError(404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.GET_BY_ID_SUCCESS, data))
})

// Update
export const updateAttributeValue = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await AttributeValue.findByIdAndUpdate(id, req.body, { new: true })
            .populate('attributeId', 'title')
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.UPDATE_SUCCESS, data))
    }
    next(createError(400, MESSAGES.ATTRIBUTE_VALUE.UPDATE_ERROR))
})

// Delete
export const deleteAttributeValue = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await AttributeValue.findByIdAndDelete(id)
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.DELETE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.ATTRIBUTE_VALUE.DELETE_ERROR))
})

// Soft Delete
export const softDeleteAttributeValue = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await AttributeValue.findOneAndUpdate(
            { _id: id, deletedAt: null },
            {
                deletedAt: new Date(),
                deletedBy: req.user?._id
            },
            { new: true }
        )
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.SOFT_DELETE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.ATTRIBUTE_VALUE.SOFT_DELETE_FAILED))
})

// Restore
export const restoreAttributeValue = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await AttributeValue.findOneAndUpdate(
            { _id: id },
            {
                deletedAt: null,
                deletedBy: null
            },
            { new: true }
        )
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.RESTORE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.ATTRIBUTE_VALUE.RESTORE_FAILED))
}) 