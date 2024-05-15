/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import heroImage from "../../Components/assets/hero-login.png";
import logo from "../../Components/assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LupaPassword() {
  // State untuk menyimpan data email, password baru, dan konfirmasi password baru
  const [email, setEmail] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  // State untuk menyimpan pesan kesalahan validasi
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // State untuk mendeteksi layar besar
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // State untuk menampilkan/menyembunyikan password baru dan konfirmasi password baru
  const [tampilkanPasswordBaru, setTampilkanPasswordBaru] = useState(false);
  const [tampilkanKonfirmasiPassword, setTampilkanKonfirmasiPassword] =
    useState(false); // hook dari React Route

  const navigate = useNavigate(); // hook dari React Route
  const toast = useToast(); // hook dari Chakra UI

  useEffect(() => {
    // hook dari React Route
    // Mendeteksi layar besar
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fungsi untuk validasi formulir
  const validateForm = () => {
    let isValid = true;

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setEmailError("Email harus valid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (passwordBaru !== konfirmasiPassword) {
      setPasswordError("Password baru dan konfirmasi password tidak cocok");
      isValid = false;
    } else if (passwordBaru.length < 8) {
      setPasswordError("Password baru harus minimal 8 karakter");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Fungsi untuk mereset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      users[userIndex].password = passwordBaru;
      localStorage.setItem("users", JSON.stringify(users));

      toast({
        title: "Berhasil",
        description: "Password berhasil diubah. Silakan login kembali.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      navigate("/login");
    } else {
      toast({
        title: "Terjadi kesalahan",
        description: "Pengguna dengan email tersebut tidak ditemukan.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Fungsi untuk menampilkan/menyembunyikan password baru
  const toggleNewPasswordVisibility = () => {
    setTampilkanPasswordBaru(!tampilkanPasswordBaru);
  };

  // Fungsi untuk menampilkan/menyembunyikan konfirmasi password baru
  const toggleConfirmPasswordVisibility = () => {
    setTampilkanKonfirmasiPassword(!tampilkanKonfirmasiPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-serif">
      {/* Tampilan gambar hanya pada layar besar */}
      {isLargeScreen && (
        <div className="w-full lg:w-1/2 h-full relative">
          <img
            src={heroImage}
            alt="Lupa Password Gambar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <img
              src={logo}
              alt="Logo"
              className="w-36 h-32 mb-0 sm:w-48 sm:h-40"
            />
            <h1 className="text-4xl font-bold text-white-255">SawiQu</h1>
            <p className="text-white-255 font-mono text-sm mb-4">
              Produk Segar dan Keren
            </p>
          </div>
        </div>
      )}

      {/* Formulir untuk mereset password */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Lupa Password</h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleResetPassword}>
            {/* Input untuk email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  emailError
                    ? "border-red-800 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-green-800 focus:border-green-800"
                } rounded-md`}
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-500">{emailError}</p>
              )}
            </div>

            {/* Input untuk password baru */}
            <div className="mb-6 relative">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-700">
                Password Baru
              </label>
              <div className="relative">
                <input
                  type={tampilkanPasswordBaru ? "text" : "password"}
                  id="newPassword"
                  placeholder="Masukkan password baru"
                  value={passwordBaru}
                  onChange={(e) => setPasswordBaru(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-800 focus:border-green-800"
                  } rounded-md`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 top-1/2 transform -translate-y-1/2">
                  <div
                    className={`cursor-pointer ${
                      passwordError ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={toggleNewPasswordVisibility}>
                    {tampilkanPasswordBaru ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </div>
                </div>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            {/* Input untuk konfirmasi password baru */}
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-700">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <input
                  type={tampilkanKonfirmasiPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Konfirmasi password baru"
                  value={konfirmasiPassword}
                  onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-800 focus:border-green-800"
                  } rounded-md`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 top-1/2 transform -translate-y-1/2">
                  <div
                    className={`cursor-pointer ${
                      passwordError ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={toggleConfirmPasswordVisibility}>
                    {tampilkanKonfirmasiPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </div>
                </div>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            {/* Tombol untuk mengirim permintaan reset password */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 bg-green-800 text-white-255 font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Kirim Permintaan
              </button>
            </div>
          </form>

          {/* Tautan kembali ke halaman login */}
          <div className="mt-4 text-center">
            <RouterLink to="/login" className="text-green-600 hover:underline">
              Kembali ke halaman login
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LupaPassword;
