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
    <div className="font-roboto flex flex-col items-center justify-center min-h-screen bg-gray-100 mx-auto p-20">
      <div className="max-w-[80%] lg:max-w-4xl w-full bg-white rounded-lg shadow-lg p-10 flex flex-col lg:flex-row items-center">
        <div className="flex-shrink-0 w-full lg:w-1/2 mr-4 mb-8 lg:mb-0 p-2 bg-gray-400 rounded-lg ">
          <img
            src={heroImage}
            alt="Hero Image"
            className="w-full h-auto object-cover mx-auto"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Indentifikasi Hama
            </h1>
            <div className="mb-8 flex items-center justify-center">
              <label
                htmlFor="fileInput"
                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white-255 font-bold py-4 px-4 lg:px-32 rounded cursor-pointer w-full lg:w-auto">
                <FaUpload className="mr-2" /> Upload Gambar
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <motion.button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 text-white-255 font-bold py-4 px-4 lg:px-32 rounded flex items-center justify-center mx-auto w-full lg:w-auto"
              disabled={isLoading}>
              {isLoading ? "Loading..." : "Identification"}
            </motion.button>
          </form>
          <motion.div
            className="mt-2 w-full relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: imgFilename ? 1 : 0,
              scale: imgFilename ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}>
            {imgFilename && (
              <div className="relative">
                <img
                  src={`http://localhost:5000/static/${imgFilename}`}
                  alt="Uploaded"
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{
                    transform: identificationResult ? "scale(0.8)" : "scale(1)",
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-green-600 bg-opacity-75 text-white-255 px-2 py-2 rounded-b-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: identificationResult ? 1 : 0,
                    y: identificationResult ? 0 : 50,
                  }}
                  transition={{ duration: 0.5 }}>
                  {identificationResult && (
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">
                        {identificationResult}
                      </p>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={handleClearResult}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HamaScanApi;
