const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vidlyDB",
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', err => console.log(err));

module.exports = mongoose.connection;