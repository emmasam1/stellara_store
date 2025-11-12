import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Modal, Divider, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ProductCard from "../../components/card/PoductCard";
import Loader from "../../components/loader/Loader";

const API_BASE_URL = "https://stellara-server-1.onrender.com";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const loaderRef = useRef(null);

  // ✅ Fetch all products from backend
  const getAppProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      const sortedProducts = (res?.data || [])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .reverse();
      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppProducts();
  }, []);

  // ✅ Infinite scroll
  const loadMoreProducts = useCallback(() => {
    if (visibleCount < products.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 8);
        setLoadingMore(false);
      }, 800);
    }
  }, [products.length, visibleCount]);

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

  // ✅ Handle product click
  const handleProductClick = async (product) => {
    setSelectedProduct(product);

    const viewed = JSON.parse(localStorage.getItem("viewedProducts") || "[]");

    // 👁️ Increment view count in database only once per device
    if (!viewed.includes(product._id)) {
      try {
        const res = await axios.put(`${API_BASE_URL}/api/products/${product._id}/view`);
        const updatedProducts = products.map((p) =>
          p._id === product._id ? { ...p, views: res.data.views } : p
        );
        setProducts(updatedProducts);

        viewed.push(product._id);
        localStorage.setItem("viewedProducts", JSON.stringify(viewed));
      } catch (err) {
        console.error("Failed to increment view:", err);
      }
    }
  };

  const handleModalClose = () => setSelectedProduct(null);

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
          Handpicked luxury perfumes and lifestyle essentials — crafted to make
          every moment unforgettable.
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, visibleCount).map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="hover:shadow-xl hover:shadow-yellow-600/30 rounded-xl transition cursor-pointer relative"
                  onClick={() => handleProductClick(item)}
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

                  {/* 👁️ View Count */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs">
                    <EyeOutlined />
                    <span>{item.views || 0}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Infinite Scroll Loader */}
            {visibleCount < products.length && (
              <div ref={loaderRef} className="flex justify-center items-center py-10">
                <Loader />
              </div>
            )}
          </>
        )}
      </div>

      {/* 🧾 Product Modal */}
      <Modal
        open={!!selectedProduct}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={750}
        className="custom-dark-modal"
      >
        {selectedProduct && (
          <div className="bg-[#202020] text-white rounded-xl overflow-hidden">
            {/* Image */}
            <div className="w-full h-80 flex justify-center items-center bg-[#1a1a1a]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-72 object-contain rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="p-6 text-center space-y-3">
              <h2 className="text-2xl font-bold text-[#CDA434] uppercase tracking-wide">
                {selectedProduct.name}
              </h2>

              <Divider className="border-gray-700" />

              <p className="text-gray-300 leading-relaxed">
                {selectedProduct.description || "No description available."}
              </p>

              <div className="flex justify-center items-center gap-4 mt-4">
                <p className="text-lg font-semibold text-white">
                  ₦{selectedProduct.price}
                </p>
                {selectedProduct.oldPrice && (
                  <p className="text-gray-500 line-through">
                    ₦{selectedProduct.oldPrice}
                  </p>
                )}
              </div>

              {selectedProduct.size && (
                <p className="text-sm text-gray-400">
                  Size: {selectedProduct.size}
                </p>
              )}

              <div className="flex justify-center items-center gap-2 mt-2 text-gray-400 text-sm">
                <EyeOutlined />
                <span>{selectedProduct.views || 0} Views</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Custom modal styles */}
      <style jsx global>{`
        .custom-dark-modal .ant-modal-content {
          background-color: #202020 !important;
          color: white !important;
          border-radius: 1rem;
          overflow: hidden;
        }
        .custom-dark-modal .ant-modal-close {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default AllProducts;
