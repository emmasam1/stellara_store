import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/card/PoductCard";
import bg_5 from "../../assets/bg_5.jpg";
import bg_4 from "../../assets/bg_4.jpg";
import Loader from "../../components/loader/Loader";

const Bags = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAppProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://stellara-server-1.onrender.com/api/products/category/bags"
      );
      setProducts(res?.data || []);
      // console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppProducts();
  }, []);

  // Split products into two grids
  const firstGridProducts = products?.slice(0, 8);
  const secondGridProducts = products?.length > 8 ? products?.slice(8) : [];

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
            Discover timeless handbags, totes, and travel essentials crafted for
            style and durability.
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

      {/* Top Product Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-[#CDA434] mb-6">
          Featured Products
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {firstGridProducts?.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl"
              >
                <ProductCard
                  title={item.name}
                  oldPrice={item.oldPrice}
                  newPrice={item.price}
                  image={item.image}
                  description={item.description}
                  size={item.size}
                  socialMedia={item.socialMedia}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Second Hero Banner */}
      <div
        className="relative h-[500px] max-w-6xl mx-auto flex items-center justify-center bg-cover bg-center overflow-hidden my-12 rounded-xl"
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
            From daily use to special occasions, our collection blends luxury
            and practicality effortlessly.
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
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-[#CDA434] mb-6">
          More From This Collection
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : secondGridProducts?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {secondGridProducts?.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl"
              >
                <ProductCard
                  title={item.name}
                  oldPrice={item.oldPrice}
                  newPrice={item.price}
                  image={item.image}
                  description={item.description}
                  size={item.size}
                  socialMedia={item.socialMedia}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-10">
            No more products to show.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bags;
