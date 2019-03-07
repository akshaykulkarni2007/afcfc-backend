const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HomeBannerSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
})

module.exports = HomeBanner = mongoose.model("homeBanner", HomeBannerSchema)
