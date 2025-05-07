import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import axios from 'axios';


const BookCard = ({ id }) => {

  const [average, setAverage] = useState('')
  const [isSaved, setIsSaved] = useState()
  const [book, setBook] = useState({})
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/api/books/rating/${id}`)
      .then((res) => {
        const avg = res.data.averageRating;
        setAverage(avg ? avg : "--");
      })

    axios.get(`http://localhost:3000/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })

    axios.get(`http://localhost:3000/books/saved/${id}`, { withCredentials: true })
      .then((res) => {
        setIsSaved(res.data)
      })
      .catch((err) => {
        console.log({ error: err.message })
      })

    axios.get('http://localhost:3000/loggedInUser', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
        console.log(user)
      }).catch((err) => {
        console.log(err.message)
        setUser(null)
        console.log(user)
      });


  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:3000/books/save/${id}`, {}, { withCredentials: true })
      .then((res) => {
        setIsSaved(!isSaved)
        console.log(res.data.savedBooks)
      })
      .catch((err) => {
        console.log({ error: err.message })
      })
  }
  return (
    <div className='book-card'>
      <img src={book.imageURL} alt="" />
      <div className='book-card-right'>
        <h4 style={{ marginTop: "0", marginBottom: "0" }}>{book.title}</h4>
        <p style={{ fontSize: "0.8rem", color: "#a7a7a7", fontStyle: "italic" }}>{book.author}</p>
        <p style={{ fontSize: "0.8rem", color: "#a7a7a7", fontStyle: "italic" }}>{book.genre} - {book.pageCount} pages - published in {book.publishYear}</p>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <span><FaStar style={{ color: "#00a5cf", fontSize: "0.8rem" }} /> {average}</span>
          {user? <> <FaBookmark onClick={handleSave} style={{ fontSize: "2rem", color: isSaved ? 'blue' : 'grey' }} />
          </> : ''}
        </div>


      </div>
    </div>
  )
}

export default BookCard
