import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
