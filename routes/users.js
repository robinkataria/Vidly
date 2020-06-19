const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User, validateUser } = require('../src/models/user.model');

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered!');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    await user.save();

    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, process.env.TOKEN_SECRET);
    res.send(token);
});

module.exports = router;