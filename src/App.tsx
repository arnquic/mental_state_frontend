import './App.css';
import Navbar from './components/tsxFiles/Navbar';
import HomePage from './pages/tsxFiles/HomePage';
import LoginPage from './pages/tsxFiles/LoginPage';
import SignupPage from './pages/tsxFiles/SignupPage';
import NewEntryPage from './pages/tsxFiles/NewEntryPage';
import AnalysisPage from './pages/tsxFiles/AnalysisPage';
import UserDashboardPage from './pages/tsxFiles/UserDashboardPage';

import { Route, Routes, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';

import React from 'react';

function App() {

  const { user } = useContext(AppContext);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/login"
          element={
            user ?
              <Navigate to="/" />
              :
              <LoginPage />
          }
        />

        <Route path="/signup"
          element={
            user ?
              <Navigate to="/" />
              :
              <SignupPage />
          }
        />

        <Route path="/newEntry"
          element={
            user ?
              <NewEntryPage />
              :
              <Navigate to="/login" />
          }
        />

        <Route path="/analysis"
          element={
            user ?
              <AnalysisPage />
              :
              <Navigate to="/login" />
          }
        />

        <Route path="/dashboard"
          element={
            user ?
              <UserDashboardPage />
              :
              <Navigate to="/login" />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
