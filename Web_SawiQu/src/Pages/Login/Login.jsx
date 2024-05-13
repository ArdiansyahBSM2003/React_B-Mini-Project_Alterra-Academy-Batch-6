/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import heroImage from "../../Components/assets/hero-login.png";
import logo from "../../Components/assets/logo.png";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Mengatur deteksi layar besar
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Memuat email yang diingat jika diingatkan sebelumnya
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleChangeRememberMe = (e) => {
    // Mengubah status mengingat saya
    setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    // Menampilkan/menyembunyikan kata sandi
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    // Memvalidasi formulir login
    let isValid = true;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setEmailError("Email must be valid.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    // Menangani penyerahan formulir login
    e.preventDefault();

    if (!validateForm()) return;

    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user || (email === "ardhi@gmail.com" && password === "12345678")) {
      // Login berhasil
      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setIsAuthenticated(true);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("isUserAuthenticated", "true");
      localStorage.setItem("userToken", user ? user.token || "" : "");

      navigate("/landingpage");
    } else {
      // Login gagal
      toast({
        title: "Login failed",
        description: "Incorrect email or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-roboto">
      {isLargeScreen && (
        <div className="w-full lg:w-1/2 h-full relative">
          <img
            src={heroImage}
            alt="Forgot Password Image"
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
              Product Fresh and Cool
            </p>
          </div>
        </div>
      )}

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          Login
        </h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email..."
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  emailError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                } rounded-md`}
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-500">{emailError}</p>
              )}
            </div>

            <div className="mb-6 relative">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  placeholder="Enter your password..."
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-md`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 top-1/2 transform -translate-y-1/2">
                  <div
                    className={`cursor-pointer ${
                      passwordError ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={togglePasswordVisibility}>
                    {showPassword ? (
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

            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-800 focus:ring-green-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={handleChangeRememberMe}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <RouterLink
                to="/forgot-password"
                className="text-sm text-green-800 hover:text-green-800">
                Forgot the password?
              </RouterLink>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-6 bg-green-800 text-white-255 font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-800">
            Don't have an account?
            <RouterLink
              to="/register"
              className="text-green-800 hover:underline">
              Register here
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
