import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import '../Styles/Explore.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import BookCard from '../Components/BookCard'
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { MdGridView, MdTune, MdViewList } from 'react-icons/md';

import { FaSliders } from 'react-icons/fa6';
import { Link } from 'react-router-dom'



const apiURL = import.meta.env.VITE_API_URL

const Explore = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [fiction, setFiction] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedOption, setSelectedOption] = useState('all')
  const [view, setView] = useState("grid")
  const [category, setCategory] = useState('all')


  useEffect(() => {
    setIsLoading(true);

    axios.get(`${apiURL}/books`)
      .then((res) => {
        const allBooks = res.data;
        setFiction(allBooks);

        const filtered = category === 'all'
          ? allBooks
          : allBooks.filter(book => book.nytlist === category);

        setFilteredBooks(filtered);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true)
      })

  }, [category])

  const scrollRight = () => {
    document.getElementById('optionsScroll').scrollBy({ left: -200, behavior: 'smooth' });
  }
  const scrollLeft = () => {
    document.getElementById('optionsScroll').scrollBy({ left: 200, behavior: 'smooth' });
  }

  return (
    <>
      <NavBar />
      <main>
        <div className="options-wrapper">
          <button className="scroll-btn" onClick={scrollRight}><FaChevronLeft /></button>
          <div className='options-tab' id="optionsScroll">
            <button
              value="all"
              onClick={() => { setSelectedOption("all"), setCategory("all") }}
              className={selectedOption === "all" ? "selected-option" : ""}
            >
              All
            </button>

            <button
              value="combinedFiction"
              onClick={() => { setSelectedOption("combinedFiction"), setCategory("Fiction") }}
              className={selectedOption === "combinedFiction" ? "selected-option" : ""}
            >
              Fiction - print and e-books
            </button>



            <button
              value="yaHardcover"
              onClick={() => { setSelectedOption("yaHardcover"), setCategory("youngAdult") }}
              className={selectedOption === "yaHardcover" ? "selected-option" : ""}
            >
              Young Adult
            </button>



            <button
              value="childrensSeries"
              onClick={() => { setSelectedOption("childrensSeries"), setCategory('children') }}
              className={selectedOption === "childrensSeries" ? "selected-option" : ""}
            >
              Children's series
            </button>

            <button
              value="graphicManga"
              onClick={() => { setSelectedOption("graphicManga"), setCategory("graphicFiction") }}
              className={selectedOption === "graphicManga" ? "selected-option" : ""}
            >
              Graphic Novels & Manga - Fiction
            </button>

            <button
              value="combinedNonfiction"
              onClick={() => { setSelectedOption("combinedNonfiction"), setCategory("nonfiction") }}
              className={selectedOption === "combinedNonfiction" ? "selected-option" : ""}
            >
              Non-fiction print and e-books
            </button>

            <button
              value="adviceMisc"
              onClick={() => { setSelectedOption("adviceMisc"), setCategory("adviceMisc") }}
              className={selectedOption === "adviceMisc" ? "selected-option" : ""}
            >
              Advice, How-To & Miscellaneous
            </button>

            <button
              value="businessBooks"
              onClick={() => { setSelectedOption("businessBooks"), setCategory("business") }}
              className={selectedOption === "businessBooks" ? "selected-option" : ""}
            >
              Business
            </button>


          </div>
          <button className="scroll-btn" onClick={scrollLeft}><FaChevronRight /></button>
          <button className='filter-btn'><FaSliders /></button>
          <div className="view-toggle">
            <button
              className={`grid ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
            >
              <MdGridView size={20} />
            </button>
            <button
              className={`list ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              <MdViewList size={20} />
            </button>
          </div>

        </div>

        <div className={`bestseller-books-container ${view === 'grid' ? 'grid' : 'list'}`}>
          {isLoading ?
            <div className='spinner' />
            :
            filteredBooks?.map((book, index) => (
              view == "grid" ?
                <Link key={index} to={`/details/${book}`} state={{ title: book.title, image: book.imageURL, author: book.author, isbn: book.isbn }}>
                  <img src={book.imageURL} alt="" />
                </Link>
                :
                <Link key={index} to={`/details/${book}`} state={{ title: book.title, image: book.imageURL, author: book.author, isbn: book.isbn }}>

                  <BookCard className="book-cards" image={book.imageURL} title={book.title} description={book.description} author={book.author} />
                </Link>

            ))
          }
        </div>

      </main>
      <Footer />
    </>
  )
}

export default Explore
