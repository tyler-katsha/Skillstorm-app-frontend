
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
import { BadgePage } from './pages/Badges'
import { QuizPage } from './pages/Quizzes'
import { useEffect, useState } from 'react'

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
      ],
    }
  ])
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
