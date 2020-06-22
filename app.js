const express = require('express');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const dbConnection = require('./dbconnection');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const logins = require('./routes/logins');

const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/logins', logins);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port ${port}`));