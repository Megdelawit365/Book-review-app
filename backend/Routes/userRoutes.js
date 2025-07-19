const express = require('express');
const app = express();
const User = require('../models/User-model')
const Book = require('../models/Book-model')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
app.use(express.json());
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

router.post('/api/signup', async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, firstName, lastName, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_KEY, { expiresIn: '1hr' });

        res.cookie("usertoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });


        res.json({ message: "Signed up", user: newUser, token });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json('User does not exist');
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json("Incorrect password");
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.TOKEN_KEY, { expiresIn: '1hr' });

       res.cookie("usertoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        res.json({ message: "Logged in", user: existingUser, token });
    } catch (error) {
        res.json({ error: error.message });
    }
});

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.usertoken
        if (!token) {
            return res.status(401).json('unauthenticated user')
        }
        const decodedToken = await jwt.verify(token, process.env.TOKEN_KEY)
        req.id = decodedToken.userId
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Token expired or invalid' });
    }

}

router.get('/profile', protect, async (req, res) => {
    try {
        const id = req.id
        const user = await User.findById(id)
        res.json(user)
    }
    catch (err) {
        res.json({ error: err.message })
    }
})

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    res.json({ userName: user.username, userId: user._id })
})

router.get('/api/loggedInUser', protect, async (req, res) => {
    try {
        const id = req.id || ''
        const user = await User.findById(id)
        res.json({ id: id, user: user, email: user.email })
    } catch (err) {
        res.json(err.message)
    }

})

router.patch('/books/save/:id', protect, async (req, res) => {
    try {
        const userId = req.id
        const bookId = req.params.id
        const user = await User.findById(userId)

        let bookIsSaved;
        if (user.savedBooks.includes(bookId)) {
            user.savedBooks.pull(bookId)
            bookIsSaved = false
        } else {
            bookIsSaved = true
            user.savedBooks.push(bookId)

        }
        await user.save()

        res.json({ bookIsSaved: bookIsSaved, savedBook: user.savedBooks })
    } catch (err) {
        res.json({ error: err.message })
    }
})

router.get('/books/saved/:id', protect, async (req, res) => {
    try {
        const userId = req.id
        const bookId = req.params.id
        const user = await User.findById(userId)
        const isSaved = user.savedBooks.includes(bookId)
        res.json(isSaved)
    } catch (err) {
        res.json({ error: err.message })
    }
})

router.get('/books/saved-books/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).populate('savedBooks')
        res.json(user.savedBooks)

    } catch (err) {
        res.json({ error: err.message })
    }
})

router.post('/api/logout', async (req, res) => {
    try {
        const usertoken = req.cookies.usertoken;
        // if (usertoken) {
        //     blacklistToken(usertoken);
        // }
        res.clearCookie('usertoken').json({ message: 'Logged out' });

    }
    catch (err) {
        res.json({ error: err.message })
    }
})
module.exports = router
