const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config();

const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;

exports.Verify = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split('Bearer ')[1];  // Bearer <token>

        if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
        if (token == null) return res.sendStatus(401);  // No token present

        // Verify using jwt to see if token has been tampered with or if it has expired.
        // that's like checking the integrity of the cookie
        jwt.verify(token, SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login" });
            }

            const { id } = decoded; // get user id from the decoded token
            const user = await User.findById(id); // find user by that `id`
            const { password, ...data } = user._doc; // return user object without the password
            req.user = data; // put the data object into req.user
            next();
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}