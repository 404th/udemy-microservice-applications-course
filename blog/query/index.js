const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
	if (type === "PostCreated") {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	}

	if (type === "CommentCreated") {
		const { id, content, postId, status } = data;
		const post = posts[postId];
		post.comments.push({ id, content, status });
	}

	if (type === "CommentUpdated") {
		const { id, content, postId, status } = data;
		const post = posts[postId];
		const comments = post.comments;
		const comment = comments.find((i) => i.id === id);

		comment.content = content;
		comment.status = status;
	}
};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	res.send({});
});

app.listen(4002, async () => {
	console.log("'query' is running || PORT:4002");

	const res = await axios
		.get("http://event-bus-clusterip-srv:4005/events")
		.catch((err) => {
			console.error(err);
		});

	for (let event of res.data) {
		handleEvent(event.type, event.data);
	}
});
