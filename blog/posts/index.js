const express = require("express");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/posts/create", async (req, res) => {
	const id = randomBytes(4).toString("hex");
	const { title } = req.body;

	posts[id] = {
		id,
		title,
	};

	await axios
		.post("http://event-bus-clusterip-srv:4005/events", {
			type: "PostCreated",
			data: {
				id,
				title,
			},
		})
		.catch((err) => console.log(err));

	res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
	const { type } = req.body;

	console.log("Event type: ", type);
	res.send({});
});

app.listen(4000, () => {
	console.log("new changes in posts");
	console.log("'posts' is running || PORT:4000");
});
