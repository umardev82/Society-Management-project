import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login'
import Main from '../components/Dashboard/main';
import AddProperty from '../components/Dashboard/property/addProperty';
import PrivateRoute from './privateRoutes';

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/dashboard" element={
        <PrivateRoute>
        <Main/>
        </PrivateRoute>
        }/>
        <Route path="/add-property" element={<AddProperty/>}/>
    
    </Routes>
  </Router>
  )
}

export default AppRoutes