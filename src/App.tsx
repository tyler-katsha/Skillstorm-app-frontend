
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { ResetEmail } from './pages/ResetEmail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* This your guide for your other pages*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/reset-email" element={<ResetEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
