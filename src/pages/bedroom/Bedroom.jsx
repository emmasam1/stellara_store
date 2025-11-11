import React from "react";
import { motion } from "framer-motion";
import bg_2 from "../../assets/bedding_bg_1.jpg";
import bg_3 from "../../assets/bedding_bg_2.jpg";
import image17 from "../../assets/image_17.jpg";
import image18 from "../../assets/image_18.jpg";
import image19 from "../../assets/image_19.jpg";
import ProductCard from "../../components/card/PoductCard";

const Bedroom = () => {
  const bedding = [
    {
      id: 1,
      title: "Luxury Cotton Bedsheet Set",
      oldPrice: "₦25,000",
      newPrice: "₦20,000",
      image: image17,
    },
    {
      id: 2,
      title: "Premium Duvet Comforter",
      oldPrice: "₦35,000",
      newPrice: "₦28,500",
      image: image18,
    },
    {
      id: 3,
      title: "Soft Memory Foam Pillow (Set of 2)",
      oldPrice: "₦15,000",
      newPrice: "₦12,000",
      image: image19,
    },
    {
      id: 4,
      title: "Classic King Size Bedsheet",
      oldPrice: "₦22,000",
      newPrice: "₦18,000",
      image: image19,
    },
    {
      id: 5,
      title: "Quilted Duvet Cover Set",
      oldPrice: "₦30,000",
      newPrice: "₦25,000",
      image: image18,
    },
    {
      id: 6,
      title: "Orthopedic Support Pillow",
      oldPrice: "₦18,000",
      newPrice: "₦14,500",
      image: image17,
    },
    {
      id: 7,
      title: "Deluxe Satin Bedsheet",
      oldPrice: "₦28,000",
      newPrice: "₦22,500",
      image: image19,
    },
    {
      id: 8,
      title: "All-Season Lightweight Blanket",
      oldPrice: "₦20,000",
      newPrice: "₦16,500",
      image: image18,
    },
  ];

  return (
    <div className="bg-[#202020] text-white">
      {/* Hero 1 */}
      <motion.div
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${bg_2})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          className="relative z-10 text-center max-w-2xl mx-auto px-4"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="heading text-4xl md:text-5xl font-bold text-[#CDA434] drop-shadow-lg">
            Must Have Home Accessories
          </h1>
          <p className="mt-3 text-gray-300 text-lg">
            Transform your bedroom with luxury bedding and comfort essentials
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 px-6 py-3 bg-[#CDA434] text-black font-semibold rounded-md shadow-lg hover:bg-yellow-600 transition"
          >
            Shop Bedding
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Product Grid 1 */}
      <div className="max-w-7xl mx-auto p-6">
        <motion.h2
          className="text-2xl font-semibold text-[#CDA434] mb-6"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Featured Bedding
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bedding.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="hover:shadow-xl hover:shadow-yellow-600/20 transition rounded-xl"
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </div>

        {/* Hero 2 */}
        <motion.div
          className="relative h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden my-12 rounded-lg"
          style={{ backgroundImage: `url(${bg_3})` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <motion.div
            className="relative z-10 text-center max-w-xl mx-auto px-4"
            initial={{ y: 26, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="heading text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              Crafting Comfort & Style for Every Home
            </h2>
            <p className="mt-3 text-gray-200 text-lg">
              Premium bedding designed for restful nights and beautiful
              interiors.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 px-6 py-3 border border-[#CDA434] text-[#CDA434] font-semibold rounded-md hover:bg-[#CDA434] hover:text-black transition"
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Product Grid 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bedding.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="hover:shadow-xl hover:shadow-yellow-600/20 transition rounded-xl"
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bedroom;
