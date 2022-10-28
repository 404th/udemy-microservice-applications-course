import { NextFunction, Request, Response } from "express";

export const errorHandlerMid = (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    console.log("Something went wrong: ", err)

    res.status(400).send({
        message: "Something went wrong (caught inside middleware)"
    })
}
