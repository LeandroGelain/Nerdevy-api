const bodyParser = require('body-parser');
const express = require('express');
const app = express()

var cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const card = require('./routes/cards_routes');
const login = require('./routes/login_route');

app.use('/card/', card)
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