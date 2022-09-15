import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cards from "./pages/Cards";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Cards />
      </Route>
    </BrowserRouter>
  );
}
