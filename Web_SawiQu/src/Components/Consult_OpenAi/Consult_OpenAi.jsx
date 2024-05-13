/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

function ConsultationOpenAI() {
  // State untuk menyimpan pertanyaan, jawaban, daftar percakapan, dan lainnya
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [conversations, setConversations] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL API dan efek samping untuk mendapatkan percakapan saat komponen dimuat
  const apiUrl = import.meta.env.VITE_MOCK_API;
  useEffect(() => {
    fetchConversations();
  }, []);

  // Fungsi untuk mendapatkan percakapan dari API
  async function fetchConversations() {
    try {
      const response = await axios.get(apiUrl);
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setError("Failed to fetch conversations");
    }
  }

  // Fungsi untuk menghasilkan jawaban untuk pertanyaan tertentu
  async function generateAnswerForQuestion(question) {
    try {
      // Deteksi jenis pertanyaan berdasarkan kontennya
      const isCabbageRelated = question.toLowerCase().includes("sawi");
      const isIdentityQuestion = question
        .toLowerCase()
        .includes("bisakah kamu membantu saya", "kamu siapa?");
      const isOffensiveQuestion =
        /\b(fuck|sialan|anjing|tolol|njirt|dog|stupid|pussy|babi|cunt)\b/i.test(
          question
        );

      // Logika untuk memberikan jawaban berdasarkan jenis pertanyaan
      if (!isCabbageRelated && !isIdentityQuestion && !isOffensiveQuestion) {
        return "Maaf, saya hanya dapat menjawab pertanyaan terkait dengan sayuran sawi.";
      }

      if (isOffensiveQuestion) {
        return "Mohon maaf, saya tidak dapat menjawab pertanyaan yang mengandung kata-kata kasar atau tidak pantas. Sebagai AI yang bekerja dalam industri profesional, saya harus menjaga bahasa yang sopan dan ramah.";
      }

      if (isIdentityQuestion) {
        return "Saya adalah AI yang diprogram untuk menjawab pertanyaan seputar sayuran sawi. Saya akan dengan senang hati membantu Anda dengan pertanyaan-pertanyaan terkait topik tersebut.";
      }

      // Jika bukan pertanyaan identitas atau tidak pantas, gunakan OpenAI untuk menjawab
      const response = await axios({
        url: `${import.meta.env.VITE_API_OPEN_AI_URL}?key=${
          import.meta.env.VITE_API_OPEN_AI_KEY
        }`,
        method: "POST",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error yields answer, try again!:", error);
      throw new Error("Failed to produce an answer, try again!");
    }
  }

  // Fungsi untuk menghasilkan jawaban
  async function generateAnswer() {
    setIsLoading(true);
    setError(null);
    try {
      const newAnswer = await generateAnswerForQuestion(question);
      setAnswer(newAnswer);
      // Simpan percakapan baru dan tanggapan dari server
      const newConversation = { question, answer: newAnswer };
      const response = await axios.post(apiUrl, newConversation);
      setConversations([...conversations, response.data]);
      setQuestion("");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  // Fungsi untuk memulai mode pengeditan percakapan
  async function editConversation(index) {
    setIsLoading(true);
    setError(null);
    setEditingIndex(index);
    setQuestion(conversations[index].question);
    setAnswer(conversations[index].answer);
    setIsLoading(false);
  }

  // Fungsi untuk menyimpan percakapan yang diedit
  async function saveConversation(index) {
    setIsLoading(true);
    setError(null);
    try {
      const updatedConversation = { ...conversations[index], question, answer };
      const response = await axios.put(
        `${apiUrl}/${conversations[index].id}`,
        updatedConversation
      );
      // Update percakapan dengan jawaban yang baru dihasilkan
      const newConversations = [...conversations];
      newConversations[index] = response.data;
      const updatedAnswer = await generateAnswerForQuestion(question);
      newConversations[index].answer = updatedAnswer;
      await axios.put(`${apiUrl}/${conversations[index].id}`, {
        ...response.data,
        answer: updatedAnswer,
      });
      setConversations(newConversations);
      setEditingIndex(-1);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  // Fungsi untuk menghapus percakapan
  async function deleteConversation(index) {
    try {
      await axios.delete(`${apiUrl}/${conversations[index].id}`);
      const newConversations = [...conversations];
      newConversations.splice(index, 1);
      setConversations(newConversations);
    } catch (error) {
      setError("Failed to delete conversation");
    }
  }

  return (
    <div className="font-roboto bg-gray-100 min-h-screen py-10 ">
      <div className="max-w-6xl mx-auto overflow-hidden mt-20">
        <h1 className="text-4xl font-bold text-center font-serif">
          Consultation with OpenAI
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                rows="10"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question here..."></textarea>
            </div>
            <div className="text-center">
              <button
                className={`px-4 py-2 rounded-md text-gray-800 ${
                  question
                    ? "bg-gray-400 hover:bg-gray-500 hover:text-white-255"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={
                  editingIndex === -1
                    ? generateAnswer
                    : () => saveConversation(editingIndex)
                }
                disabled={!question}>
                {editingIndex === -1 ? "Generate Answer" : "Save Answer"}
              </button>
            </div>
            {isLoading && (
              <p className="mt-10 text-center">
                <span className="loading loading-spinner text-success w-20 h-20"></span>
              </p>
            )}
          </div>
          <div className="w-full md:w-2/3 bg-gray-200 text-gray-800 p-8">
            <h2 className="text-xl font-bold mb-4 text-center">
              Conversation List
            </h2>
            <div className="max-h-screen overflow-y-auto">
              <ul>
                {conversations.map((conversation, index) => (
                  <li
                    key={conversation.id}
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
                          you : {conversation.question}
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
                          AI : {conversation.answer}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mb-2 join py-2">
                      <button
                        className="text-blue-400 hover:text-blue-600 btn join-item mb-2 "
                        onClick={() => editConversation(index)}>
                        Edit
                      </button>
                      <button
                        className="text-red-400  hover:text-red-600 btn join-item"
                        onClick={() => deleteConversation(index)}>
                        Delete
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
export default ConsultationOpenAI;
