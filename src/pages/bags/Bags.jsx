import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/card/PoductCard";
import bg_5 from "../../assets/bg_5.jpg";
import bg_4 from "../../assets/bg_4.jpg";
import Loader from "../../components/loader/Loader";

const Bags = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef(null);

  const getAppProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://stellara-server-1.onrender.com/api/products/category/bags"
      );
      setProducts(res?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Lazy load more items when bottom of page is visible
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 8);
        setLoadingMore(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    getAppProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Split products: first grid (top) and second grid (after hero)
  const firstGridProducts = products.slice(0, 8);
  const secondGridProducts = products.slice(8, visibleCount);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {firstGridProducts.map((item) => (
              <motion.div
                key={item._id}
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
        )}
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
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {secondGridProducts.map((item) => (
                <motion.div
                  key={item._id}
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

            {/* Lazy Loader for second grid */}
            {visibleCount < products.length && (
              <div ref={loaderRef} className="flex justify-center py-10">
                {loadingMore && <Loader />}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 py-8 mt-12 text-center">
        &copy; {new Date().getFullYear()} Stellara. All rights reserved.
      </footer>
    </div>
  );
};

export default Bags;
