// Table Brand {Add commentMore actions
//   id string
//   title string
//   logoUrl string
//   description string
//   deletedAt datetime [default: null]
//   slug string
// }

import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
	},
	slug: {
		type: String,
		unique: true,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		default: 1
	},
	deletedAt: {
		type: Date,
		default: null
	}
}, { versionKey: false, timestamps: true });


export default mongoose.model("Brand", brandSchema)