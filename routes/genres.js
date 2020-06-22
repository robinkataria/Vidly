const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Genre, validateGenre } = require('../models/genre.model');

router.get("/", async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post("/", auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name,
    });
    await genre.save();

    res.send(genre);
})

router.put("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found!");

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.set({ name: req.body.name });
    genre.save();
    res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found!");

    const result = await Genre.deleteOne({ _id: req.params.id })
    res.send(genre);
})

module.exports = router;