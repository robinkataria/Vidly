const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User } = require('../models/user.model');
const Joi = require('@hapi/joi');

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email and Password not matched!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email and Password not matched!');

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send({
        _id: user._id,
        name: user.name,
        email: user.email
    });
});

validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255)
    })

    return schema.validate({
        email: `${user.email}`,
        password: `${user.password}`,
    })
}

module.exports = router;