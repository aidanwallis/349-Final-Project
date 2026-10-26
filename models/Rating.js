const mongoose = require('mongoose');

// Schema for rated games
const ratingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    genre: {
        type: String,
        trim: true
    },
    datePlayed: {
        type: Date
    }
});

// Rating model
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;