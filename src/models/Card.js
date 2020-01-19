const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    points : Number,
    created_by: String,
    members: [String]
})

module.exports = mongoose.model('Card',CardSchema);