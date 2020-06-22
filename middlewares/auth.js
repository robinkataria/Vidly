const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied!');

    try {
        const decodedPayload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decodedPayload;
        next();
    } catch (ex) {
        res.status(400);
    }
}