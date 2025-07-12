const express = require("express");
const Book = require("../models/Book-model");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/api/nyt", async (req, res) => {
  try {
    const fictionHardcover = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API}`
    );
    const combinedFiction = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.NYT_API}`
    );
    // const tradeFiction = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/paperback-trade-fiction.json?api-key=${process.env.NYT_API}`
    // );
    // const massFiction = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/mass-market-paperback.json?api-key=${process.env.NYT_API}`
    // );
    // const yaHardcover = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/young-adult-hardcover.json?api-key=${process.env.NYT_API}`
    // );
    // const yaPaperback = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/young-adult-paperback.json?api-key=${process.env.NYT_API}`
    // );

    // const middleGradeHardcover = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/middle-grade-hardcover.json?api-key=${process.env.NYT_API}`
    // );

    // const middleGradePaperback = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/middle-grade-paperback.json?api-key=${process.env.NYT_API}`
    // );

    // const childrensSeries = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/series-books.json?api-key=${process.env.NYT_API}`
    // );

    // const graphicManga = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/graphic-books-and-manga.json?api-key=${process.env.NYT_API}`
    // );

    // const combinedNonfiction = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${process.env.NYT_API}`
    // );

    // const nonfictionHardcover = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${process.env.NYT_API}`
    // );

    // const nonfictionPaperback = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/paperback-nonfiction.json?api-key=${process.env.NYT_API}`
    // );

    // const adviceMisc = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/advice-how-to-and-miscellaneous.json?api-key=${process.env.NYT_API}`
    // );

    // const businessBooks = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/business-books.json?api-key=${process.env.NYT_API}`
    // );

    // const audioFiction = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/audio-fiction.json?api-key=${process.env.NYT_API}`
    // );

    // const audioNonfiction = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/audio-nonfiction.json?api-key=${process.env.NYT_API}`
    // );

    // const pictureBooks = await fetch(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/picture-books.json?api-key=${process.env.NYT_API}`
    // );

    const data = {
      fictionHardcover: await fictionHardcover.json(),
      combinedFiction: await combinedFiction.json(),
      // tradeFiction: await tradeFiction.json(),
      // massFiction: await massFiction.json(),
      // yaHardcover: await yaHardcover.json(),
      // yaPaperback: await yaPaperback.json(),
      // middleGradeHardcover: await middleGradeHardcover.json(),
      // middleGradePaperback: await middleGradePaperback.json(),
      // childrensSeries: await childrensSeries.json(),
      // graphicManga: await graphicManga.json(),
      // nonfictionHardcover: await nonfictionHardcover.json(),
      // adviceMisc: await adviceMisc.json(),
    };
    console.log("Fetched data:", data);
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch books:", err);
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
