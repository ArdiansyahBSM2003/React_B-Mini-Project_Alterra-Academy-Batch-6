/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
