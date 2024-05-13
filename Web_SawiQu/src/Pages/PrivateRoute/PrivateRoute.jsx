/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute adalah komponen yang memastikan akses hanya diberikan kepada pengguna yang terautentikasi.
// Jika pengguna terautentikasi, komponen ini akan menampilkan children (komponen di dalamnya),
// jika tidak, pengguna akan diarahkan kembali ke halaman login.
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
