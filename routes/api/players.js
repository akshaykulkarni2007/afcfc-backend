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

// @route   GET api/players/topStats
// @desc    Get top stats from players
// @access  Admin
router.get("/topStats", (req, res) => {
	const topGoals = getAggStat("1819", "goals", "Most Goals")
	const topAssists = getAggStat("1819", "assists", "Most Assists")
	const topYellow = getAggStat("1819", "yellow", "Most Yellow Cards")
	const topRed = getAggStat("1819", "red", "Most Red Cards")
	const topCS = getAggStat("1819", "cleanSheets", "Most Clean Sheets")

	Promise.all([topGoals, topAssists, topYellow, topRed, topCS])
		.then(topStats => {
			res.send(topStats)
		})
		.catch(err => res.status(400))
})

// @route   GET api/players/name
// @desc    Get player by name
// @access  Public
router.get("/:name", (req, res) => {
	const dp = req.params.name
	Player.find({ dp }, (err, player) => {
		if (!err) {
			res.send(player)
		} else {
			res.status(400)
		}
	})
})

// @route   PUT api/players/:id
// @desc    Updates a player
// @access  Admin
router.put("/:name", (req, res) => {
	const dp = req.body.dp
	Player.findOneAndUpdate({ dp }, req.body, { new: true }, (err, data) => {
		if (!err) {
			res.send(data)
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

function getAggStat(season, statAttr, label) {
	return new Promise((resolve, reject) => {
		Player.aggregate(
			[
				{ $unwind: "$stats" },
				{ $match: { "stats.season": season } },
				{ $sort: { ["stats." + statAttr]: -1 } },
				{
					$project: {
						number: 1,
						name: 1,
						dp: 1,
						statName: label,
						statNumber: "$stats." + statAttr,
						_id: 0
					}
				},
				{ $limit: 1 }
			],
			(err, player) => {
				if (!err) {
					resolve(player[0])
				} else {
					reject(err)
				}
			}
		)
	})
}

module.exports = router
