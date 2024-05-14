import React from "react";
import heroImage from "../assets/hero_HamaScan.png";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen py-14 px-5 flex justify-center items-center">
      <div className="container mx-auto mr-10 ml-5 p-2">
        {/* Judul */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-14 mt-8">
          SawiQu
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Gambar */}
          <div className="flex-shrink-0 w-2/3 ml-auto mr-auto mb-8 lg:mb-0 p-0 bg-gray-400 rounded-lg md:mr-10 md:w-1/2">
            <img
              src={heroImage}
              alt="Hero Image"
              className="w-full h-auto object-cover mx-auto"
            />
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-700  lg:test-lg mb-6">
              SawiQu adalah aplikasi yang menggunakan teknologi Computer Vision
              untuk mengidentifikasi hama pertanian berdasarkan gambar yang
              diunggah oleh pengguna. Kami bekerja sama dengan para ahli
              pertanian dan menggunakan teknologi terbaru untuk membantu petani
              dalam melindungi tanaman mereka dari serangan hama yang dapat
              mengganggu hasil panen.
            </p>

            {/* Pilihan konsultasi */}
            <div className="flex flex-col space-y-4">
              {/* Konsultasi AI */}
              <div className="flex items-center space-x-4">
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    alt="AI Consultation"
                    src="https://th.bing.com/th/id/OIP.e2kmkhVwe_O04WYI10eelwAAAA?rs=1&pid=ImgDetMain"
                    className="w-full"
                  />
                </div>
                <Link
                  to="/consult"
                  className="text-gray-800 font-semibold cursor-pointer">
                  konsultasi AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
