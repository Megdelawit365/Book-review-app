// import React from 'react'
// import { FaStar } from "react-icons/fa6";
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react'
// import NavBar from '../../Components/NavBar';
// import Footer from '../../Components/Footer';
// import { ToastContainer, toast } from 'react-toastify';
// import { MdDelete } from "react-icons/md";




// const BookDetails = () => {

//   const { id } = useParams()
//   const [book, setBook] = useState({})
//   const [reviews, setReviews] = useState([])
//   const [ratings, setRatings] = useState([])
//   const [average, setAverage] = useState('')
//   const [showReviewForm, setShowReviewForm] = useState(false)
//   const [review, setReview] = useState('')
//   const [rating, setRating] = useState('')
//   const [isSaved, setIsSaved] = useState(false)
//   const [user, setUser] = useState(null)




//   useEffect(() => {
//     axios.get(`http://localhost:3000/api/books/${id}`)
//       .then((res) => {
//         setBook(res.data)
//         setRatings(res.data.rating)
//         console.log(ratings)
//       })
//       .catch((err) => console.log(err))
//     axios.get('http://localhost:3000/loggedInUser', { withCredentials: true })
//       .then((res) => {
//         if (res.data) {
//           setUser(res.data.user)
//           console.log(user)
//         } else {
//           setUser(null)
//         }
//         console.log(user)
//       }).catch((err) => {
//         console.log(err.message)
//         setUser(null)
//         console.log(user)
//       });


//     axios.get(`http://localhost:3000/api/books/reviews/${id}`)
//       .then((res) => {
//         setReviews(res.data || [])
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//     axios.get(`http://localhost:3000/api/books/rating/${id}`)
//       .then((res) => {
//         const avg = res.data.averageRating;
//         setAverage(avg ? avg : "No ratings yet");
//       })
//     axios.get(`http://localhost:3000/books/saved/${id}`, { withCredentials: true })
//       .then((res) => {
//         setIsSaved(res.data)
//       })
//       .catch((err) => {
//         console.log({ error: err.message })
//       })


//   }, [id])


//   const handleDelete = (reviewId) => {
//     console.log("Deleting review with id:", reviewId);
//     axios.delete(`http://localhost:3000/api/books/reviews/${reviewId}`)
//       .then(() => {
//         console.log('review deleted')
//         setReviews(reviews.filter(review => review._id !== reviewId));
//         toast('review deleted')
//       }).catch((err) => console.log(err))
//   }



//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!review || !rating) {
//       toast('please fill in all fields')
//       return;
//     }

//     axios.post(`http://localhost:3000/api/books/reviews/${id}`, { review, rating, book: id }, { withCredentials: true })
//       .then(res => {
//         setReview(res.data.newReview)
//         console.log(res.data)
//         toast('review added!')
//       })
//       .catch(err => {
//         if (err.status == 401) {
//           toast('login to submit review')
//         }
//       })


//     axios.patch(`http://localhost:3000/api/books/rating/${id}`, { rating })
//       .then(res => {
//         console.log(res.data)
//       })
//       .catch(err => console.log(err))

//     axios.get(`http://localhost:3000/api/books/rating/${id}`)
//       .then((res) => {
//         const avg = res.data.averageRating;
//         setAverage(avg ? avg : "No ratings yet");
//       })

//   }
//   const handleSave = (e) => {
//     e.preventDefault()
//     axios.patch(`http://localhost:3000/books/save/${id}`, {}, { withCredentials: true })
//       .then((res) => {
//         setIsSaved(!isSaved)
//         console.log(res.data.savedBooks)
//         if (isSaved) {
//           toast('removed from favorites')


//         } else {
//           toast('added to favorites')

//         }
//       })
//       .catch((err) => {
//         console.log({ error: err.message })
//       })
//   }

//   return (
//     <>
//       <NavBar />
//       <div className='book-details-container flex-column-small'>
//         <div className='image-bar staticPosition'>
//           <img src={book.imageURL} alt="" />
//           {user ? <button onClick={handleSave} className={`${isSaved ? 'blueBackground' : 'pinkBackground'}`}>{isSaved ? "Remove From Favorites" : "Add to favorties"}</button>
//             : ""}
//         </div>


//         <div className='book-details-details book-details-small'>
//           <h1>{book.title}</h1>
//           <h3>{book.author}</h3>
//           <hr />



//           <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", gap: "1rem" }}>
//             <p><FaStar style={{ color: "#003049" }} /> {average}</p>
//             <p style={{ margin: "0", color: "#a7a7a7", fontStyle: "italic" }}>{book.reviewCount} Ratings</p>
//             <hr style={{ height: "40px", borderLeft: "1px solid #ccc" }} />
//             <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", alignItems: "flex-start", width: "60%", gap: "0.5rem" }}>
//               <p style={{ margin: "0", color: "#a7a7a7", fontStyle: "italic" }}>Year Published: {book.publishYear}</p>
//               <p style={{ margin: "0", color: "#a7a7a7", fontStyle: "italic" }}>Genre: {book.genre}</p>
//                             <p style={{ margin: "0", color: "#a7a7a7", fontStyle: "italic" }}> {book.pageCount} pages</p>

//             </div>
//           </div>



//           <hr />
//           <h2>Description</h2>
//           <p>
//             {book.description}
//           </p>
//           <hr />



//           <h2>Reviews and Ratings</h2>




//           {user && (
//             <>
//               {showReviewForm && (
//                 <form onSubmit={handleSubmit}>
//                   <textarea onChange={(e) => setReview(e.target.value)} name="" id="" placeholder='Write your review here...'></textarea>
//                   <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: "1rem 0" }}>
//                     <label htmlFor="">Rating: <input onChange={(e) => setRating(e.target.value)} type="Number" min='1' max='5' /> </label>
//                     <button type='submit'>Submit</button>
//                   </div>

//                 </form>
//               )}

//               <button onClick={() => setShowReviewForm(!showReviewForm)}>
//                 {showReviewForm ? "Cancel" : "Write a review"}
//               </button>
//             </>
//           )}






//           {book.reviewCount == 0 &&
//             <div style={{ margin: "2rem 0", color: "#a7a7a7", fontStyle: "italic" }}>No Reviews Yet</div>
//           }

//           {reviews && reviews.length > 0 ? reviews.map((review) => {
//             const newDate = new Date(review.date).toISOString().split('T')

//             return <div key={review._id} style={{ display: "flex", flexDirection: "column", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)", borderRadius: "1rem", padding: "1rem 3rem", height: "fit-content", margin: "1rem 0" }}>
//               <div style={{ display: "flex", fontSize: "0.8rem", color: "#a7a7a7", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", margin: "0" }}>
//                 <p style={{ margin: "0 0 1rem 0" }}>{review.username}</p>
//                 <p style={{ margin: "0 0 1rem 0" }}><FaStar /> {review.rating}</p>
//                 <p style={{ margin: "0 0 1rem 0" }}>{newDate[0]}</p>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <p style={{ margin: "0", padding: "0" }}>{review.review}</p>
//                 {user && user._id == review.user ? <><MdDelete onClick={() => handleDelete(review._id)} /> </> : ""}
//               </div>
//             </div>
//           }) : ('')}


//         </div>
//       </div>
//       <Footer />

//     </>
//   )
// }

// export default BookDetails
