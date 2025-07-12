import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { FaStar, FaRegStar } from 'react-icons/fa';
import StarRatings from 'react-star-ratings'
import '../Styles/Details.css'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
const apiURL = import.meta.env.VITE_API_URL

const BookDetails = () => {
    const { state } = useLocation();
    const title = state?.title;
    const image = state?.image;
    const author = state?.author;
    const isbn = state?.isbn;
    const [book, setBook] = useState({})
    const [moreBooks, setMoreBooks] = useState([])

    useEffect(() => {

        axios.get(`${apiURL}/searchGoogleBooks/isbn?q=${isbn}`)
            .then((res) => {
                console.log(res.data.items)
                setBook(res.data.items)
            })

        axios.get(`${apiURL}/searchGoogleBooks/author?q=${author}`)
            .then((res) => {
                console.log(res.data.items)
                setMoreBooks(res.data.items)
            })


    }, [])


    const dateStr = book[0]?.volumeInfo.publishedDate;
    const date = new Date(dateStr);

    return (
        <>
            <NavBar />
            <main className='book-details'>
                <section className='top'>
                    <div className='image-container'>
                        <img src={image} alt="" />
                        <div className='btn-container'>
                            <button>Buy now</button>
                            <button>Want to read</button>
                        </div>
                    </div>
                    <div className='right-half'>
                        <div>
                            <h1>{title}</h1>
                            <h2>{author} </h2>
                            {/* <p>{book[0]?.volumeInfo?.description}</p> */}
                        </div>

                        <div className="star-rating">
                            <StarRatings
                                rating={0}
                                starRatedColor="gold"
                                numberOfStars={5}
                                starDimension="30px"
                                starSpacing="5px"
                            />
                            <h2>0</h2>
                            <p>0 ratings</p>
                        </div>
                        <div className='publish-details'>
                            <p>First published in {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p>Publisher: {book[0]?.volumeInfo?.publisher}</p>
                        </div>

                        <div className='description'>
                            {book[0]?.volumeInfo?.description}
                        </div>
                    </div>

                </section>
                <section className='ratings-section'>
                    <h1>Ratings & Reviews</h1>
                    <div className='rating-input'>
                        <div className="star-rating">
                            <StarRatings
                                rating={0}
                                starRatedColor="gold"
                                numberOfStars={5}
                                starDimension="30px"
                                starSpacing="5px"
                            />

                        </div>
                        <textarea placeholder='Leave a review here...'> </textarea>
                    </div>
                    <button>Submit</button>

                </section>
                <section className='more-books-section'>
                    <h1>More Books By {author}</h1>
                    <div className='img-container'>
                        {
                            moreBooks?.map((book, index) => (
                                <img src={book?.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195?text=No+Image'} key={index} alt="" />
                            ))
                        }
                    </div>

                </section>
            </main>
            <Footer />
        </>
    )
}

export default BookDetails
