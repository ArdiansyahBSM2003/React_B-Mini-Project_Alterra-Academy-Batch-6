import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaUserTie, FaEnvelopeOpenText, FaCommentDots } from "react-icons/fa";
import { useToast } from "@chakra-ui/react"; // Import hook useToast dari Chakra UI

const KontakKami = () => {
  // State untuk menyimpan nilai input dan status pengiriman
  const [namaPengirim, setNamaPengirim] = useState("");
  const [emailTujuan, setEmailTujuan] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState({
    namaPengirim: "",
    emailTujuan: "",
    subjek: "",
    pesan: "",
  });

  const toast = useToast(); // Gunakan hook useToast untuk menampilkan notifikasi

  // Fungsi untuk mengirim email
  const kirimEmail = () => {
    const errorBaru = {};
    // Validasi input
    if (!namaPengirim) errorBaru.namaPengirim = "Silakan masukkan nama Anda.";
    if (!emailTujuan)
      errorBaru.emailTujuan = "Silakan masukkan email penerima.";
    if (!subjek) errorBaru.subjek = "Silakan masukkan subjek.";
    if (!pesan) errorBaru.pesan = "Silakan masukkan pesan Anda.";

    if (Object.keys(errorBaru).length > 0) {
      setError(errorBaru);
      return;
    }

    // Mengirim email menggunakan EmailJS
    emailjs.init("xVqXfrzaS2rIoSa9Y");
    const params = {
      sendername: namaPengirim,
      to: emailTujuan,
      subject: subjek,
      message: pesan,
    };
    const serviceID = "service_2003";
    const templateID = "template_tmwtrwh";

    emailjs
      .send(serviceID, templateID, params)
      .then(() => {
        // Penanganan sukses: tampilkan notifikasi berhasil
        toast({
          title: "Pesan berhasil dikirim!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // Reset input dan error setelah berhasil dikirim
        setNamaPengirim("");
        setEmailTujuan("");
        setSubjek("");
        setPesan("");
        setError({
          namaPengirim: "",
          emailTujuan: "",
          subjek: "",
          pesan: "",
        });
      })
      .catch((error) => {
        // Penanganan error: tampilkan notifikasi gagal
        console.error("Error sending message:", error);
        toast({
          title: "Error mengirim pesan. Silakan coba lagi nanti.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10 bg-gray-100">
      <div className="w-full max-w-full p-5 mt-2 bg-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-center mb-8 mt-12">
          <h1 className="text-4xl font-bold text-gray-800 lg:mt-10">
            Kontak Kami
          </h1>
        </div>
        {error.pesan && (
          <div className="text-red-600 text-center">{error.pesan}</div>
        )}
        <div className="flex flex-col md:flex-row ">
          <div className="w-full md:w-1/3 p-6 bg-gray-200 shadow-lg rounded-md mr-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              Informasi Kontak
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span>{" "}
              ardiansyahsangkala@gmail.com
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Telepon:</span> +62 812 123 4567
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Alamat:</span> 123 Industrial
              Park, City, Country
            </p>
          </div>
          <div className="w-full md:w-2/3 p-6">
            <div className="mb-4 flex items-center">
              <FaUserTie className="text-xl text-gray-600 mr-4" />
              <input
                type="text"
                value={namaPengirim}
                onChange={(e) => setNamaPengirim(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full input input-bordered"
                required
              />
            </div>
            {error.namaPengirim && (
              <div className="text-red-600">{error.namaPengirim}</div>
            )}
            <div className="mb-4 flex items-center">
              <FaEnvelopeOpenText className="text-xl text-gray-600 mr-4" />
              <input
                type="email"
                value={emailTujuan}
                onChange={(e) => setEmailTujuan(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full input input-bordered"
                required
              />
            </div>
            {error.emailTujuan && (
              <div className="text-red-600">{error.emailTujuan}</div>
            )}
            <div className="mb-4 flex items-center">
              <FaCommentDots className="text-xl text-gray-600 mr-4" />
              <input
                type="text"
                value={subjek}
                onChange={(e) => setSubjek(e.target.value)}
                placeholder="Masukkan subjek"
                className="w-full input input-bordered"
                required
              />
            </div>
            {error.subjek && <div className="text-red-600">{error.subjek}</div>}
            <div className="mb-6 flex items-start">
              <FaCommentDots className="text-xl text-gray-600 mr-4 mt-2" />
              <textarea
                rows="6"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Masukkan pesan Anda"
                className="w-full textarea textarea-bordered"
                required></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={kirimEmail}
                className="w-[50%] btn btn-neutral hover:bg-gray-900 hover:text-white-255 text-white-255 rounded-md mx-auto">
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontakKami;
