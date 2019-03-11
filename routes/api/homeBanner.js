const express = require("express")
const router = express.Router()

// Load models
const HomeBanner = require("../../models/HomeBanner")

// @route   GET api/home-banner
// @desc    Get Content for homepage banner
// @access  Public
router.get("/", (req, res) => {
	HomeBanner.find({}, (err, data) => {
		if (!err) {
			//const { title, content } = data[0]
			res.send(data)
		} else {
			res.status(400)
		}
	})
})

// @route   PUT api/home-banner
// @desc    Update Content for homepage banner
// @access  Public
router.put("/", (req, res) => {
	HomeBanner.findOneAndUpdate({}, req.body, { new: true }, (err, data) => {
		if (!err) {
			res.send(data)
		} else {
			res.status(400)
		}
	})
})

// @route   POST api/home-banner
// @desc    Save Content for homepage banner
// @access  Public
router.post("/", (req, res) => {
	const banner = new HomeBanner({
		title: req.body.title,
		content: req.body.content
	})

	banner
		.save()
		.then(data => res.json(data))
		.catch(err => console.log(err))
})

module.exports = router
