const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    publishYear: {
        required: true,
        type: Number
    },
    genre:{
        type: String
    },
    description:{
        type: String,
        // required: true
    },
    rating:{
        type:[Number],
        default: []
    },
    imageURL:{
        type:String
    },
    pageCount:{
        type:Number,
        required: true
    },
    reviewCount:{
        type:Number,
        default: 0
    }
})

const Book = mongoose.model('Book',bookSchema )
module.exports = Book