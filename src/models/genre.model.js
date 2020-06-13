const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        require: true,
    }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;