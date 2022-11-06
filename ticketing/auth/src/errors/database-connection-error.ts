import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError {
    statusCode = 500
    reason = "Database connection failed!"
    
    constructor() {
        super("Database connection error occured")

        // Only because we are exntending built-in object
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [{ message: this.reason }]
    }
}
