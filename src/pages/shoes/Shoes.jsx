import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Modal, Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import shoe1 from "../../assets/shoe1.jpg";
import shoe2 from "../../assets/shoe2.jpg";
import ProductCard from "../../components/card/PoductCard";
import Loader from "../../components/loader/Loader";

const API_BASE_URL = "https://stellara-server-1.onrender.com";

const Shoes = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch shoes
  const getAppProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/category/shoes`);
      const productsWithViews = (res?.data || []).map((item) => ({
        ...item,
        views: item.views || 0, // ensure views exist
      }));
      setProducts(productsWithViews);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppProducts();
  }, []);

  // Handle click to open modal
  const handleProductClick = async (product) => {
    setSelectedProduct(product);

    const viewed = JSON.parse(localStorage.getItem("viewedProducts") || "[]");

    if (!viewed.includes(product._id)) {
      try {
        const res = await axios.put(`${API_BASE_URL}/api/products/${product._id}/view`);
        const updatedViews = res.data.views;

        // Update product views in state
        setProducts((prev) =>
          prev.map((p) =>
            p._id === product._id ? { ...p, views: updatedViews } : p
          )
        );

        // Mark as viewed locally
        viewed.push(product._id);
        localStorage.setItem("viewedProducts", JSON.stringify(viewed));
      } catch (err) {
        console.error("Failed to increment view:", err);
      }
    }
  };

  const handleModalClose = () => setSelectedProduct(null);

  // Split products into two grids
  const firstGridProducts = products.slice(0, 8);
  const secondGridProducts = products.length > 8 ? products.slice(8) : [];

  return (
    <div className="bg-[#202020] text-white">
      {/* Hero Section */}
      <div
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${shoe1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-[#CDA434] drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Step into Style & Comfort
          </motion.h1>
          <motion.p
            className="mt-4 text-gray-400 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover high-quality shoes crafted for elegance, durability, and everyday confidence.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* First Product Grid */}
        <h2 className="text-2xl font-semibold text-[#CDA434] mb-6">
          Featured Shoes
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {firstGridProducts.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleProductClick(item)}
                className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl cursor-pointer relative"
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

        {/* Mid Banner Section */}
        <div
          className="relative h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden my-12 rounded-xl"
          style={{ backgroundImage: `url(${shoe2})` }}
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
              Walk Boldly, Live Confidently
            </motion.h2>
            <motion.p
              className="mt-4 text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              From casual wear to luxury collections — explore shoes made for every moment.
            </motion.p>
          </div>
        </div>

        {/* Second Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {secondGridProducts.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleProductClick(item)}
                className="hover:shadow-xl hover:shadow-yellow-600/30 transition rounded-xl cursor-pointer relative"
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

      {/* Product Modal */}
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
                  ${selectedProduct.price}
                </p>
                {selectedProduct.oldPrice && (
                  <p className="text-gray-500 line-through">
                    ${selectedProduct.oldPrice}
                  </p>
                )}
              </div>

              {selectedProduct.size && (
                <p className="text-sm text-gray-400">Size: {selectedProduct.size}</p>
              )}

              <div className="flex justify-center items-center gap-2 mt-2 text-gray-400 text-sm">
                <EyeOutlined />
                <span>{selectedProduct.views || 0} Views</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Custom Modal Styles */}
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

export default Shoes;
