import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super("Invalid input parameters")

        // Only because we are exntending built-in object
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(){
        return this.errors.map( err => ({
            message: err.msg,
            field: err.param
        }))
    }
}
