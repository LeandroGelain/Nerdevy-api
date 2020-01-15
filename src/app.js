const express = require('express');
const app = express()
const morgan = require('morgan')

const card = require('./routes/cards_routes');
const login = require('./routes/user_route');

var cors = require('cors');

app.use(morgan('dev'));

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/card', card)
app.use('/user', login);


app.use((req, res, next) => {
    const error = new Error("Route not found (404)");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : error.message
    });
});

module.exports = app;