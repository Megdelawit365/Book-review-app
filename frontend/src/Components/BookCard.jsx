import React from 'react'
import '../Styles/Card.css'
const BookCard = ({ image, title, description, author }) => {
  return (
    <div className='book-card'>
      <img src={image} alt="" />
      <div className='details'>
        <h1>{title}</h1>
        <p>By {author}</p>
        <p className='light'>{description}</p>
      </div>
      <button>Want to read</button>
    </div>
  )
}

export default BookCard
