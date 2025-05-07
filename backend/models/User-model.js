const mongoose = require("mongoose");
const Book = require('./Book-model')


const userSchema = new mongoose.Schema({
  email:{
    required: true,
    type: String
  },
  password:{
    required: true,
    type: String
  },
  username:{
    required: true,
    type: String
  },
  savedBooks:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: Book
  },
  joined:{
    type: Date,
    default: Date.now
  }
  }
);



module.exports = mongoose.model("User", userSchema);