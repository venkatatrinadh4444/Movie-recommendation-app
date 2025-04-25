import React from 'react';
import './App.css'
import Login from './components/login/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/home/Home'
import { ToastContainer } from 'react-toastify';
import AddMovie from './pages/addMovie/AddMovies';
import Profile from './pages/profile/Profile';
import PrivateRoute from './components/privateRoute/PrivateRoute'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<PrivateRoute>
        <Home/>
      </PrivateRoute>}/>
      <Route path="/add-movie" element={<AddMovie/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    <ToastContainer theme='dark'/>
    </BrowserRouter>
  )
}

export default App