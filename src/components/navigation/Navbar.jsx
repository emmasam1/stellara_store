import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router";

const Navbar = ({ onCategorySelect, onSearch }) => {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navLinks = [
    { name: "All", path: "/" },
    { name: "Perfumes", path: "/perfumes" },
    { name: "Bags", path: "/bags" },
    // { name: "Beddings", path: "/beddings" },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value.toLowerCase());
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#202020] shadow-md">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-36 sm:w-40" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => onCategorySelect(link.name.toLowerCase())}
              className="text-[#CDA434] font-medium hover:text-orange-200 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center bg-white rounded-full px-3 py-1 w-40 sm:w-60">
          <SearchOutlined className="text-[#CDA434] text-lg" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-[60]">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            duration={0.8}
            color="#CDA434"
          />
        </div>
      </div>

      {/* Mobile Menu + Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-[#202020] z-50 flex flex-col p-6 space-y-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <Link to="/">
                <img src={logo} alt="Logo" className="w-36 mb-4" />
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    onCategorySelect(link.name.toLowerCase());
                    setOpen(false);
                  }}
                  className="text-[#CDA434] text-lg font-medium hover:text-orange-200"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Search */}
              <div className="relative mt-4 bg-white rounded-full px-3 py-2 flex items-center">
                <SearchOutlined className="text-[#CDA434]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
