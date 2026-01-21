import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Quiz from './components/Quiz/Quiz'
import Profile from './components/Profile/Profile'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import QuizOptions from './components/QuizOptions/QuizOptions'
import AuthProvider from './context/AuthContext'
import Layout from './components/Layout/Layout'
import LandingPage from './components/LandingPage/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'


const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      
      // Wrap protected routes to prevent unauthenticated access
      {
        element: <ProtectedRoute />, 
        children: [
          { path: '/home', element: <LandingPage /> },
          { path: '/quiz', element: <Quiz /> },
          { path: '/profile', element: <Profile /> },
          { path: '/quiz-options', element: <QuizOptions /> },
        ]
      },
    ]
  },
])

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)