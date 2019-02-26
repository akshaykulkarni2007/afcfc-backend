const express = require("express")
const router = express.Router()

// Load Player model
const Player = require("../../models/Player")

// @route   GET api/players/test
// @desc    Tests players route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "players works" }))

// @route   GET api/players
// @desc    Get all players
// @access  Public
router.get("/", (req, res) => {
	Player.find({}, (err, players) => {
		if (!err) {
			res.send(players)
		} else {
			res.status(400)
		}
	})
})

// @route   GET api/players/name
// @desc    Get player by name
// @access  Public
router.get("/:name", (req, res) => {
	const name = req.params.name
	//console.log(req.query, req.params)
	Player.find({ name }, (err, player) => {
		if (!err) {
			res.send(player)
		} else {
			res.status(400)
		}
	})
})

// @route   POST api/players/add
// @desc    Adds player
// @access  Admin
router.post("/add", (req, res) => {
	const player = new Player({
		name: req.body.name,
		number: req.body.number,
		status: req.body.status,
		joined: req.body.joined,
		from: req.body.from,
		nationality: req.body.nationality,
		position: req.body.position,
		description: req.body.description,
		dp: req.body.dp
	})

	player
		.save()
		.then(player => res.json(player))
		.catch(err => console.log(err))
})

module.exports = router
