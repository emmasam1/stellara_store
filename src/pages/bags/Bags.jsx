import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Modal, Divider, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ProductCard from "../../components/card/PoductCard";
import Loader from "../../components/loader/Loader";
import bg_5 from "../../assets/bg_5.jpg";
import bg_4 from "../../assets/bg_4.jpg";

const API_BASE_URL = "https://stellara-server-1.onrender.com";

const Bags = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Fetch all bag products
  const getAppProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/category/bags`);
      setProducts(res?.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch bag products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppProducts();
  }, []);

  // ✅ Handle product click (open modal + update view count once)
  const handleProductClick = async (product) => {
    setSelectedProduct(product);

    const viewed = JSON.parse(localStorage.getItem("viewedProducts") || "[]");

    // 👁️ Only increment once per device
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
        console.error("Failed to update view count", err);
      }
    }
  };

  const handleModalClose = () => setSelectedProduct(null);

  // Split products into two sections
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
        </div>
      </div>

      {/* First Product Grid */}
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
                className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl relative cursor-pointer"
                onClick={() => handleProductClick(item)}
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
                {/* 👁️ View Count */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs">
                  <EyeOutlined />
                  <span>{item.views || 0}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Banner Section */}
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
                className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl relative cursor-pointer"
                onClick={() => handleProductClick(item)}
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
                {/* 👁️ View Count */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs">
                  <EyeOutlined />
                  <span>{item.views || 0}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-10">
            No more products to show.
          </p>
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
            <div className="w-full h-80 flex justify-center items-center bg-[#1a1a1a]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-72 object-contain rounded-lg"
              />
            </div>

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

export default Bags;
