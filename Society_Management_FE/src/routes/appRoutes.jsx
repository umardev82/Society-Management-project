import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login'
import Main from '../components/Dashboard/main';
import AddProperty from '../components/Dashboard/property/addProperty';
import FormBuilder from '../components/Dashboard/formBuilder/addForm';
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
        <Route path="/form-builder" element={<FormBuilder />} />
    
    </Routes>
  </Router>
  )
}

export default AppRoutes