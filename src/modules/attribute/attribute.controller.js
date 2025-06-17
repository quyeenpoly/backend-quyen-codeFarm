import Attribute from "./attribute.model.js"
import createError from "../../utils/error.js"
import handleAsync from "../../utils/handleAsync.js"
import createResponse from "../../utils/response.js"
import MESSAGES from "../../common/constant/messages.js"

// Create
export const createAttribute = handleAsync(async (req, res, next) => {
    const existing = await Attribute.findOne({ attributeCode: req.body.attributeCode })
    if (existing) next(createError(400, MESSAGES.ATTRIBUTE.CREATE_ERROR_EXISTS))
    const data = await Attribute.create(req.body)
    return res.json(createResponse(true, 201, MESSAGES.ATTRIBUTE.CREATE_SUCCESS, data))
})

// Get All
export const getAllAttribute = handleAsync(async (req, res, next) => {
    const data = await Attribute.find()
    if (!data || data.length === 0) {
        return next(createError(404, MESSAGES.ATTRIBUTE.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE.GET_SUCCESS, data))
})

// Get Detail
export const getDetailAttribute = handleAsync(async (req, res, next) => {
    const data = await Attribute.findById(req.params.id)
    if (!data) {
        next(createError(404, MESSAGES.ATTRIBUTE.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE.GET_BY_ID_SUCCESS, data))
})

// Update
export const updateAttribute = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Attribute.findByIdAndUpdate(id, req.body, { new: true })
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE.UPDATE_SUCCESS, data))
    }
    next(createError(400, MESSAGES.ATTRIBUTE.UPDATE_ERROR))
})

// Delete
export const deleteAttribute = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Attribute.findByIdAndDelete(id)
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE.DELETE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.ATTRIBUTE.DELETE_ERROR))
})

// Soft Delete
export const softDeleteAttribute = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Attribute.findOneAndUpdate(
            { _id: id, deletedAt: null },
            {
                deletedAt: new Date(),
                deletedBy: req.user?._id
            },
            { new: true }
        )
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE.SOFT_DELETE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.ATTRIBUTE.SOFT_DELETE_FAILED))
})

// Restore
export const restoreAttribute = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Attribute.findOneAndUpdate(
            { _id: id },
            {
                deletedAt: null,
                deletedBy: null
            },
            { new: true }
        )
        return res.json(createResponse(true, 200, MESSAGES.ATTRIBUTE.RESTORE_SUCCESS, data))
    }
    next(createError(404, MESSAGES.ATTRIBUTE.RESTORE_FAILED))
}) 