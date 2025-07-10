import React from 'react'
import '../Styles/Card.css'
const BookCard = ({ image, title }) => {
  return (
    <div className='book-card'>
      <img src={image} alt="" />
      <p>{title}</p>
    </div>
  )
}

export default BookCard
