import React from "react";
import { Redirect } from "react-router-dom";

function ProtectedRoute ({ loggedIn, children }) {
  return loggedIn ? children : <Redirect to="./signin" />
};

export default ProtectedRoute;
