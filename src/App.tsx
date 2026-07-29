
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Test } from './pages/Test'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* This your guide for your other pages*/}
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
