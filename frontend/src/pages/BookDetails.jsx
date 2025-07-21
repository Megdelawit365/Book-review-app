import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { FaStar, FaRegStar } from 'react-icons/fa';
import StarRatings from 'react-star-ratings'
import Rating from 'react-rating';
import '../Styles/Details.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
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
    const [rating, setRating] = useState(0);
    const [user, setUser] = useState("")
    const Navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
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
        setRating(0)

    }, [isbn])

    useEffect(() => {
        axios.get(`${apiURL}/loggedInUser`, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.email)
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [])
    useEffect(() => {
        if (book) {
            console.log(book?.volumeInfo?.industryIdentifiers?.[1]?.identifier || book?.volumeInfo?.industryIdentifiers?.[0]?.identifier || "no isbn")
        }
    }, [book])


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
                            <button>Write a Review</button>
                        </div>
                    </div>
                    <div className='right-half'>
                        <div>
                            <h1>{title || book[0]?.volumeInfo?.title}</h1>
                            <h2>{author || book[0]?.volumeInfo?.authors[0]} </h2>
                            {/* <p>{book[0]?.volumeInfo?.description}</p> */}
                        </div>

                        <div className="star-rating">
                            <Rating
                                initialRating={3.5}
                                emptySymbol={<FaStar size={28} color="rgba(0,0,0,0.05)" />}
                                fullSymbol={<FaStar size={28} color="#fcd34d" />}
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
                    <div className='rating-link'>

                        <Rating
                            initialRating={rating}

                            emptySymbol={<FaRegStar size={50} color="#ccc" />}
                            fullSymbol={<FaStar size={50} color="#fcd34d" />}
                            onChange={(rate) => {
                                setRating(rate), Navigate('/add-review',
                                    {
                                        state: {
                                            rate: rate,
                                            title: title || book[0]?.volumeInfo?.title,
                                            author: author || book[0]?.volumeInfo?.authors[0],
                                            description: book[0]?.volumeInfo?.description || "",
                                            pageCount: book[0]?.volumeInfo?.pageCount,
                                            imageURL: book?.volumeInfo?.imageLinks?.thumbnail || 'https://placehold.co/200x300?text=No+Cover',
                                            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                                            isbn: book?.volumeInfo?.industryIdentifiers?.[1]?.identifier || book?.volumeInfo?.industryIdentifiers?.[0]?.identifier
                                        }
                                    })

                            }}
                        />
                        <p>Rate this book</p>
                    </div>
                    <div className='overall-rating'>
                        <div>
                            <p>Overall rating</p>
                            <Rating
                                initialRating={2.4}
                                emptySymbol={<FaStar size={25} color="rgba(0,0,0,0.05)" />}
                                fullSymbol={<FaStar size={25} color="#fcd34d" />}
                                readonly
                                className='rate'

                            />
                            <p>10 reviews</p>
                        </div>
                        <div className='bars-container'>
                            <div className='bars-child'>
                                <p>5 stars</p>
                                <div className='bars-empty bars'>
                                    <div className=' bars bars-filled'></div>
                                </div>
                            </div>
                            <div className='bars-child'>
                                <p>4 stars</p>
                                <div className='bars-empty bars'>
                                    <div className=' bars bars-filled f'></div>
                                </div>
                            </div><div className='bars-child'>
                                <p>3 stars</p>
                                <div className='bars-empty bars'>
                                    <div className=' bars bars-filled th'></div>
                                </div>
                            </div><div className='bars-child'>
                                <p>2 stars</p>
                                <div className='bars-empty bars'>
                                    <div className=' bars bars-filled tw'></div>
                                </div>
                            </div><div className='bars-child'>
                                <p>1 star</p>
                                <div className='bars-empty bars'>
                                    <div className=' bars bars-filled'></div>
                                </div>
                            </div>

                        </div>
                    </div>

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