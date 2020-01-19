const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const card = require('./routes/cards_routes');
const user = require('./routes/user_route');

const dotenv = require('dotenv')
dotenv.config()

var cors = require('cors');


const app = express()
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0-j0elh.mongodb.net/appDataBase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/card', card)
app.use('/user', user);


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