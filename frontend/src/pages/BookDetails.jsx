import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { FaStar, FaRegStar } from 'react-icons/fa';
import StarRatings from 'react-star-ratings'
import '../Styles/Details.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { FiChevronDown } from 'react-icons/fi';
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

        axios.get(`${apiURL}/searchGoogleBooks/author?q=${author || book[0]?.volumeInfo?.authors[0]}`)
            .then((res) => {
                console.log(res.data.items)
                setMoreBooks(res.data.items)
            })


    }, [isbn])


    const dateStr = book?.[0]?.volumeInfo.publishedDate;
    const date = new Date(dateStr);

    return (
        <>
            <NavBar />
            <main className='book-details'>
                <section className='top'>
                    <div className='image-container'>
                        <img src={image || book[0]?.volumeInfo?.imageLinks?.thumbnail} alt="" />
                        <div className='btn-container'>
                            <button>Want to read</button>
                            <button><FiChevronDown className='icon' /></button>
                        </div>
                    </div>
                    <div className='right-half'>
                        <div>
                            <h1>{title || book[0]?.volumeInfo?.title}</h1>
                            <h2>{author || book[0]?.volumeInfo?.authors[0]} </h2>
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
                            {
                                book[0]?.volumeInfo?.description || <div className='spinner'></div>
                            }
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
                        <textarea placeholder='Leave a review here...' />
                    </div>
                    <button>Submit</button>

                </section>
                <section className='more-books-section'>
                    <h1>More Books By {author || book[0]?.volumeInfo?.authors[0]}</h1>
                    <div className='img-container'>
                        {
                            moreBooks?.map((book, index) => (
                                <Link state={{ isbn: book?.volumeInfo?.industryIdentifiers?.[1]?.identifier || book?.volumeInfo?.industryIdentifiers?.[0]?.identifier }} key={index} to={`/details/${book?.volumeInfo?.industryIdentifiers?.[1]?.identifier || book?.volumeInfo?.industryIdentifiers?.[0]?.identifier}`}>
                                    <img src={book?.volumeInfo?.imageLinks?.thumbnail || 'https://placehold.co/200x300?text=No+Cover'} alt="" />
                                </Link>
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
