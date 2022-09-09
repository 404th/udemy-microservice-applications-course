const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.post("/events", (req, res) => {});

app.listen(4003, () => {
	console.log("'moderation' is running || PORT:4003");
});
