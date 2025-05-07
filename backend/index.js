
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bookRoutes = require('./Routes/bookRoutes')
const reviewRoutes = require('./Routes/reviewRoutes')
const userRoutes = require('./Routes/userRoutes')
const port = process.env.PORT



const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

mongoose.connect(process.env.DB_URL)
    .then(res=>console.log("mongodb connected"))

    app.get('/', (req, res) => {
        res.send('Server is up and running!');
    });
app.use('/', bookRoutes)
app.use('/', userRoutes)
app.use('/', reviewRoutes)
app.listen(port, () => console.log(`listening on port ${port}`))
