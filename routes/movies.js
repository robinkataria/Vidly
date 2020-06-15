const express = require('express');
const router = express.Router();

const { Movie, validateMovie } = require("../src/models/movie.model");
const { Genre } = require('../src/models/genre.model');

router.get("/", async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post("/", async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid Genre ID!')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    })
    movie = await movie.save();

    res.send(movie);
})

router.put("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found!");

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid Genre ID!')

    movie.set({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    movie.save();
    res.send(movie);
});

router.delete("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found!");

    const result = await Movie.deleteOne({ _id: req.params.id })
    res.send(movie);
})

module.exports = router;