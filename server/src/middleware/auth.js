const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/errorHandler");
const User = require("../models/User");

async function auth(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header) throw new AppError("No token provided", 401);

        const token = header.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) throw new AppError("User not found", 404);

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = auth;
