/* eslint-disable no-unused-vars */
import React from "react";
import gambarPetani from "../assets/bg_hero.png";
import { Link } from "react-router-dom";

// Komponen untuk halaman utama aplikasi
const HalamanUtama = () => {
  return (
    <>
      {/* Bagian header */}
      <div className="min-h-screen bg-gray-100 py-24 p-10">
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
                petani sawi kami yang memanfaatkan teknologi terkini, yaitu
                Computer Vision. Kami menawarkan konsultasi OpenAI dan bimbingan
                dari ahli pertanian untuk memastikan keberhasilan usaha Anda.
              </p>
              <div className="flex flex-col md:flex-row justify-start space-y-4 md:space-y-0 md:space-x-4">
                <Link
                  to="/hamascan"
                  className="bg-gray-600 text-white-255 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 w-full md:w-auto text-center">
                  Lakukan Scaning
                </Link>
                <Link
                  to="/consult"
                  className="bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:text-white-255 hover:bg-gray-400 w-full md:w-auto text-center mt-4 md:mt-0">
                  Konsultasi Sekarang
                </Link>
              </div>
            </div>
            {/* Bagian gambar petani */}
            <div className="relative mt-5">
              <img
                src={gambarPetani}
                alt="Petani"
                className="w-full md:w-full h-auto ml-4 transform hover:scale-105 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HalamanUtama;
