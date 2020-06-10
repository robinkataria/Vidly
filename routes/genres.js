const express = require('express');
const router = express.Router();

const Joi = require('@hapi/joi');

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Mystery' },
    { id: 3, name: 'Adventure' }
];

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

router.get("/", (req, res) => {
    res.send(genres);
});

router.post("/", (req, res) => {
    const { error } = isValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    };
    genres.push(genre);
    res.send(genre);
})

router.put("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre not found!");

    const { error } = isValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre not found!");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})

module.exports = router;