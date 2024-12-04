const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        first_name: {
            type: String,
            required: "Your firstname is required",
            max: 25,
        },
        last_name: {
            type: String,
            required: "Your lastname is required",
            max: 25,
        },
        email: {
            type: String,
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: "Your password is required",
            select: false,
            max: 25,
        },
        role: {
            type: String,
            required: true,
            default: "0x01",
        },
    },
    { timestamps: true },
    { collection: 'user' }
);

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.generateAccessJWT = function () {
    let payload = {
      id: this._id,
      first_name: this.first_name,
      last_name: this.last_name
    };
    return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
      expiresIn: '1',
    });
  };

  module.exports = mongoose.model('User', UserSchema);