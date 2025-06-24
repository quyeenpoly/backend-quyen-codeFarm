import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
	{
		title: { type: String, required: true }, // * Tiêu đề của biến thể, bắt buộc
		thumbnail: { type: String, required: true }, // * Hình ảnh đại diện của biến thể, bắt buộc
		price: { type: Number, required: true }, // * Giá sản phẩm, bắt buộc
		oldPrice: { type: Number, default: null }, // * Giá cũ, có thể null nếu không có
		sku: { type: String, required: true, unique: true }, // * Stock Keeping Unit
		stock: { type: Number, default: 0 }, // * Số lượng tồn kho
		soldCount: { type: Number, default: 0 }, // * Số lượng đã bán
		specifications: { type: Object, default: {} }, // * Thông số kỹ thuật, có thể là một đối tượng JSON
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		attributeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Attribute",
			required: true,
		},
		attributeValueId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "AttributeValue",
			required: true,
		},
		deletedAt: { type: Date, default: null },
		deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;