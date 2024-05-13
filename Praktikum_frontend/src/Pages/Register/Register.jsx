/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import heroImage from "../../Components/assets/hero-login.png";
import logo from "../../Components/assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Mendeteksi layar besar
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Nilai awal dan skema validasi untuk formulir
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  // Penanganan submit formulir
  const handleSubmit = (values, { setSubmitting }) => {
    const { firstName, lastName, username, email, password } = values;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ firstName, lastName, username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    toast({
      title: "Registration successful! Please log in.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    setSubmitting(false);
    navigate("/login");
  };

  // Fungsi untuk menampilkan/menyembunyikan kata sandi
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-serif">
      {/* Tampilan gambar hanya pada layar besar */}
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

      {/* Formulir pendaftaran */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full max-w-lg bg-white-255 rounded-lg shadow-md p-6  sm:mt-0">
          <h1 className="text-3xl font-bold mb-4 mt-8 text-gray-800 text-center">
            Register
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                {/* Input untuk nama depan dan belakang */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Field type="text" name="firstName" as={Input} />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500"
                      />
                    </FormControl>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Field type="text" name="lastName" as={Input} />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500"
                      />
                    </FormControl>
                  </div>
                </div>

                {/* Input untuk username */}
                <FormControl className="mb-2">
                  <FormLabel>Username</FormLabel>
                  <Field type="text" name="username" as={Input} />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </FormControl>

                {/* Input untuk email */}
                <FormControl className="mb-2">
                  <FormLabel>Email</FormLabel>
                  <Field type="email" name="email" as={Input} />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </FormControl>

                {/* Input untuk kata sandi */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700">
                    Your password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      as={Input}
                      className={`w-full px-3 py-2 border ${
                        showPassword
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-green-800 focus:border-green-800"
                      } rounded-md`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-5 top-1/2 transform -translate-y-1/2">
                      <div
                        className={`cursor-pointer ${
                          showPassword ? "text-red-500" : "text-gray-400"
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Input untuk konfirmasi kata sandi */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm Your Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      as={Input}
                      className={`w-full px-3 py-2 border ${
                        showConfirmPassword
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-green-800 focus:border-green-800"
                      } rounded-md`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-5 top-1/2 transform -translate-y-1/2">
                      <div
                        className={`cursor-pointer ${
                          showConfirmPassword ? "text-red-500" : "text-gray-400"
                        }`}
                        onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Tombol untuk mendaftar */}
                <div className="w-full flex justify-end mt-2">
                  <Button
                    type="submit"
                    colorScheme="green"
                    isLoading={isSubmitting}
                    className="rounded-lg">
                    Register
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Tautan untuk login jika sudah memiliki akun */}
          <Text className="mt-2 text-center text-gray-600">
            Already have an account?
            <RouterLink to="/login" className="text-green-600 hover:underline">
              Sign in here
            </RouterLink>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Register;
