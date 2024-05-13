/* eslint-disable no-unused-vars */
import React from "react";
import farmerImage from "../assets/bg_hero.png";
import { Link } from "react-router-dom";

// Komponen untuk halaman utama aplikasi
const LandingPage = () => {
  return (
    <>
      {/* Bagian header */}
      <div className="min-h-screen bg-white-255 py-24 p-10">
        <div className="container mx-auto px-4 mt-6">
          {/* Bagian konten utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Bagian teks dan tombol */}
            <div className="mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Selamat Datang Di Layanan Petani Sawi Modern
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Tingkatkan produktivitas dan hasil panen Anda dengan layanan
                petani sawi kami yang memanfaatkan teknologi terkini, termasuk
                Machine Learning dan Hamascan. Kami menawarkan konsultasi AI dan
                bimbingan dari ahli pertanian untuk memastikan keberhasilan
                usaha Anda.
              </p>
              <div className="flex flex-col md:flex-row justify-start space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <Link
                  to="/hamascan"
                  className="bg-green-600 text-white-255 font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 hover:bg-green-700 w-full md:w-auto">
                  Lakukan Scaning
                </Link>
                <Link
                  to="/consult"
                  className="bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 hover:bg-gray-400 w-full md:w-auto">
                  Konsultasi Sekarang
                </Link>
              </div>
            </div>
            {/* Bagian gambar petani */}
            <div className="relative mt-5">
              <img
                src={farmerImage}
                alt="Farmer"
                className="w-full md:w-full h-auto ml-4 transform hover:scale-105 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
