import { ValidationError } from "express-validator"

export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super()

        // Only because we are exntending built-in object
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
}
