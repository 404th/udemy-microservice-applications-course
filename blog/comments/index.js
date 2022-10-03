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

	comments.push({ id: randomId, content, status: "pending" });

	commentsByPostID[req.params.id] = comments;

	await axios
		.post("http://event-bus-clusterip-srv:4005/events", {
			type: "CommentCreated",
			data: {
				id: randomId,
				content,
				postId: req.params.id,
				status: "pending",
			},
		})
		.catch((err) => {
			console.log(err);
		});

	res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
	const { type, data } = req.body;

	if (type === "CommentModerated") {
		const { postId, id, status, content } = data;
		const comments = commentsByPostID[postId];
		const comment = comments.find((i) => i.id === id);
		comment.status = status;

		await axios.post("http://event-bus-clusterip-srv:4005/events", {
			type: "CommentUpdated",
			data: {
				id,
				postId,
				content,
				status,
			},
		});
	}

	console.log("Event type: ", type);
	res.send({});
});

app.listen(4001, () => {
	console.log("'comments' is running || PORT:4001");
});
