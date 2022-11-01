export class DatabaseConnectionError extends Error {
    reason = "Database connection failed!"
    
    constructor() {
        super()

        // Only because we are exntending built-in object
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}
