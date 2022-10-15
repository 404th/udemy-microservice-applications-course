import express, { json } from "express"

const app = express()
app.use(json())

app.get("/api/users/currentuser", (req, res) => {
    res.json("Hi, theredagilar!")
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`'auth' is running on PORT:${PORT};`)
})
