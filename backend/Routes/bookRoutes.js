const express = require("express");
const Book = require("../models/Book-model");
const mongoose = require("mongoose");
const router = express.Router();




router.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to get books" });
  }
});

router.delete("/api/books", async (req, res) => {
  try {
    await Book.deleteMany({});
    res.json({ message: "All books deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete books" });
  }
});

router.get("/api/searchGoogleBooks", async (req, res) => {
  const query = req.query.q;
  try {
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=20&langRestrict=en&printType=books`
    );
    const searchResult = await result.json();
    res.json(searchResult);
  } catch (err) {
    console.error("Failed to fetch books:", err);
  }
});

router.get("/api/searchGoogleBooks/isbn", async (req, res) => {
  const query = req.query.q;
  try {
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&maxResults=20&langRestrict=en&printType=books`
    );
    const searchResult = await result.json();
    res.json(searchResult);
  } catch (err) {
    console.error("Failed to fetch books:", err);
  }
});

router.get("/api/searchGoogleBooks/author", async (req, res) => {
  const query = req.query.q;
  try {
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&maxResults=20&langRestrict=en&printType=books`
    );
    const searchResult = await result.json();
    res.json(searchResult);
  } catch (err) {
    console.error("Failed to fetch books:", err);
  }
});

// router.get("/api/books", async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// router.get("/api/books/title/:title", async (req, res) => {
//   try {
//     const { title } = req.params;
//     console.log(title);
//     const book = await Book.findOne({
//       title: { $regex: new RegExp(`^${title}$`, "i") },
//     });
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     res.json(book);
//   } catch (err) {
//     if (err.status == 404) {
//       res.json("book not found");
//     }
//     res.json({ error: err.message });
//   }
// });

// router.get("/api/books/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const book = await Book.findById(id);
//     res.json(book);
//     // console.log(book.reviewCount)
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// router.post("/api/books", async (req, res) => {
//   try {
//     const { title, author, genre, description, date, imageURL, pageCount } =
//       req.body;
//     const newBook = new Book({
//       title: title,
//       author: author,
//       genre: genre,
//       description: description,
//       publishYear: date,
//       imageURL: imageURL,
//       pageCount: pageCount,
//     });
//     await newBook.save();
//     res.json({ message: "Book added successfully", book_added: newBook });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// router.delete("/api/books/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBook = await Book.findByIdAndDelete(id);
//     res.json("deleted");
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// router.get("/api/books/rating/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Book.aggregate([
//       { $match: { _id: new mongoose.Types.ObjectId(id) } },
//       { $project: { averageRating: { $avg: "$rating" } } },
//       { $project: { averageRating: { $round: ["$averageRating", 2] } } },
//     ]);

//     res.json(result[0]);
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// router.patch("/api/books/rating/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const book = await Book.findById(id);
//     const rating = req.body.rating;
//     book.rating.push(rating);
//     book.reviewCount = book.reviewCount + 1;
//     await book.save();
//     res.json({
//       newRating: rating,
//       bookRating: book.rating,
//       ratingCount: ratingCount,
//     });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

module.exports = router;
