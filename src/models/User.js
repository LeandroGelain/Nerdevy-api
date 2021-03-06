const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    first_name: String,
    last_name: String,
    pwd: String,
    category: String,
    institution: String,
    born_date: String,
    city: String,
    state: String,
    country: String,
    points_user: Number,
    created_date: {
        type:Date,
        default:Date.now()
    },
    // adicionar esses campos que não tinha previsto
    friends:[String],
    imgName : {
        type: String,
        default: "none",
    },
    imgData: {
        type: String,
    },
    bio: String,
    gitLabProfile:String,
    githubProfile:String
})

module.exports = mongoose.model('User',UserSchema);