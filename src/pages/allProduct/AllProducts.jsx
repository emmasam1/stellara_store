import React from "react";
import { motion } from "framer-motion";
import image1 from "../../assets/image_1.jpeg";
import image2 from "../../assets/image_2.jpeg";
import image3 from "../../assets/image_3.jpeg";
import image4 from "../../assets/image_4.jpeg";
import image5 from "../../assets/image_5.jpg";
import image6 from "../../assets/image_6.jpeg";
import image7 from "../../assets/image_7.jpg";
import image8 from "../../assets/image_8.jpg";
import ProductCard from "../../components/card/PoductCard";

const AllProducts = () => {
  const products = [
    { id: 1, title: "Vanilla & Tobacco EDP 100ml", oldPrice: "₦10,000", newPrice: "₦8,500", image: image1 },
    { id: 2, title: "Olfactory Bonfire EDP 100ml", oldPrice: "₦12,000", newPrice: "₦10,000", image: image2 },
    { id: 3, title: "Zimaya Oscar EDP 100ml", oldPrice: "₦14,000", newPrice: "₦12,000", image: image3 },
    { id: 4, title: "Al Wataniah Oud For You EDP 100ml", oldPrice: "₦9,500", newPrice: "₦9,000", image: image4 },
    { id: 5, title: "Optimystic Paradox EDP 100ml", oldPrice: "₦10,000", newPrice: "₦8,500", image: image5 },
    { id: 6, title: "Night Club Irish Green 100ml", oldPrice: "₦12,000", newPrice: "₦10,000", image: image6 },
    { id: 7, title: "Hugo Boss Bottled Absolu 100ml", oldPrice: "₦14,000", newPrice: "₦12,000", image: image7 },
    { id: 8, title: "Armaf Club De Nuit Lionheart Man EDP 100ml", oldPrice: "₦9,500", newPrice: "₦9,000", image: image8 },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="hover:shadow-xl hover:shadow-yellow-600/30 rounded-xl transition"
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
