const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	joined: {
		type: String,
		required: true
	},
	from: {
		type: String,
		required: true
	},
	left: String,
	nationality: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	dob: Date,
	description: {
		type: String,
		required: true
	},
	stats: { type: Array, default: [] },
	gallery: [String]
})

module.exports = Player = mongoose.model("players", PlayerSchema)
