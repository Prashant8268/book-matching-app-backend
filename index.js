const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const Book  = require('./Book');


app.use(bodyParser.json());
app.use(cors());
// Define your routes

const mongoose =require('mongoose');


mongoose.connect(process.env.MONGO_URL,)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
 


// pages/api/matchBooks.js




function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array of genre options
const genres = ['Fantasy', 'Mystery', 'Science Fiction', 'Romance', 'Thriller', 'Historical Fiction'];



// Function to calculate Euclidean distance between two points
function euclideanDistance(point1, point2) {
  const genreWeight = 5; // For example, giving more weight to genre
  const genre1 = point1.genre ? point1.genre.toLowerCase() : '';
  const genre2 = point2.genre ? point2.genre.toLowerCase() : '';
  const genreDiff = genre1 === genre2 ? 0 : 1 * genreWeight;
  const complexityDiff = Math.abs(point2.complexity - point1.complexity);
  return Math.sqrt(Math.pow(genreDiff, 2) + Math.pow(complexityDiff, 2));
}


app.get('/api/student', async( req, res)=>{
  const booksData   = await Book.find();
  return res.json(booksData);
})

app.post('/api/students', async(req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });

  }

  const { genrePreference, complexityPreference } = req.body;
  const userVector = {
    genre: genrePreference,
    complexity: complexityPreference,
  };

  const booksData   = await Book.find();
  const matchedBooks = booksData.filter((book) => {
    const bookVector = {
      genre: book.genre,
      complexity: book.complexity,
    };
    const distance = euclideanDistance(userVector, bookVector);
    return distance < 3;
  });

  res.status(200).json({ matchedBooks });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
