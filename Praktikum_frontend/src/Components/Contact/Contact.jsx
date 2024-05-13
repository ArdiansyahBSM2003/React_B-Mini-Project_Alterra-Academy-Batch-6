/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaUserTie, FaEnvelopeOpenText, FaCommentDots } from "react-icons/fa";

const ContactUs = () => {
  // State untuk menyimpan nilai input dan status pengiriman
  const [senderName, setSenderName] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({
    senderName: "",
    to: "",
    subject: "",
    message: "",
  });

  // Fungsi untuk mengirim email
  const sendMail = () => {
    const newErrors = {};
    if (!senderName) newErrors.senderName = "Please enter your name.";
    if (!to) newErrors.to = "Please enter recipient email.";
    if (!subject) newErrors.subject = "Please enter the subject.";
    if (!message) newErrors.message = "Please enter your message.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Menginisialisasi EmailJS
    emailjs.init("xVqXfrzaS2rIoSa9Y");
    const params = {
      sendername: senderName,
      to,
      subject,
      message,
    };
    const serviceID = "service_2003";
    const templateID = "template_tmwtrwh";

    // Mengirim email menggunakan EmailJS
    emailjs
      .send(serviceID, templateID, params)
      .then(() => {
        // Penanganan sukses
        setIsSuccess(true);
        setSenderName("");
        setTo("");
        setSubject("");
        setMessage("");
        setErrors({
          senderName: "",
          to: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setIsSuccess(false), 3000);
      })
      .catch((error) => {
        // Penanganan error
        console.error("Error sending message:", error);
        setIsSuccess(false);
        setErrors({
          senderName: "",
          to: "",
          subject: "",
          message: "Error sending message. Please try again later.",
        });
        setTimeout(() => setErrors({ ...errors, message: "" }), 3000);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div className="w-full max-w-full bg-base-100  p-5 mt-10">
        {/* Bagian Judul */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Contact Us</h1>
        </div>
        <div className="flex flex-col md:flex-row ">
          {/* Bagian Informasi Kontak */}
          <div className="w-full md:w-1/3 p-6 bg-gray-200 shadow-lg  mr-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span>{" "}
              ardiansyahsangkala@gmail.com
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Phone:</span> +62 812 123 4567
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Address:</span> 123 Industrial
              Park, City, Country
            </p>
          </div>

          {/* Form Kontak */}
          <div className="w-full md:w-2/3 p-6">
            {/* Input Nama Pengirim */}
            <div className="mb-4 flex items-center">
              <FaUserTie className="text-xl text-gray-600 mr-4" />
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name"
                className="w-full input  input-bordered"
                required
              />
            </div>
            {errors.senderName && (
              <div className="text-red-600 ">{errors.senderName}</div>
            )}
            {/* Input Email Penerima */}
            <div className="mb-4 flex items-center">
              <FaEnvelopeOpenText className="text-xl text-gray-600 mr-4" />
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter recipient email"
                className="w-full input  input-bordered"
                required
              />
            </div>
            {errors.to && <div className="text-red-600 ">{errors.to}</div>}
            {/* Input Subject */}
            <div className="mb-4 flex items-center">
              <FaCommentDots className="text-xl text-gray-600 mr-4" />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="w-full input  input-bordered"
                required
              />
            </div>
            {errors.subject && (
              <div className="text-red-600 ">{errors.subject}</div>
            )}
            {/* Input Pesan */}
            <div className="mb-6 flex items-start">
              <FaCommentDots className="text-xl text-gray-600 mr-4 mt-2" />
              <textarea
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="w-full textarea textarea-bordered"
                required></textarea>
            </div>
            {errors.message && (
              <div className="text-red-600 ">{errors.message}</div>
            )}
            {/* Tombol Kirim Pesan */}
            <div className="flex justify-center items-center">
              <button
                onClick={sendMail}
                className="w-[50%]  btn btn-neutral hover:bg-gray-900 hover:text-white-255 text-white-255 rounded-md mx-auto">
                Send Message
              </button>
            </div>

            {/* Pemberitahuan Sukses */}
            {isSuccess && (
              <div className="text-green-600 font-bold text-center mt-4">
                Message sent successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
