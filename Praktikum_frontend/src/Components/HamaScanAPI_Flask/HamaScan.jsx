/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import heroImage from "../assets/hero_HamaScan.png";

// Komponen untuk identifikasi hama menggunakan API
function HamaScanApi() {
  const [identificationResult, setIdentificationResult] = useState(null);
  const [imgFilename, setImgFilename] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk mengunggah gambar
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("my_image", file);
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 5000));

        setIdentificationResult(data.identificationResult);
        setImgFilename(data.imgFilename);
        toast.success("Image successfully identified!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while identifying the image.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("No files selected.");
    }
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > 0) {
      setIdentificationResult(null);
      setImgFilename(null);
      handleImageUpload(event);
    } else {
      toast.error("No files selected.");
    }
  };

  // Fungsi untuk membersihkan hasil identifikasi
  const handleClearResult = () => {
    setIdentificationResult(null);
    setImgFilename(null);
  };

  return (
    <div className="font-roboto bg-gray-100  min-h-screen  py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col justify-center items-center mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left text-gray-800 mt-20">
        Identifikasi Hama
      </h1>
      <p className="text-base lg:text-lg text-gray-600 text-center  mt-4 w-1/2 lg:w-3/4 mx-auto lg:mx-0 lg:text-center ">
        Sistem identifikasi hama ini membantu mengenali hama dan penyakit pada
        tanaman secara cepat dan akurat. Unggah gambar tanaman yang Anda curigai
        terkena hama atau penyakit untuk mendapatkan hasil identifikasi.
      </p>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full mt-5 min-h-screen rounded-lg shadow-sm">
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 mx-auto lg:mx-0 bg-gray-300 rounded-full shadow-full md:w-2/3">
          <img
            src={heroImage}
            alt="Hero Image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mt-4 lg:mt-0">
          <div className="mb-2">
            <label
              htmlFor="fileInput"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white-255 font-bold py-2 px-4 rounded cursor-pointer mb-10">
              <FaUpload className="mr-2 text-3xl" />
              <span>Upload Gambar</span>
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white-255 font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleSubmit}
            disabled={isLoading}>
            {isLoading ? "Loading..." : "Identification"}
          </button>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mt-4 lg:mt-0">
          {imgFilename && (
            <div className="relative w-full mx-auto bg-gray-200 rounded-lg shadow-lg md:w-2/3">
              <div className="border-4 border-gray-300 rounded-lg">
                <img
                  src={`http://localhost:5000/static/${imgFilename}`}
                  alt="Uploaded"
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{
                    transform: identificationResult ? "scale(0.8)" : "scale(1)",
                  }}
                />
              </div>
              {identificationResult && (
                <div className="absolute bottom-0 left-0 w-full bg-gray-800 text-white-255 px-2 py-2 rounded-b-lg flex items-center justify-between ">
                  <p className="text-lg font-bold text-white-255 mx-auto">
                    {identificationResult}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={handleClearResult}>
                    <FaTrashAlt />
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="relative w-full mx-auto bg-gray-400 rounded-lg shadow-lg md:w-2/3 mt-4 rounded-b-full">
            <p className="text-center text-black-33 mt-5 mb-3 font-bold">
              Hasil deteksi
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HamaScanApi;
