import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Quiz from './components/Quiz/Quiz.jsx'
import Profile from './components/Profile/Profile.jsx'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import QuizOptions from './components/QuizOptions/QuizOptions.jsx'
import AuthProvider from './context/AuthContext.jsx'
import Layout from './components/Layout/Layout.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'

const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home',
        element: <LandingPage />
      },
      {
        path: '/quiz',
        element: <Quiz />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/quiz-options',
        element: <QuizOptions />
      },
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)