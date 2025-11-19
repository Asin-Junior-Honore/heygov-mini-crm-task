const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');
const { registerSchema, loginSchema } = require('../validators/authValidator');


class AuthController {
    static async register(req, res, next) {
        try {
            const { error, value } = registerSchema.validate(req.body);
            if (error) throw new AppError(error.details[0].message, 400);


            const existing = await User.findOne({ username: value.username });
            if (existing) throw new AppError('Username taken', 409);


            const user = new User(value);
            await user.save();


            res.status(201).json({ message: 'User created' });
        } catch (err) {
            next(err);
        }
    }


    static async login(req, res, next) {
        try {
            const { error, value } = loginSchema.validate(req.body);
            if (error) throw new AppError(error.details[0].message, 400);

            const user = await User.findOne({ email: value.email });
            if (!user) throw new AppError("Invalid credentials", 401);

            const match = await user.comparePassword(value.password);
            if (!match) throw new AppError("Invalid credentials", 401);

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            });

        } catch (err) {
            next(err);
        }
    }

    static async me(req, res, next) {
        try {
            const user = req.user;
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }


}


module.exports = AuthController;