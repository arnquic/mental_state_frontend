import './App.css';
import Navbar from './components/tsxFiles/Navbar';
import HomePage from './pages/tsxFiles/HomePage';
import LoginPage from './pages/tsxFiles/LoginPage';
import SignupPage from './pages/tsxFiles/SignupPage';
import NewEntryPage from './pages/tsxFiles/NewEntryPage';
import AnalysisPage from './pages/tsxFiles/AnalysisPage';
import UserDashboardAccountPage from './pages/tsxFiles/UserDashboardAccountPage';
import UserDashboardLogsPage from './pages/tsxFiles/UserDashboardLogsPage';

import React from 'react';
import env from 'react-dotenv';
import axios, { AxiosResponse } from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AppContext, ILog } from './context/AppContext';
import { useContext, useEffect } from 'react';


function App() {

  const testLog: ILog = {
    id: 1,
    content: "Test Log info.",
    analysis: 13.3,
    dateTime: "Mon, 10 Jan 2022 17:49:50 GMT"
  }

  // -----------------------------
  // ** TODO: Remove setNewLog **
  // -----------------------------
  const { user, setUser, setAnalysisLog } = useContext(AppContext);

  async function verifyUser(): Promise<void> {
    setAnalysisLog(testLog);
    const summitAuth: string | null = localStorage.getItem('summitAuth');
    if (summitAuth) {
      const response: AxiosResponse = await axios.get(`${env.BACKEND_URL}/user/verify`, { headers: { authorization: summitAuth } });
      localStorage.setItem("summitAuth", response.data.summit_auth);
      setUser(response.data.user_info);
    }
  }

  useEffect((): void => { verifyUser() }, []);

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

        <Route path="/dashboard/logs"
          element={
            user ?
              <UserDashboardLogsPage />
              :
              <Navigate to="/login" />
          }
        />

        <Route path="/dashboard/account"
          element={
            user ?
              <UserDashboardAccountPage />
              :
              <Navigate to="/login" />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
