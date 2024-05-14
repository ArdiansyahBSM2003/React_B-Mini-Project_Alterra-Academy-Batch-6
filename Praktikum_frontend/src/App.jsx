/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import HalamanUtama from "./Components/HalamanUtama/HalamanUtama";
import TentangKami from "./Components/TentangKami/TentangKami";
import KontakKami from "./Components/KontakKami/KontakKami";
import Login from "./Pages/Login/Login";
import Daftar from "./Pages/Daftar/Daftar";
import Footer from "./Components/Footer/Footer";
import Konsultasi_OpenAi from "./Components/Konsultasi_OpenAi/Konsultasi_OpenAi";
import HamaScanApi from "./Components/HamaScanAPI_Flask/HamaScan";
import LupaPassword from "./Pages/LupaPassword/LupaPassword";

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
            <Route path="/" element={<HalamanUtama />} />
            <Route path="/konsultasi" element={<Konsultasi_OpenAi />} />
            <Route path="/tentang" element={<TentangKami />} />
            <Route path="/kontak" element={<KontakKami />} />
            <Route path="/halamanUtama" element={<HalamanUtama />} />
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
            path="/daftar"
            element={<Daftar users={users} setUsers={setUsers} />}
          />
          <Route path="/lupaPassword" element={<LupaPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
