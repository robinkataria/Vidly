const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, minlength: 3, maxlength: 30 },
    email: { type: String, unique: true, require: true, minlength: 5, maxlength: 255 },
    password: { type: String, require: true, minlength: 6, maxlength: 1024 },
    isAdmin: { type: Boolean, require: true },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.TOKEN_SECRET);
}

const User = mongoose.model('User', userSchema);

validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255),
        isAdmin: Joi.boolean().required()
    })

    return schema.validate({
        name: `${user.name}`,
        email: `${user.email}`,
        password: `${user.password}`,
        isAdmin: `${user.isAdmin}`
    })
}

module.exports.User = User;
module.exports.validateUser = validateUser;