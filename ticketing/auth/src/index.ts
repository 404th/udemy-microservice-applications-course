import express, { json } from "express"

const app = express()
app.use(json())

app.get("/api/users/currentuser", (req, res) => {
    res.send("Hi there!")
})

const AUTH_SERVICE_PORT = 3000
app.listen( AUTH_SERVICE_PORT, () => {
    console.log(`'auth service' is listening on PORT:${ AUTH_SERVICE_PORT }`)
} )
