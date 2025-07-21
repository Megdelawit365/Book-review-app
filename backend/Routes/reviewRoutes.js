const express = require('express');
const app = express();
const Reviews = require('../models/Review-model');
const jwt = require('jsonwebtoken');
const User = require('../models/User-model');
const cookieParser = require('cookie-parser');
const Review = require('../models/Review-model');
app.use(cookieParser());

const router = express.Router();

router.get('/api/books/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reviews = await Reviews.find({ book: id });
        res.json(reviews);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// router.get('/api/user/reviews/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const reviews = await Review.find({ user: id });
//         res.json(reviews);
//     } catch (error) {
//         res.json({ error: error.message });
//     }
// });

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.usertoken;
        if (!token) {
            return res.status(401).json('unauthenticated user');
        }
        const decodedToken = await jwt.verify(token, process.env.TOKEN_KEY);
        req.id = decodedToken.userId;
        next();
    } catch (err) {
        res.json({ error: err.message });
    }
};

router.post('/api/books/post-review/:id', protect, async (req, res) => {
    try {
        const userId = req.id;
        const { id } = req.params;
        const user = await User.findById(userId);
        const newReview = new Reviews({
            review: req.body.review,
            rating: req.body.rating,
            book: id,
            user: userId,
            username: user.username
        });
        const book = await newReview.save();
        book.reviewCount = book.reviewCount + 1;
        await book.save();
        res.json({ newReview: newReview, userId: userId });
    } catch (err) {
        res.json({ error: err.message });
    }
});

// router.delete('/api/books/reviews/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Reviews.findByIdAndDelete(id);
//         res.json('deleted');
//     } catch (err) {
//         res.json({ error: err.message });
//     }
// });

// router.put('/api/books/reviews/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedReview = await Reviews.findByIdAndUpdate(id, req.body, { new: true });
//         res.json({ message: 'Review updated', updatedReview });
//     } catch (err) {
//         res.json({ error: err.message });
//     }
// });

// module.exports = router;
