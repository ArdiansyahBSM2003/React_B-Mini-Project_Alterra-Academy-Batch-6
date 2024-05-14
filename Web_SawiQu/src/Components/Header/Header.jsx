/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { BiLogoReact } from "react-icons/bi";
import axios from "axios";
import logo from "../../Components/assets/logo.png";

// Komponen untuk header navigasi
const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Efek untuk mengatur visibilitas header saat scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handler untuk menutup dropdown saat klik diluar dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler untuk proses logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handler untuk navigasi dan konsultasi via WhatsApp
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setShowDropdown(false);
  };

  const handleWhatsAppConsultation = (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber
      .replace(/\s+/g, "")
      .replace(/^0+/, "62");
    const encodedMessage = encodeURIComponent(
      "Halo, apakah anda tersedia untuk konsultasi?"
    );
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  // Daftar menu navigasi
  const menuItems = [
    { label: "Home", path: "/" },
    {
      label: " Consultation",
      dropdown: [
        {
          label: "Consult OpenAI",
          onClick: () => handleNavigation("/consult"),
        },
        {
          label: "Human Consult",
          onClick: () => handleWhatsAppConsultation("6282155321594"),
        },
      ],
    },
    { label: "HamaScan", path: "/hamaScan" },
    { label: "About", path: "/aboutUs" },
    { label: "Contact", path: "/contactUs" },
  ];

  return (
    <div>
      <nav
        className={`font-roboto pe-10 p-8 bg-gray-100 shadow-lg rounded-md md:flex md:justify-between md:w-auto min-w-full md:h-[60px] ${
          isHeaderVisible ? "fixed top-0 w-full" : "absolute"
        }`}>
        <div className="flex justify-between items-center">
          <a
            className="flex items-center text-2xl font-semibold italic font-roboto cursor-pointer text-gray-700"
            onClick={() => handleNavigation("/")}>
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 mr-2 rounded-full object-cover"
            />
            SawiQu
          </a>
          <span
            className="text-3xl cursor-pointer mx-2 md:hidden block text-gray-800"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </span>
        </div>
        <ul
          ref={dropdownRef}
          className={`md:flex md:items-center md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${
            isOpen ? "top-0 opacity-100" : "top-[-400px] opacity-0"
          } transition-all ease-in-out duration-500 ${
            isOpen ? "block" : "hidden"
          } relative`}>
          {menuItems.map((item, index) => (
            <li key={index} className="mx-4 my-6 md:my-0 relative">
              {item.dropdown ? (
                <div className="relative group">
                  <button
                    className="text-xl rounded-md text-gray-600 hover:text-green-500 py-2 px-2 cursor-pointer md:inline-flex w-[25%] flex justify-between items-center hover:underline underline-offset-8 transition-all duration-500"
                    onClick={() => setShowDropdown(!showDropdown)}>
                    {item.label}
                    <FaChevronDown
                      className={`transition-transform ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <ul
                    ref={dropdownRef}
                    className={`z-10 w-full rounded-md shadow-lg mt-0 bg-gray-100 absolute md:group-hover:block ${
                      showDropdown ? "block" : "hidden"
                    }`}>
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            subItem.onClick();
                            setShowDropdown(false);
                          }}
                          className="block px-4 py-2 text-gray-800 hover:text-green-500 rounded-md underline-offset-8 transition-all duration-500">
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path);
                  }}
                  className="text-xl rounded-md text-gray-800 hover:text-green-500 py-2 px-2 hover:underline underline-offset-8 transition-all duration-500">
                  {item.label}
                </a>
              )}
            </li>
          ))}
          {isAuthenticated && (
            <li className="mx-4 my-6 md:my-0">
              <a
                href="/"
                onClick={handleLogout}
                className="text-xl rounded-md text-gray-800 hover:text-green-500 py-2 px-2 hover:underline underline-offset-8 transition-all duration-500">
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
