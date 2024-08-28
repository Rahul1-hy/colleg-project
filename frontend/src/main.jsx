import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NewStory from "./components/NewStory"
import Home from './components/Home.jsx'
import Login from "./components/Login.jsx"
import "./index.css"
import Register from './components/Register.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import StoryDetail from './components/StoryDetail.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import AllStories from './components/AllStories.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/about",
        element: <About />
      },
      {
        path:"/contact",
        element: <Contact />
      },
      {
        path: "/newstory",
        element: < NewStory/>
      },
      {
        path: "/profile",
        element:  <ProfilePage/>
      },
      {
        path: "/allstory",
        element:  <AllStories/>
      },
      {
        path: "/PrivacyPolicy",
        element:  <PrivacyPolicy/>
      },
      {
        path:"/story/:id",
        element: <StoryDetail />
      }
    ]
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/Register",
    element: <Register />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
)