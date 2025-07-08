import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import '../Styles/Explore.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const apiURL = import.meta.env.VITE_API_URL

const Explore = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [fiction, setFiction] = useState([])

  useEffect(() => {

    axios.get(`${apiURL}/nyt`)
      .then((res) => {
        setFiction(res.data.fictionHardcover.results?.books)
        setIsLoading(false)
      })

  }, [])

  return (
    <>
      <NavBar />
      <main>
        <div className='options-tab'>
          <p>All</p>
          <p>Fiction - print and e-books</p>
          <p>Fiction - audio books</p>
          <p>Young Adult</p>
          <p>Middle Grade</p>
          <p>Children's series</p>
          <p>Graphic Novels & Manga - Fiction</p>
          <p>Non-fiction print and e-books</p>
          <p>Non-fiction - audio books</p>
          <p>Graphic Novels & Manga - Non-fiction</p>
          <p>Advice, How-To & Miscellaneous</p>
          <p>Business</p>

        </div>
        <div className='bestseller-books-container'>
          {isLoading ?
            <div className='spinner' />
            :
            fiction?.map((book, index) => (
              <img src={book.book_image} key={index} alt="" />
            ))
          }
        </div>

      </main>
      <Footer />
    </>
  )
}

export default Explore
