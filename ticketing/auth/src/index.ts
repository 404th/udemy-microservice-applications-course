import express, { json } from "express"

import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"

import { errorHandlerMid } from "./middlewares/error-handler"

const app = express()
app.use(json())

app.use( currentUserRouter )
app.use( signinRouter )
app.use( signoutRouter )
app.use( signupRouter )

app.use( errorHandlerMid )

const AUTH_SERVICE_PORT = 3000
app.listen( AUTH_SERVICE_PORT, () => {
    console.log(`'auth service' is listening on PORT:${ AUTH_SERVICE_PORT }`)
} )
