import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
