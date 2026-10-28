import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { ResetEmail } from './pages/ResetEmail'
import { ErrorBoundary } from './components/ErrorBoundary'
import { UserProvider } from './contexts/UserContext'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { ErrorPage } from './pages/ErrorPage'
import { ResetPassword } from './pages/ResetPassword'
import { ProtectedRoute } from './components/ProtectedRoute'
import { OAuth2Redirect } from './pages/OAuthRedirectPage'
import { MainLayout } from './components/MainLayout'
import { ProfilePage } from './pages/Profile'
import { BadgePage } from './pages/BadgePage'
import { QuizPage } from './pages/Quizzes'
import { Room } from './pages/Room'
import { CreateQuiz } from './components/CreateQuiz' // Adjust this import path based on your folder structure
import { useEffect, useState } from 'react'
import { QuizProvider } from './contexts/QuizContext'
import { ProfileHistoryProvider } from './contexts/UserTrackerContext'

function App() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading your session...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/reset-email',
      element: <ResetEmail />
    },
    {
      path: '/error',
      element: <ErrorPage />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/oauth2/redirect",
      element: <OAuth2Redirect />,
    },
    {
      element: <MainLayout />,
      errorElement:
        <ErrorBoundary
          title="Application Error"
          message="Something unexpected went wrong. Please reload the app."
        />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/leaderboard",
          element: (
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/quizzes",
          element: (
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/create-quiz",
          element: (
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit-quiz/:id",
          element: (
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          ),
        },
        {
          path: "/badges",
          element: (
            <ProtectedRoute>
              <BadgePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/room",
          element: (
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          )
        }
      ],
    }
  ])
  return (
    <UserProvider>
      <QuizProvider>
        <ProfileHistoryProvider>
          <RouterProvider router={router} />
        </ProfileHistoryProvider>
      </QuizProvider>
    </UserProvider>
  )
}

export default App