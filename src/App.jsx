// import { useState } from 'react'
import { Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import Bags from "./pages/bags/Bags";
import Bedroom from "./pages/bedroom/Bedroom";
import AllProducts from "./pages/allProduct/AllProducts";
import Footer from "./components/footer/Footer";
import Perfumes from "./pages/perfumes/Perfumes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/perfumes" element={<Perfumes />} />
        <Route path="/bedding" element={<Bedroom />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
