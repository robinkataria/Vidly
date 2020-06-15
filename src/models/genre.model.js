const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        require: true,
    }
});

const Genre = mongoose.model('Genre', genreSchema);

validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    })
    return schema.validate({ name: `${genre.name}` });
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;