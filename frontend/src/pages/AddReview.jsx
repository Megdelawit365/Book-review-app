import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import '../Styles/Review.css'
const apiURL = import.meta.env.VITE_API_URL

const AddReview = () => {
    const location = useLocation();
    const { rate, title, author, description, pageCount, imageURL, date, isbn } = location.state;
    const [rating, setRating] = useState(rate)
    const [review, setReview] = useState("")
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    console.log(location.state)

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(location.state)
    }, [])
    const handleSubmit = () => {
        e.preventDefault();
        setLoading(true);

        axios.post(`${apiURL}/books`, { title: title, author: author, description: description, date: date, imageURL: imageURL, pageCount: pageCount, isbn: isbn }, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setBook(res.data.id)
            })
            .catch((err) => {
                console.log(err)
            })

        axios.post(`${apiURL}/books/post-review/`, { rating: rating, review: review, book: book }, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <NavBar />
            <main className='review-main'>
                <h1>
                    {title}
                </h1>
                <form onSubmit={handleSubmit} action="">


                    <div className='rating-container'>

                        <Rating
                            initialRating={rating}
                            emptySymbol={<FaRegStar size={30} color="#ccc" />}
                            fullSymbol={<FaStar size={30} color="#fcd34d" />}
                            onChange={(rate) => setRating(rate)}
                        />
                    </div>
                    <h2>Share your thoughts about this book.</h2>
                    <textarea placeholder='Write Your Review...' name="" id="" />
                    <button type="submit" >Post Review
                        {loading &&
                            <div className='spinner-small' />
                        }
                    </button>
                </form>


            </main>
        </>
    )
}

export default AddReview
