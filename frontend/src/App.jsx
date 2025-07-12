import './Styles/App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import BookDetails from './pages/BookDetails'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/explore' element={<Explore />}></Route>
        <Route path='/details/:isbn' element={<BookDetails />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
