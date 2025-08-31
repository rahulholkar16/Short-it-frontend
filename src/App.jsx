import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
