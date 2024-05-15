/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

function Konsultasi_OpenAi() {
  // State untuk menyimpan pertanyaan, jawaban, daftar percakapan
  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [percakapan, setPercakapan] = useState([]);
  const [indeksEdit, setIndeksEdit] = useState(-1);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [kesalahan, setKesalahan] = useState(null);

  const apiUrl = import.meta.env.VITE_MOCK_API;

  useEffect(() => {
    fetchPercakapan();
  }, []);

  // Fungsi untuk mendapatkan percakapan dari API
  async function fetchPercakapan() {
    try {
      const response = await axios.get(apiUrl);
      setPercakapan(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil percakapan:", error);
      setKesalahan("Gagal mengambil percakapan");
    }
  }

  // Fungsi untuk menghasilkan jawaban untuk pertanyaan
  async function generateAnswerForQuestion(pertanyaan) {
    try {
      // Deteksi jenis pertanyaan berdasarkan kontennya
      const terkaitSawi = pertanyaan.toLowerCase().includes("sawi");
      const pertanyaanIdentitas = pertanyaan
        .toLowerCase()
        .includes("kamu siapa?");
      const pertanyaanKasara =
        /\b(fuck|sialan|anjing|tolol|njirt|dog|stupid|pussy|babi|cunt)\b/i.test(
          pertanyaan
        );

      // Logika untuk memberikan jawaban berdasarkan jenis pertanyaan
      if (pertanyaanKasara) {
        return "Mohon maaf, saya tidak dapat menjawab pertanyaan yang mengandung kata-kata kasar atau tidak pantas. Sebagai AI yang bekerja dalam industri profesional, saya harus menjaga bahasa yang sopan dan ramah.";
      } else if (pertanyaanIdentitas) {
        return "Saya adalah AI yang diprogram untuk menjawab pertanyaan seputar sayuran sawi. Saya akan dengan senang hati membantu Anda dengan pertanyaan-pertanyaan terkait topik tersebut.";
      } else if (!terkaitSawi) {
        return "Maaf, saya hanya dapat menjawab pertanyaan terkait dengan sayuran sawi.";
      } else {
        // Jika pertanyaan terkait sawi,kita gunakan OpenAI untuk menjawab
        const response = await axios({
          url: `${import.meta.env.VITE_API_OPEN_AI_URL}?key=${
            import.meta.env.VITE_API_OPEN_AI_KEY
          }`,
          method: "POST",
          data: {
            contents: [{ parts: [{ text: pertanyaan }] }],
          },
        });

        return response.data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      console.error("Gagal menghasilkan jawaban, coba lagi!:", error);
      throw new Error("Gagal menghasilkan jawaban, coba lagi!");
    }
  }

  // Membuat fungsi untuk menghasilkan jawaban
  async function generateAnswer() {
    setSedangMemuat(true);
    setKesalahan(null); //untuk menghapus error sebelumnya jika ada
    try {
      const jawabanBaru = await generateAnswerForQuestion(pertanyaan);
      setJawaban(jawabanBaru);
      //kemudian dsimpan sebagai percakapan baru dan tanggapan dari server
      const percakapanBaru = { pertanyaan, jawaban: jawabanBaru };
      const response = await axios.post(apiUrl, percakapanBaru);
      setPercakapan([...percakapan, response.data]); // ini itu untuk membarui list percakapan yang di lihat user
      setPertanyaan("");
    } catch (error) {
      setKesalahan(error.message);
    }
    setSedangMemuat(false);
  }

  // Membuat fungsi untuk memulai mode pengeditan percakapan
  async function editPercakapan(indeks) {
    setSedangMemuat(false);
    setKesalahan(null); //untuk menghapus error sebelumnya jika ada
    setIndeksEdit(indeks);
    setPertanyaan(percakapan[indeks].pertanyaan);
    setJawaban(percakapan[indeks].jawaban);
    // setSedangMemuat(true);
  }

  // Membuat fungsi untuk menyimpan percakapan yang diedit
  async function simpanPercakapan(indeks) {
    setSedangMemuat(true);
    setKesalahan(null); //untuk menghapus error sebelumnya jika ada
    try {
      const percakapanDiperbarui = {
        ...percakapan[indeks],
        pertanyaan,
        jawaban,
      };
      const response = await axios.put(
        `${apiUrl}/${percakapan[indeks].id}`,
        percakapanDiperbarui
      );
      // Update percakapan dengan jawaban yang baru dihasilkan
      const percakapanBaru = [...percakapan];
      percakapanBaru[indeks] = response.data;
      const jawabanDiperbarui = await generateAnswerForQuestion(pertanyaan);
      percakapanBaru[indeks].jawaban = jawabanDiperbarui;
      await axios.put(`${apiUrl}/${percakapan[indeks].id}`, {
        ...response.data,
        jawaban: jawabanDiperbarui,
      });
      setPercakapan(percakapanBaru);
      setIndeksEdit(-1); //-1 untuk keluar dari mode pengeditan.
      setPertanyaan("");
      setJawaban("");
    } catch (error) {
      setKesalahan(error.message);
    }
    setSedangMemuat(false); // menghentikan loading saat menyimpan percakapan setelah selesai edit
  }

  //Membuat fungsi untuk menghapus percakapan
  async function hapusPercakapan(indeks) {
    try {
      await axios.delete(`${apiUrl}/${percakapan[indeks].id}`);
      const percakapanBaru = [...percakapan];
      percakapanBaru.splice(indeks, 1);
      setPercakapan(percakapanBaru);
    } catch (error) {
      setKesalahan("Gagal menghapus percakapan");
    }
  }

  return (
    <div className="font-roboto bg-gray-100 min-h-screen py-10 ">
      <div className="max-w-6xl mx-auto overflow-hidden mt-20">
        <h1 className="text-4xl font-bold text-center font-serif">
          Konsultasi dengan OpenAI
        </h1>
        <p className="text-lg text-center text-gray-700 mt-4">
          Dengan kerjasama OpenAI, kami menyediakan layanan konsultasi OpenAI,
          memastikan bantuan berkualiti tinggi dan terstruktur yang dapat,
          membantu Anda menjawab pertanyaan seputar sayuran sawi.
        </p>
      </div>
      <div className="max-w-7xl py-2 px-2 mx-auto bg-white-255 rounded-md shadow-md overflow-hidden mt-10">
        <div className="flex flex-col md:flex-row p-2">
          <div className="w-full md:w-2/3 p-10 m-20  mx-auto">
            {kesalahan && <p className="text-red-500 mb-4">{kesalahan}</p>}
            <div className="mb-4">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                rows="10"
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
                placeholder="Masukkan pertanyaan Anda di sini..."></textarea>
            </div>
            <div className="text-center">
              <button
                className={`px-4 py-2 rounded-md text-gray-800 ${
                  pertanyaan
                    ? "bg-gray-400 hover:bg-gray-500 hover:text-white-255"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={
                  indeksEdit === -1
                    ? generateAnswer
                    : () => simpanPercakapan(indeksEdit)
                }
                disabled={!pertanyaan}>
                {indeksEdit === -1 ? "Kirim Pertanyaan" : "Simpan Jawaban"}
              </button>
            </div>
            {sedangMemuat && (
              <p className="mt-10 text-center">
                <span className="loading loading-spinner text-success w-20 h-20"></span>
              </p>
            )}
          </div>
          <div className="w-full md:w-2/3 bg-gray-200 text-gray-800 p-8">
            <h2 className="text-xl font-bold mb-4 text-center">
              Daftar Percakapan
            </h2>
            <div className="max-h-screen overflow-y-auto">
              <ul>
                {percakapan.map((percakapan, indeks) => (
                  <li
                    key={percakapan.id}
                    className="mb-4 last:mb-0 border border-gray-300 p-4 rounded-md">
                    <div className="chat chat-start">
                      <div className="chat-image avatar hidden sm:block">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://media.licdn.com/dms/image/D5603AQHgJk9xj28AqA/profile-displayphoto-shrink_100_100/0/1702464827671?e=1720656000&v=beta&t=3sGt2sLPYPbCGIYebSF4Nrb1-bGSz5G22ULuZKwv0gA"
                          />
                        </div>
                      </div>
                      <div className="mb-2 chat-bubble">
                        <p className="font-bold text-sm sm:text-base">
                          Anda: {percakapan.pertanyaan}
                        </p>
                      </div>
                    </div>
                    <div className="chat chat-end">
                      <div className="chat-image avatar hidden sm:block">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://th.bing.com/th/id/OIP.e2kmkhVwe_O04WYI10eelwAAAA?rs=1&pid=ImgDetMain"
                          />
                        </div>
                      </div>
                      <div className="mb-2 chat-bubble">
                        <p className="text-sm sm:text-base">
                          AI: {percakapan.jawaban}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mb-2 join py-2">
                      <button
                        className="text-blue-400 hover:text-blue-600 btn join-item mb-2 "
                        onClick={() => editPercakapan(indeks)}>
                        Edit
                      </button>
                      <button
                        className="text-red-400  hover:text-red-600 btn join-item"
                        onClick={() => hapusPercakapan(indeks)}>
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Konsultasi_OpenAi;
