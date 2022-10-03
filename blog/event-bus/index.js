const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
	const event = req.body;

	events.push(event);

	// posts
	await axios
		.post("http://posts-clusterip-srv:4000/events", event)
		.catch((err) => {
			console.log(err);
		});
	// comments
	await axios
		.post("http://comments-clusterip-srv:4001/events", event)
		.catch((err) => {
			console.log(err);
		});
	// query
	await axios.post("http://query-srv:4002/events", event).catch((err) => {
		console.log(err);
	});
	// moderation
	await axios
		.post("http://moderation-srv:4003/events", event)
		.catch((err) => {
			console.log(err);
		});

	res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
	res.send(events);
});

app.listen(4005, () => {
	console.log("'event-bus' has been changes!");
	console.log("'event-bus' is running || PORT:4005");
});
