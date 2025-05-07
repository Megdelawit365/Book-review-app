const mongoose = require('mongoose')
const Book = require('./Book-model')
const User = require('./User-model')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const Review = mongoose.model('Review',reviewSchema )
module.exports = Review