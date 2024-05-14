/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import gambarHero from "../assets/hero_HamaScan.png";

// Komponen untuk identifikasi hama menggunakan API
function HamaScanApi() {
  const [hasilIdentifikasi, setHasilIdentifikasi] = useState(null);
  const [namaFileGambar, setNamaFileGambar] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(false);

  // Fungsi untuk mengunggah gambar
  const handleUnggahGambar = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSedangMemuat(true);
      const formData = new FormData();
      formData.append("my_image", file);
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 5000));

        setHasilIdentifikasi(data.identificationResult);
        setNamaFileGambar(data.imgFilename);
        toast.success("Gambar berhasil diidentifikasi!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan saat mengidentifikasi gambar.");
      } finally {
        setSedangMemuat(false);
      }
    } else {
      toast.error("Tidak ada file yang dipilih.");
    }
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleKirim = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > 0) {
      setHasilIdentifikasi(null);
      setNamaFileGambar(null);
      handleUnggahGambar(event);
    } else {
      toast.error("Tidak ada file yang dipilih.");
    }
  };

  // Fungsi untuk membersihkan hasil identifikasi
  const handleBersihkanHasil = () => {
    setHasilIdentifikasi(null);
    setNamaFileGambar(null);
  };

  return (
    <div className="font-roboto bg-gray-100 min-h-screen py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-10 flex flex-col justify-center items-center mx-auto">
      <h1 className="text-2xl sm:text-3xl sm:p-8 font-bold text-center lg:text-left text-gray-800 mt-14">
        HamaScan
      </h1>
      <p className=" text-base lg:text-lg text-gray-600 text-center mt-2 mb-2 w-1/2 lg:w-3/4 mx-auto lg:mx-0 lg:text-center md:mt-4 md:mb-2">
        Sistem HamaScan ini membantu mengenali hama pada sawi dan penyakit pada
        tanaman secara cepat dan akurat. Unggah gambar tanaman yang Anda curigai
        terkena hama atau penyakit untuk mendapatkan hasil identifikasi.
      </p>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full min-h-screen rounded-lg shadow-sm">
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0 mx-auto lg:mx-0 bg-gray-300 rounded-full shadow-full md:w-2/3 md:mt-4 md:mb-4 sm:w-2/3">
          <img
            src={gambarHero}
            alt="Gambar Hero"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mt-2 lg:mt-0">
          <div className="mb-2">
            <label
              htmlFor="fileInput"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white-255 font-bold py-2 px-4 rounded cursor-pointer mb-10">
              <FaUpload className="mr-2 text-3xl" />
              <span>Unggah Gambar</span>
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleUnggahGambar}
            />
          </div>

          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white-255 font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleKirim}
            disabled={sedangMemuat}>
            {sedangMemuat ? "Loading..." : "Identifikasi"}
          </button>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mt-4 lg:mt-0">
          {namaFileGambar && (
            <div className="relative w-full mx-auto bg-gray-200 rounded-lg shadow-lg md:w-2/3">
              <div className="border-4 border-gray-300 rounded-lg">
                <img
                  src={`http://localhost:5000/static/${namaFileGambar}`}
                  alt="Gambar Terunggah"
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{
                    transform: hasilIdentifikasi ? "scale(0.8)" : "scale(1)",
                  }}
                />
              </div>
              {hasilIdentifikasi && (
                <div className="absolute bottom-0 left-0 w-full bg-gray-800 text-white-255 px-2 py-2 rounded-b-lg flex items-center justify-between">
                  <p className="text-lg font-bold text-white-255 mx-auto">
                    {hasilIdentifikasi}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={handleBersihkanHasil}>
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
