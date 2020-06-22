const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = require('./genre.model.js').genreSchema;

const movieSchema = new mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 30, trim: true, require: true, },
    genre: { type: genreSchema, require: true },
    numberInStock: { type: Number, min: 0, max: 255, require: true },
    dailyRentalRate: { type: Number, min: 0, max: 255, require: true },
});

const Movie = mongoose.model('Movie', movieSchema);

validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
    })
    return schema.validate({
        title: `${movie.title}`,
        genreId: `${movie.genreId}`,
        numberInStock: `${movie.numberInStock}`,
        dailyRentalRate: `${movie.dailyRentalRate}`
    });
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;