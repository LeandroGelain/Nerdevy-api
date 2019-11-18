const express = require('express');
const app = express()

const login = require('./routes/login_route');

app.use('/login', login);

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