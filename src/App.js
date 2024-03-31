import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login'
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import DashBoard2 from './pages/DashBoard2'
import Home from './pages/Home';
import Service from './pages/service';

import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';

import Users from './pages/Admin/UsersList';
import Doctors from './pages/Admin/DoctorsList'
import Profiles from './pages/Doctor/Profile'

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';




function App() { //book appointment screen bhi kar sakthe & also the map ideation(shabin)
  const { loading } = useSelector(state => state.alerts);
  return (

    <BrowserRouter>
      {loading && (
        <div className='spinner-parent'>
          <div className="spinner-border" role="status">
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/green" element={<DashBoard2/>}/>

        <Route path='/' element={<DashBoard />}/> 
        <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>}/>
        <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>} />

        <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path='/service' element={<Service/>}/> 
       
        <Route path='/apply-doctor' element={<ProtectedRoute> <ApplyDoctor /> </ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute> <Notifications /> </ProtectedRoute>} />
        <Route path='/doctor/profile/:userId' element={<ProtectedRoute> <Profiles /> </ProtectedRoute>} />
        <Route path='/admin/users-list' element={<ProtectedRoute> <Users /> </ProtectedRoute>} />
        <Route path='/admin/doctors-list' element={<ProtectedRoute> <Doctors /> </ProtectedRoute>} />


        

      </Routes>
    </BrowserRouter>

  );
}

export default App;