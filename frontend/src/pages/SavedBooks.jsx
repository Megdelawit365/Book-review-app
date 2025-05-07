import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavBar from '../../Components/NavBar'
import BookCard from '../../Components/BookCard';
import Footer from '../../Components/Footer';

const SavedBooks = () => {
    const { id } = useParams()
    const [savedBooks, setSavedBooks] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3000/books/saved-books/${id}`, { withCredentials: true })
            .then((res) => setSavedBooks(res.data))
            .catch((err) => console.log(err))

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
        <>
            <NavBar />
            <main>
                <h1>{user ? user.username : ""}'s Saved Books</h1>
                <div className='book-card-container'>
                    {savedBooks && savedBooks.length > 0 ? (
                        <>
                            {savedBooks.map((book, index) => (
                                <Link key={index} to={`/books/${book._id}`}>
                                    <BookCard id={book._id} />
                                </Link>
                            ))}
                        </>
                    ) : (
                        <p>No saved books</p>
                    )}

                </div>
            </main>
            <Footer/>
        </>
    )
}

export default SavedBooks
