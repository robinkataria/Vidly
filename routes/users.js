const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User, validateUser } = require('../models/user.model');

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered!');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        isAdmin: req.body.isAdmin
    });
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    });
});

module.exports = router;