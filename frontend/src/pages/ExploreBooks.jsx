import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from '../../Components/BookCard';



const ExploreBooks = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [books, setBooks] = useState([])
    const [pageFilter, setPageFilter] = useState('-');
    const [genreFilter, setGenreFilter] = useState('-');
    const [ratingFilter, setRatingFilter] = useState('-');
    const [author, setAuthor] = useState("")


    useEffect(() => {
        axios.get('https://book-review-app-1-1hd8.onrender.com/api/books')
            .then((res) => setBooks(res.data))
            .catch((err) => console.log(err.message))


    
    }, [])
   

    const filteredBooks = pageFilter == '-' && genreFilter == '-' && ratingFilter == '-' && author=="" ? books : (
        books.filter(book => {
            const [minPage, maxPage] = pageFilter.split('-').map(Number)
            const [minRating, maxRating] = ratingFilter.split('-').map(Number)

            const pageMatch = pageFilter === '-' || (book.pageCount >= minPage && book.pageCount <= maxPage)
            const genreMatch = genreFilter === '-' || (book.genre == genreFilter)
            const ratingMatch = ratingFilter === '-' || (book.rating >= minRating && book.rating <= maxRating)
            const authorMatch = author ===""|| (book.author.toLowerCase() == author.toLowerCase())

        
            return pageMatch && genreMatch && ratingMatch && authorMatch

        })
    )



    return (
        <>
            <NavBar />
            <main  >
                <h4 style={{margin:"0"}}>Filter Books <IoIosArrowDown className=' small-screen align-right' onClick={() => setMenuOpen(!menuOpen)} /></h4>

                <div className={`filter-bar flex-row ${menuOpen ? 'expand flex-row flex-wrap ' : 'hide '}`}>
                    <div className='flex-column align-left'>
                        <p>Number Of Pages</p>
                        <select onChange={(e) => setPageFilter(e.target.value)}>
                            <option value="-">-</option>
                            <option value="0-100">0-100</option>
                            <option value="100-200">100-200</option>
                            <option value="200-300">200-300</option>
                            <option value="300-400">300-400</option>
                            <option value="400-500">400-500</option>
                            <option value="500-1000">500-1000</option>


                        </select>
                    </div>
                    <div className='flex-column align-left'>
                        <p>Rating</p>
                        <select onChange={(e) => setRatingFilter(e.target.value)}>
                            <option value="-">-</option>
                            <option value="1.0-2.0">1.0 - 2.0</option>
                            <option value="2.0-3.0">2.0 - 3.0</option>
                            <option value="3.0-4.0">3.0 - 4.0</option>
                            <option value="4.0-5.0">4.0 - 5.0</option>


                        </select>
                    </div >
                    <div className='flex-column align-left'>
                        <p>Genre</p>
                        <select onChange={(e) => setGenreFilter(e.target.value)}>
                            <option value="-">-</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Science Fiction">Science Fiction</option>
                            <option value="Horror">Horror</option>
                            <option value="Young Adult">Young Adult</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Historical Fiction">Historical Fiction</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Mystery">Mystery</option>

                        </select>
                    </div>
                

                    <div className='flex-column align-center'>
                        <p style={{marginBottom:"0"}}>Author</p>
                            <input style={{marginTop:"0.3rem", paddingTop:"0.5rem",  paddingBottom:"0.5rem"}} onChange={(e)=>setAuthor(e.target.value)} type="text" />
                    </div>

                    <div className='flex-column align-center'>
                        <p style={{marginBottom:"0"}}>Author</p>
                            <input style={{marginTop:"0.3rem", paddingTop:"0.5rem",  paddingBottom:"0.5rem"}} onChange={(e)=>setAuthor(e.target.value)} type="text" />
                    </div>

                </div>

                <div className='book-display'>
                    <h3>Popular Books</h3>
                    <div className='book-card-container'>
                        {filteredBooks.length>0? (filteredBooks.map((book, index) => {
                            return <Link key={index} to={`/books/${book._id}`}><BookCard id={book._id} /></Link>
                        })):(<>No Books Found</>)}
                    </div>


                </div>
                
            </main>
            <Footer />
        </>
    )
}

export default ExploreBooks
