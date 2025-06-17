import Product from "./product.model.js";
import createError from "../../utils/error.js";
import handleAsync from "../../utils/handleAsync.js";
import createResponse from "../../utils/response.js";
import MESSAGES from "../../common/constant/messages.js";

// Create product
export const createProduct = handleAsync(async (req, res, next) => {
	const existing = await Product.findOne({ slug: req.body.slug });
	if (existing) next(createError(400, MESSAGES.PRODUCT.CREATE_ERROR_EXISTS));
	const data = await Product.create(req.body);
	return res.json(createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, data));
});

// Get all products
export const getAllProducts = handleAsync(async (req, res, next) => {
	const data = await Product.find()
		.populate('brandId', 'title')
		.populate('subCategoryId', 'title')
		.populate('variants');

	if (!data || data.length === 0) {
		return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
	}
	return res.json(createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, data));
});

// Get detail product
export const getDetailProduct = handleAsync(async (req, res, next) => {
	const data = await Product.findById(req.params.id)
		.populate('brandId', 'title')
		.populate('subCategoryId', 'title')
		.populate('variants');

	if (!data) {
		next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
	}
	return res.json(createResponse(true, 200, MESSAGES.PRODUCT.GET_BY_ID_SUCCESS, data));
});

// Update product
export const updateProduct = handleAsync(async (req, res, next) => {
	const { id } = req.params;
	if (id) {
		const data = await Product.findByIdAndUpdate(id, req.body, { new: true })
			.populate('brandId', 'title')
			.populate('subCategoryId', 'title')
			.populate('variants');
		return res.json(createResponse(true, 200, MESSAGES.PRODUCT.UPDATE_SUCCESS, data));
	}
	next(createError(400, MESSAGES.PRODUCT.UPDATE_ERROR));
});

// Delete product
export const deleteProduct = handleAsync(async (req, res, next) => {
	const { id } = req.params;
	if (id) {
		const data = await Product.findByIdAndDelete(id);
		return res.json(createResponse(true, 200, MESSAGES.PRODUCT.DELETE_SUCCESS, data));
	}
	next(createError(404, MESSAGES.PRODUCT.DELETE_ERROR));
});

// Soft delete product
export const softDeleteProduct = handleAsync(async (req, res, next) => {
	const { id } = req.params;
	if (id) {
		const data = await Product.findOneAndUpdate(
			{ _id: id, deletedAt: null },
			{
				deletedAt: new Date(),
				deletedBy: req.user?._id // Nếu có user đang đăng nhập
			},
			{ new: true }
		);
		return res.json(createResponse(true, 200, MESSAGES.PRODUCT.SOFT_DELETE_SUCCESS, data));
	}
	next(createError(404, MESSAGES.PRODUCT.SOFT_DELETE_FAILED));
});

// Restore product
export const restoreProduct = handleAsync(async (req, res, next) => {
	const { id } = req.params;
	if (id) {
		const data = await Product.findOneAndUpdate(
			{ _id: id },
			{
				deletedAt: null,
				deletedBy: null
			},
			{ new: true }
		);
		return res.json(createResponse(true, 200, MESSAGES.PRODUCT.RESTORE_SUCCESS, data));
	}
	next(createError(404, MESSAGES.PRODUCT.RESTORE_FAILED));
});