class AppError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}


function notFound(req, res, next) {
    const err = new AppError('Route not found', 404);
    next(err);
}


function handler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err);
    res.status(status).json({ error: message });
}


module.exports = { AppError, notFound, handler };