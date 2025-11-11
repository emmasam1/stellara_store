import React from "react";
import { motion } from "framer-motion";
import bg_5 from "../../assets/bg_5.jpg";
import bg_4 from "../../assets/bg_4.jpg";
import image9 from "../../assets/image_9.jpg";
import image10 from "../../assets/image_10.jpg";
import image11 from "../../assets/image_11.jpg";
import image12 from "../../assets/image_12.jpg";
import image13 from "../../assets/image_13.jpg";
import image14 from "../../assets/image_14.jpg";
import image15 from "../../assets/image_15.jpg";
import image16 from "../../assets/image_16.jpg";
import ProductCard from "../../components/card/PoductCard";

const Bags = () => {
  const products = [
    { id: 1, title: "Ferragamo Studio BAG", oldPrice: "₦18,000", newPrice: "₦15,500", image: image9 },
    { id: 2, title: "Luxury Handbag with Chain Strap", oldPrice: "₦22,000", newPrice: "₦19,500", image: image10 },
    { id: 3, title: "Elegant Crocodile Pattern PU Leather Tote Bag", oldPrice: "₦12,000", newPrice: "₦10,000", image: image11 },
    { id: 4, title: "Mini Crossbody Bag", oldPrice: "₦9,500", newPrice: "₦8,000", image: image12 },
    { id: 5, title: "Elegant Evening Clutch", oldPrice: "₦14,000", newPrice: "₦11,500", image: image13 },
    { id: 6, title: "Large Travel Duffel Bag", oldPrice: "₦25,000", newPrice: "₦21,000", image: image14 },
    { id: 7, title: "Backpack with Laptop Compartment", oldPrice: "₦20,000", newPrice: "₦17,000", image: image15 },
    { id: 8, title: "Designer Quilted Handbag", oldPrice: "₦28,000", newPrice: "₦24,500", image: image16 },
  ];

  return (
    <div className="bg-[#202020] text-white">
      {/* Hero Section */}
      <div
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${bg_5})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-[#CDA434] drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elegant Bags for Every Occasion
          </motion.h1>
          <motion.p
            className="mt-4 text-gray-400 text-lg leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover timeless handbags, totes, and travel essentials crafted for style and durability.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-[#CDA434] to-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:from-yellow-400 hover:to-[#CDA434] transition"
          >
            Shop Now
          </motion.button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-[#CDA434] mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl"
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </div>

        {/* Second Hero Banner */}
        <div
          className="relative h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden my-12 rounded-xl"
          style={{ backgroundImage: `url(${bg_4})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[#CDA434]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Carry Your Elegance Everywhere
            </motion.h2>
            <motion.p
              className="mt-4 text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              From daily use to special occasions, our collection blends luxury and practicality effortlessly.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-[#CDA434] to-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:from-yellow-400 hover:to-[#CDA434] transition"
            >
              Explore Collection
            </motion.button>
          </div>
        </div>

        {/* Second Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl"
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optional Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 py-8 mt-12 text-center">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </footer>
    </div>
  );
};

export default Bags;
