const mongoose = require('mongoose');

// Define the schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  complexity: {
    type: Number,
    required: true
  },
  img: {
    type:String,
    required: true
  }
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
