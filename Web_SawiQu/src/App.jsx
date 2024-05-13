/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import LandingPage from "./Components/LandingPage/LandingPage";
import About from "./Components/About/AboutUs";
import Contact from "./Components/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Footer from "./Components/Footer/Footer";
import ConsultationOpenAI from "./Components/Consult_OpenAi/Consult_OpenAi";
import HamaScanApi from "./Components/HamaScanAPI_Flask/HamaScan";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

function App() {
  // State untuk menyimpan data pengguna dan status otentikasi
  const [users, setUsers] = useState();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    // Setelah otentikasi berhasil, arahkan ke halaman landing
    if (isUserAuthenticated) {
      redirectToLandingPage();
    }
  }, [isUserAuthenticated]);

  // Fungsi untuk mengarahkan pengguna ke halaman landing
  const redirectToLandingPage = () => {
    setIsUserAuthenticated(true);
  };

  // Fungsi untuk menangani proses login
  const handleLogin = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    // Logika untuk login
  };

  return (
    <Router>
      {isUserAuthenticated ? (
        // Jika pengguna terotentikasi, tampilkan header, halaman-halaman tertentu, dan footer
        <>
          <Header isAuthenticated={isUserAuthenticated} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/consult" element={<ConsultationOpenAI />} />
            <Route path="/aboutUs" element={<About />} />
            <Route path="/contactUs" element={<Contact />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/hamaScan" element={<HamaScanApi />} />
          </Routes>
          <Footer isAuthenticated={isUserAuthenticated} />
        </>
      ) : (
        // Jika belum terotentikasi, tampilkan halaman login, registrasi, dan lupa password
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsUserAuthenticated}
                users={users}
                handleLogin={handleLogin}
              />
            }
          />
          <Route
            path="/register"
            element={<Register users={users} setUsers={setUsers} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
