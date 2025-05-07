import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import NavBar from '../../Components/NavBar'
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../Components/Footer';


const AddBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [pageCount, setPageCount] = useState('')
  

  const [book, setBook] = useState({})


const Navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()

      if (!title || !author || !date || !description||!genre||!imageURL||!pageCount) {
          toast('Please fill in all fields')
          return
      }



      const Book = { title, author, genre, description, date, imageURL, pageCount }
      axios.post('http://localhost:3000/api/books', Book)
          .then((res) => {
            console.log(res.data)
            const newBook = res.data.book_added
            toast("Book added successfully")
            Navigate(`/books/${newBook._id}`);


          })
          .catch((err) => console.log(err))
  }



  return (
    <>
    <NavBar/>
    <main>
    <div className='signup-page'>
      <div className='signup-box addbook-box'>
        <h2 style={{textAlign:"center", color:"blue"}}>Add Book</h2>
        <form  onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>

          <div>
            <input onChange={(e) => setTitle(e.target.value)} type="text" name="" id="" placeholder='title'/>
          </div>
            <label htmlFor="">Author</label>

          <div>
            <input onChange={(e) => setAuthor(e.target.value)} type="text" name="" id="" placeholder='author'/>
          </div>
            <label htmlFor="">Genre</label>

          <div>
            <input onChange={(e) => setGenre(e.target.value)} type="text" name="" id=""placeholder='Genre' />
          </div>
          <label htmlFor="">Description</label>

          <div>
            <textarea onChange={(e) => setDescription(e.target.value)} name="" id="" placeholder='description'></textarea>
          </div>
          <label htmlFor="">Publish Year</label>
          <div>
            <input onChange={(e) => setDate(e.target.value)} type="Number" name="" id=""placeholder='publish date' />
          </div>
          <label htmlFor="">Number of Pages</label>
          <div>
            <input onChange={(e) => setPageCount(e.target.value)} type="Number" name="" id=""placeholder='number of pages' />
          </div>
          <label htmlFor="">Book Cover URL</label>

          <div>
            <input onChange={(e) => setImageURL(e.target.value)} type="URL" name="" id=""placeholder='URL' />
          </div>

          <button type='submit'>Add Book</button>
        </form>
      </div>
    </div>
    </main>
    <Footer/>
    </>
    
  )
}

export default AddBook
