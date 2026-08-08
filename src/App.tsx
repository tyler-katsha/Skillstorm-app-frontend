
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { ResetEmail } from './pages/ResetEmail'
import { ErrorBoundary } from './components/ErrorBoundary'
import { UserProvider } from './contexts/UserContext'
import { Leaderboard } from './pages/Leaderboard'
import { Quiz } from './pages/Quiz'

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
      {/* For better UX wrap every route in a ErrorBoundary component with a more specific message */}
      <ErrorBoundary title="Application error" message="Something unexpected went wrong. Please reload the app.">
        <Routes>
          {/* This your guide for your other pages*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/reset-email" element={<ResetEmail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
