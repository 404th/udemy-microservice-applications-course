import express, { json } from "express"

const app = express()
app.use(json())

const AUTH_SERVICE_PORT = 3000
app.listen( AUTH_SERVICE_PORT, () => {
    console.log(`'auth' is listening on PORT:${ AUTH_SERVICE_PORT }`)
} )
