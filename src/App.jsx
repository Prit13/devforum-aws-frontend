import React from 'react'
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';

import { UserContextProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/myposts/:id" element={<MyPosts />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
      </ThemeProvider>  
    </UserContextProvider>
  )
}

export default App