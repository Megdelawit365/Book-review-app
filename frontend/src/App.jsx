import './Styles/App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import BookDetails from './pages/BookDetails'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddReview from './pages/AddReview'

function App() {

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick={false}

      />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/explore' element={<Explore />}></Route>
        <Route path='/details/:isbn' element={<BookDetails />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/add-review' element={<AddReview />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
