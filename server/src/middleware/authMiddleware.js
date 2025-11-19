const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');


module.exports = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return next();


    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return next(new AppError('Invalid auth header', 401));


    try {
        const payload = jwt.verify(parts[1], process.env.JWT_SECRET);
        req.user = { id: payload.id, username: payload.username };
        next();
    } catch (err) {
        next(new AppError('Invalid token', 401));
    }
};