import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from './components/_layout/MainLayout';
import { CreateQuiz } from './components/createComp/CreateQuiz';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { QuizProvider } from './contexts/QuizContext';
import { UserProvider } from './contexts/UserContext';
import { BadgePage } from './pages/BadgePage';
import { ErrorPage } from './pages/ErrorPage';
import { Home } from './pages/Home';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { Login } from './pages/Login';
import { OAuth2Redirect } from './pages/OAuthRedirectPage';
import { ProfilePage } from './pages/Profile';
import { QuizPage } from './pages/Quizzes';
import { Register } from './pages/Register';
import { ResetEmail } from './pages/ResetEmail';
import { ResetPassword } from './pages/ResetPassword';
import { DefaultSkeleton } from './skeletons/pages/DefaultSkeleton';
import { ToastProvider } from './contexts/ToastContext';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <DefaultSkeleton />;
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
              <LeaderboardPage isBackground={false}/>
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
      ],
    }
  ])
  return (
    <UserProvider>
      <QuizProvider>
        <ToastProvider >
          <RouterProvider router={router} />
        </ToastProvider>
      </QuizProvider>
    </UserProvider>
  )
}

export default App