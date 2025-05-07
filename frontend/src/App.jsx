import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ExploreBooks from './pages/ExploreBooks'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import BookDetails from './pages/BookDetails'
import SavedBooks from './pages/SavedBooks'
import MyReviews from './pages/MyReviews'
import AddBook from './pages/AddBook'
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/explore-books' element={<ExploreBooks/>}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/books/:id' element={<BookDetails />}></Route>
        <Route path='/user/saved-books/:id' element={<SavedBooks />}></Route>
        <Route path='/add-book' element={<AddBook />}></Route>

        <Route path='/user/reviews/:id' element={<MyReviews />}></Route>


      </Routes>
      <ToastContainer />

    </BrowserRouter>
  )
}

export default App
