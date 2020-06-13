const express = require('express');
const router = express.Router();

const Genre = require('../src/models/genre.model');

const Joi = require('@hapi/joi');

isValid = (genre) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    })
    return schema.validate({ name: `${genre.name}` });
}

router.get("/", async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post("/", async (req, res) => {
    const { error } = isValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name,
    })
    genre = await genre.save();

    res.send(genre);
})

router.put("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found!");

    const { error } = isValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.set({ name: req.body.name });
    genre.save();
    res.send(genre);
});

router.delete("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found!");

    const result = await Genre.deleteOne({ _id: req.params.id })
    res.send(genre);
})

module.exports = router;