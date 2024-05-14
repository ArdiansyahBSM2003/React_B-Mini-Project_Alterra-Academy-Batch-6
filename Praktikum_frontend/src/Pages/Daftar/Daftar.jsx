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

const Daftar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLayarBesar, setIsLayarBesar] = useState(false);
  const [tampilkanSandi, setTampilkanSandi] = useState(false);
  const [tampilkanKonfirmasiSandi, setTampilkanKonfirmasiSandi] =
    useState(false);

  useEffect(() => {
    // Mendeteksi layar besar
    const handleResize = () => {
      setIsLayarBesar(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Nilai awal dan skema validasi untuk formulir
  const nilaiAwal = {
    namaDepan: "",
    namaBelakang: "",
    username: "",
    email: "",
    sandi: "",
    konfirmasiSandi: "",
  };

  const skemaValidasi = Yup.object().shape({
    namaDepan: Yup.string()
      .min(3, "Nama depan minimal terdiri dari 3 karakter")
      .required("Nama depan diperlukan"),
    namaBelakang: Yup.string()
      .min(3, "Nama belakang minimal terdiri dari 3 karakter")
      .required("Nama belakang diperlukan"),
    username: Yup.string().required("Username diperlukan"),
    email: Yup.string()
      .email("Alamat email tidak valid")
      .required("Email diperlukan"),
    sandi: Yup.string()
      .min(8, "Sandi minimal terdiri dari 8 karakter")
      .required("Sandi diperlukan"),
    konfirmasiSandi: Yup.string()
      .oneOf([Yup.ref("sandi"), null], "Sandi harus sama")
      .required("Konfirmasi sandi diperlukan"),
  });

  // Penanganan submit formulir
  const handleSubmit = (nilai, { setSubmitting }) => {
    const { namaDepan, namaBelakang, username, email, sandi } = nilai;

    let pengguna = JSON.parse(localStorage.getItem("pengguna")) || [];
    pengguna.push({ namaDepan, namaBelakang, username, email, sandi });
    localStorage.setItem("pengguna", JSON.stringify(pengguna));

    toast({
      title: "Pendaftaran berhasil! Silakan masuk.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    setSubmitting(false);
    navigate("/masuk");
  };

  // Fungsi untuk menampilkan/menyembunyikan kata sandi
  const togglePasswordVisibility = () => {
    setTampilkanSandi(!tampilkanSandi);
  };

  const toggleConfirmPasswordVisibility = () => {
    setTampilkanKonfirmasiSandi(!tampilkanKonfirmasiSandi);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-serif">
      {/* Tampilan gambar hanya pada layar besar */}
      {isLayarBesar && (
        <div className="w-full lg:w-1/2 h-full relative">
          <img
            src={heroImage}
            alt="Gambar Lupa Sandi"
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

      {/* Formulir pendaftaran */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full max-w-lg bg-white-255 rounded-lg shadow-md p-6  sm:mt-0">
          <h1 className="text-3xl font-bold mb-4 mt-8 text-gray-800 text-center">
            Daftar
          </h1>
          <Formik
            initialValues={nilaiAwal}
            validationSchema={skemaValidasi}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                {/* Input untuk nama depan dan belakang */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <FormControl>
                      <FormLabel>Nama Depan</FormLabel>
                      <Field type="text" name="namaDepan" as={Input} />
                      <ErrorMessage
                        name="namaDepan"
                        component="div"
                        className="text-red-500"
                      />
                    </FormControl>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <FormControl>
                      <FormLabel>Nama Belakang</FormLabel>
                      <Field type="text" name="namaBelakang" as={Input} />
                      <ErrorMessage
                        name="namaBelakang"
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
                    htmlFor="sandi"
                    className="block mb-2 text-sm font-medium text-gray-700">
                    Sandi Anda
                  </label>
                  <div className="relative">
                    <Field
                      type={tampilkanSandi ? "text" : "password"}
                      id="sandi"
                      name="sandi"
                      as={Input}
                      className={`w-full px-3 py-2 border ${
                        tampilkanSandi
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-green-800 focus:border-green-800"
                      } rounded-md`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-5 top-1/2 transform -translate-y-1/2">
                      <div
                        className={`cursor-pointer ${
                          tampilkanSandi ? "text-red-500" : "text-gray-400"
                        }`}
                        onClick={togglePasswordVisibility}>
                        {tampilkanSandi ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                  <ErrorMessage
                    name="sandi"
                    component="div"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Input untuk konfirmasi kata sandi */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="konfirmasiSandi"
                    className="block mb-2 text-sm font-medium text-gray-700">
                    Konfirmasi Sandi Anda
                  </label>
                  <div className="relative">
                    <Field
                      type={tampilkanKonfirmasiSandi ? "text" : "password"}
                      id="konfirmasiSandi"
                      name="konfirmasiSandi"
                      as={Input}
                      className={`w-full px-3 py-2 border ${
                        tampilkanKonfirmasiSandi
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-green-800 focus:border-green-800"
                      } rounded-md`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-5 top-1/2 transform -translate-y-1/2">
                      <div
                        className={`cursor-pointer ${
                          tampilkanKonfirmasiSandi
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                        onClick={toggleConfirmPasswordVisibility}>
                        {tampilkanKonfirmasiSandi ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                  <ErrorMessage
                    name="konfirmasiSandi"
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
                    Daftar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Tautan untuk login jika sudah memiliki akun */}
          <Text className="mt-2 text-center text-gray-600">
            Sudah memiliki akun?
            <RouterLink to="/masuk" className="text-green-600 hover:underline">
              Masuk di sini
            </RouterLink>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
