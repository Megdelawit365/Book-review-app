const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");


const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bookRoutes = require("./Routes/bookRoutes");
// const reviewRoutes = require("./Routes/reviewRoutes");
// const userRoutes = require("./Routes/userRoutes");
const port = process.env.PORT;
const Book = require("./models/Book-model");

const books = require("./books.json");

const app = express();
app.use(express.json());

app.use(
  cors({
origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

// mongoose.connect(process.env.DB_URL)
//     .then(async(res)=>{

//         console.log("mongodb connected");
//         const existingBooks = await Book.find({});
//         if(existingBooks.length==0){
//             await Book.insertMany(books);
//             console.log('books added');
//         }else{
//             console.log('books already added')
//         }
//     }).catch((err)=>console.log(err.message))

//     app.get('/', (req, res) => {
//         res.send('Server is up and running!');
//     });
app.use("/", bookRoutes);
// app.use("/", userRoutes);
// app.use("/", reviewRoutes);
app.listen(port, () => console.log(`listening on port ${port}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
  );
}
