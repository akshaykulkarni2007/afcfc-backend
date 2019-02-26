const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const cors = require("cors")

// Routes
const users = require("./routes/api/users")
const players = require("./routes/api/players")

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static dir
app.use(express.static("public"))

// DB Config
const db = require("./config/keys").mongoURI

// Connect to MongoDB
mongoose
	.connect(db)
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require("./config/passport")(passport)

app.use(cors())

// Use Routes
app.use("/api/users", users)
app.use("/api/players", players)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
