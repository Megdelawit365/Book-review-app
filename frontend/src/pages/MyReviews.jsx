// import React, { useEffect, useState } from 'react'
// import NavBar from '../../Components/NavBar'
// import { Link, useParams } from 'react-router-dom'
// import axios from 'axios'
// import Footer from '../../Components/Footer'

// const MyReviews = () => {
//     const { id } = useParams()
//     const [reviews, setReviews] = useState([])
//     const [user, setUser] = useState(null)
//     const [books, setBooks] = useState({})
//     const [bookTitles, setBookTitles] = useState([])

//     useEffect(() => {
//         axios.get(`http://localhost:3000/api/user/reviews/${id}`)
//             .then((res) => {
//                 const fetchedReviews = res.data || []
//                 setReviews(fetchedReviews)

//                 fetchedReviews.forEach(review => {
//                     axios.get(`http://localhost:3000/api/books/${review.book}`)
//                         .then(res => {
//                             setBooks(res.data)

//                         })
//                         .catch(err => console.log(err))
//                 })
//                 console.log(books)
//             })
//             .catch(err => console.log(err))

//         axios.get('http://localhost:3000/loggedInUser', { withCredentials: true })
//             .then((res) => {
//                 setUser(res.data.user)
//             })
//             .catch((err) => {
//                 console.log(err.message)
//                 setUser(null)
//             })

//         axios.get('http://localhost:3000/api/books')
//             .then((res) => setBookTitles(res.data))
//             .catch((err) => console.log(err.message));
//     }, [id])

//     return (
//         <>
//             <NavBar />
//             <main>
//                 <h1>{user ? user.username : ""}'s Reviews</h1>


//                 <div className='grid'>

//                     <h4>Books</h4>
//                     <h4>Reviews</h4>
//                     <h4>Date</h4>

//                     {reviews && reviews.length > 0 ? reviews.map((review, index) => {
//                         // const bookTitle = books[review.book].title
//                         const reviewDate = new Date(review.date).toISOString().split('T')[0]


//                         return (
//                             <>
//                                 {/* <Link to={`books/${review._book}`}>{bookTitle}</Link> */}
//                                 <Link className='hover-blue' to={`/books/${review.book}`}>see book</Link>
//                                 <div className='hover-blue' >{review.review}</div>
//                                 <div className='hover-blue' >{reviewDate}</div>
//                             </>
//                         )
//                     }) : (
//                         <>
//                             <div>No Reviews yet</div>
//                             <div>No Reviews yet</div>
//                             <div>No Reviews yet</div>
//                         </>
//                     )}
//                 </div>
//             </main>
//             <Footer/>
//         </>
//     )
// }

// export default MyReviews
