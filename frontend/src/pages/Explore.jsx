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
  const [selectedOption, setSelectedOption] = useState('all')
  const [view, setView] = useState("grid")


  useEffect(() => {

    axios.get(`${apiURL}/nyt`)
      .then((res) => {
        const fiction1 = (res.data.fictionHardcover.results?.books)
        const fiction2 = (res.data.combinedFiction.results?.books)
        // const fiction3 = (res.data.tradeFiction.results?.books)
        // const fiction4 = (res.data.massFiction.results?.books)
        setFiction([...fiction1, ...fiction2])
        setIsLoading(false)
      })

  }, [])

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
              onClick={() => setSelectedOption("all")}
              className={selectedOption === "all" ? "selected-option" : ""}
            >
              All
            </button>

            <button
              value="combinedFiction"
              onClick={() => setSelectedOption("combinedFiction")}
              className={selectedOption === "combinedFiction" ? "selected-option" : ""}
            >
              Fiction - print and e-books
            </button>

            <button
              value="audioFiction"
              onClick={() => setSelectedOption("audioFiction")}
              className={selectedOption === "audioFiction" ? "selected-option" : ""}
            >
              Fiction - audio books
            </button>

            <button
              value="yaHardcover"
              onClick={() => setSelectedOption("yaHardcover")}
              className={selectedOption === "yaHardcover" ? "selected-option" : ""}
            >
              Young Adult
            </button>

            <button
              value="middleGradeHardcover"
              onClick={() => setSelectedOption("middleGradeHardcover")}
              className={selectedOption === "middleGradeHardcover" ? "selected-option" : ""}
            >
              Middle Grade
            </button>

            <button
              value="childrensSeries"
              onClick={() => setSelectedOption("childrensSeries")}
              className={selectedOption === "childrensSeries" ? "selected-option" : ""}
            >
              Children's series
            </button>

            <button
              value="graphicManga"
              onClick={() => setSelectedOption("graphicManga")}
              className={selectedOption === "graphicManga" ? "selected-option" : ""}
            >
              Graphic Novels & Manga - Fiction
            </button>

            <button
              value="combinedNonfiction"
              onClick={() => setSelectedOption("combinedNonfiction")}
              className={selectedOption === "combinedNonfiction" ? "selected-option" : ""}
            >
              Non-fiction print and e-books
            </button>

            <button
              value="audioNonfiction"
              onClick={() => setSelectedOption("audioNonfiction")}
              className={selectedOption === "audioNonfiction" ? "selected-option" : ""}
            >
              Non-fiction - audio books
            </button>

            <button
              value="graphicNonfiction"
              onClick={() => setSelectedOption("graphicNonfiction")}
              className={selectedOption === "graphicNonfiction" ? "selected-option" : ""}
            >
              Graphic Novels & Manga - Non-fiction
            </button>

            <button
              value="adviceMisc"
              onClick={() => setSelectedOption("adviceMisc")}
              className={selectedOption === "adviceMisc" ? "selected-option" : ""}
            >
              Advice, How-To & Miscellaneous
            </button>

            <button
              value="businessBooks"
              onClick={() => setSelectedOption("businessBooks")}
              className={selectedOption === "businessBooks" ? "selected-option" : ""}
            >
              Business
            </button>
            <button className='right-btn'>right</button>


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
            fiction?.map((book, index) => (
              view == "grid" ?
                <Link to={`/details/${book.isbns[0].isbn13}`} state={{ title: book.title, author: book.author, image: book.book_image, author: book.author, isbn: book.isbns[0].isbn13 }}>
                  <img src={book.book_image} key={index} alt="" />
                </Link>
                :
                <Link to={`/details/${book.isbns[0].isbn13}`} state={{ title: book.title, author: book.author, image: book.book_image, author: book.author, isbn: book.isbns[0].isbn13 }}>

                  <BookCard key={index} className="book-cards" image={book.book_image} title={book.title} description={book.description} author={book.author} />
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
