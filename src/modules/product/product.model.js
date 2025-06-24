import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		thumbnail: { type: String, required: true },
		description: { type: String, default: "" },
		shortDescription: { type: String, default: "" },
		priceDefault: { type: Number, required: true },
		slug: { type: String, required: true, unique: true },
		brandId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Brand",
			required: true,
		},
		subCategoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubCategory",
			required: true,
		},
		soldCount: { type: Number, default: 0 },
		variants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Variant",
				required: true,
			},
		],
		seoTitle: { type: String, default: "" },
		seoDescription: { type: String, default: "" },
		tags: { type: [String], default: [] },

		deletedAt: { type: Date, default: null },
		deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ versionKey: false, timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;


// Table Product {
//   id string
//   title string
//   thumbnail string
//   description string
//   shortDescription string
//   specifications object
//   price number
//   oldPrice number
//   slug string
//   brand string [ref: > Brand.id]
//   subCategory string [ref: > SubCategory.id]
//   color productColors
//   size productSizes
//   stock number
//   soldCount number

//   seoTitle string
//   seoDescription string
//   tags array

//   deletedAt datetime [default: null]
//   updatedAt datetime [default: `now()`]
//   deletedBy string [ref: > User.id]
//   updatedBy string [ref: > User.id]
// }
