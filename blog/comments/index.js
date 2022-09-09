const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostID = {};

app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostID[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
	const randomId = randomBytes(4).toString("hex");

	const { content } = req.body;

	comments = commentsByPostID[req.params.id] || [];

	comments.push({ id: randomId, content });

	commentsByPostID[req.params.id] = comments;

	await axios
		.post("http://localhost:4005/events", {
			type: "CommentCreated",
			data: {
				id: randomId,
				content,
				postId: req.params.id,
			},
		})
		.catch((err) => {
			console.log(err);
		});

	res.status(201).send(comments);
});

app.post("/events", (req, res) => {
	const { type } = req.body;

	console.log("Event type: ", type);

	res.send({});
});

app.listen(4001, () => {
	console.log("'comments' is running || PORT:4001");
});
