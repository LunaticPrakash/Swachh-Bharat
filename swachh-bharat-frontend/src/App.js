import './App.css';
import SigninPage from './pages/SigninPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import NormalUserDashboardPage from './pages/normal-user/NormalUserDashboardPage';
import { useState } from 'react';
import HeaderLayout from './components/header/HeaderLayout';
import NormalUserAddLocationPage from './pages/normal-user/NormalUserAddLocationPage';
import NormalUserProfilePage from './pages/normal-user/NormalUserProfilePage';
import DriverUserProfilePage from './pages/driver-user/DriverUserProfilePage';
import DriverUserDashboardPage from './pages/driver-user/DriverUserDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HeaderLayout hideHeaderPaths={["/", "/login", "/register"]} />}>
          <Route path="/login" element={<SigninPage />} />
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/dashboard" element={<NormalUserDashboardPage />} />
          <Route path="/driver-dashboard" element={<DriverUserDashboardPage />} />
          <Route path="/profile" element={<NormalUserProfilePage />} />
          <Route path="/driver-profile" element={<DriverUserProfilePage />} />
          <Route path="/add-pickup-location" element={<NormalUserAddLocationPage />} />
          <Route path="/edit-pickup-location/:id" element={<NormalUserAddLocationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
