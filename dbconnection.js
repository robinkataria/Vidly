const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vidlyDB",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log(err));

// mongoose.connection.on('error', err => console.log(err));

module.exports = mongoose.connection;