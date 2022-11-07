import express, { json } from "express"
import "express-async-errors";
import mongoose from "mongoose"

import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"

import { errorHandlerMid } from "./middlewares/error-handler"
import { NotFoundError } from "./errors/NotFoundError"

const app = express()
app.use(json())

app.use( currentUserRouter )
app.use( signinRouter )
app.use( signoutRouter )
app.use( signupRouter )

app.all("*", async () => {
    throw new NotFoundError();
})

app.use( errorHandlerMid )

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
        console.log("Connected to MongoDB")
    } catch(err) {
        console.error(err)
    }

    const AUTH_SERVICE_PORT = 3000
    app.listen( AUTH_SERVICE_PORT, () => {
        console.log(`'auth service' is listening on PORT:${ AUTH_SERVICE_PORT }`)
    } )
}
