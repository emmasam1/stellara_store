import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/card/PoductCard";
import Loader from "../../components/loader/Loader";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // 👈 initial products to show
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);

  const getAppProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://stellara-server-1.onrender.com/api/products`
      );
      setProducts(res?.data || []);
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppProducts();
  }, []);

  // 👇 Function to load more items
  const loadMoreProducts = useCallback(() => {
    if (visibleCount < products.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 8); // Load 8 more each time
        setLoadingMore(false);
      }, 800); // simulate delay
    }
  }, [products.length, visibleCount]);

  // 👇 Observer triggers when user scrolls near the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMoreProducts, loadingMore]);

  return (
    <div className="min-h-screen bg-[#202020] text-white">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-b from-[#1a1a1a] to-[#202020]">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-[#CDA434]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Full Collection
        </motion.h1>
        <motion.p
          className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Handpicked luxury perfumes and lifestyle essentials — crafted to make every moment unforgettable.
        </motion.p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, visibleCount).map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="hover:shadow-xl hover:shadow-yellow-600/30 rounded-xl transition"
                >
                  <ProductCard
                    title={item.name}
                    oldPrice={item.oldPrice || null}
                    newPrice={item.price}
                    image={item.image}
                    description={item.description || ""}
                    size={item.size || ""}
                    socialMedia={item.socialMedia}
                  />
                </motion.div>
              ))}
            </div>

            {/* Loader for infinite scroll */}
            {visibleCount < products.length && (
              <div
                ref={loaderRef}
                className="flex justify-center items-center py-10"
              >
                <Loader />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
