import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'
import OrderPage from './pages/ServicePage';
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import ManagerPage from './pages/ManagerPage'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/booking" element={<BookingPage/>}/>
        <Route path="/menuservice" element={<OrderPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/managerPage" element={<ManagerPage/>}/>
        <Route path="/adminPage" element={<AdminPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;