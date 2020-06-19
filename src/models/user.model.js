const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, minlength: 3, maxlength: 30 },
    email: { type: String, unique: true, require: true, minlength: 5, maxlength: 255 },
    password: { type: String, require: true, minlength: 6, maxlength: 1024 },
});

const User = mongoose.model('User', userSchema);

validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255)
    })

    return schema.validate({
        name: `${user.name}`,
        email: `${user.email}`,
        password: `${user.password}`,
    })
}

module.exports.User = User;
module.exports.validateUser = validateUser;