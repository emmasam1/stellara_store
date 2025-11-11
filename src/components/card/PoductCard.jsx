import React from "react";
import { Card } from "antd";
import { RiWhatsappFill } from "react-icons/ri";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const { Meta } = Card;

const ProductCard = ({
  title,
  oldPrice,
  newPrice,
  image,
  description,
  size,
}) => {
  const handleWhatsAppClick = () => {
    // ✅ Make sure `image` is a full URL like https://yourdomain.com/image.jpg
    const message = `
*Product Name:* ${title}
${size ? `*Size:* ${size}` : ""}
*Old Price:* ${oldPrice}
*New Price:* ${newPrice}
*Description:* ${description || "No description provided"}
🖼️ *Product Image:* ${image}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2347068417703?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card
      className="myBorder"
      hoverable
      style={{
        width: "100%",
        backgroundColor: "#2E302F",
        borderRadius: "10px",
      }}
      cover={
        <img
          alt={title}
          src={image}
          className="h-60 object-cover rounded-t-md"
        />
      }
    >
      {/* Title */}
      <Meta title={<span className="text-white">{title}</span>} />

      {/* Price Section */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-gray-400 line-through">{oldPrice}</span>
        <span className="text-[#CDA434] font-bold">{newPrice}</span>
      </div>

      {/* Social Icons */}
      <div className="flex space-x-4 mt-4">
        {/* WhatsApp */}
        <RiWhatsappFill
          size={25}
          className="text-green-500 hover:scale-110 cursor-pointer transition-transform"
          onClick={handleWhatsAppClick}
        />

        {/* Instagram - you can add a share link later */}
        <FaInstagram
          size={25}
          className="text-pink-500 hover:scale-110 cursor-pointer transition-transform"
        />

        {/* Facebook - you can add a share link later */}
        <FaFacebook
          size={25}
          className="text-blue-600 hover:scale-110 cursor-pointer transition-transform"
        />
      </div>
    </Card>
  );
};

export default ProductCard;
