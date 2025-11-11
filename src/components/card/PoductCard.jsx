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
  socialMedia,
}) => {
  const handleWhatsAppClick = () => {
    if (!socialMedia?.whatsapp) return;

    // ✅ Place image link FIRST for WhatsApp preview
    const message = `
${image}

*Product Name:* ${title}
${size ? `*Size:* ${size}` : ""}
${oldPrice ? `*Old Price:* ₦${oldPrice}` : ""}
*New Price:* ₦${newPrice}
${description ? `*Description:* ${description}` : ""}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${socialMedia.whatsapp}?text=${encodedMessage}`;
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
          className="!h-60 w-full object-cover rounded-t-md"
        />
      }
    >
      <Meta title={<span className="text-white">{title}</span>} />

      <div className="flex justify-between items-center mt-3">
        {oldPrice && (
          <span className="text-gray-400 line-through">₦{oldPrice}</span>
        )}
        <span className="text-[#CDA434] font-bold">₦{newPrice}</span>
      </div>

      <div className="flex space-x-4 mt-4">
        {socialMedia?.whatsapp && (
          <RiWhatsappFill
            size={25}
            className="text-green-500 hover:scale-110 cursor-pointer transition-transform"
            onClick={handleWhatsAppClick}
          />
        )}
        {socialMedia?.instagram && socialMedia.instagram !== "" && (
          <FaInstagram
            size={25}
            className="text-pink-500 hover:scale-110 cursor-pointer transition-transform"
            onClick={() => window.open(socialMedia.instagram, "_blank")}
          />
        )}
        {socialMedia?.facebook && socialMedia.facebook !== "" && (
          <FaFacebook
            size={25}
            className="text-blue-600 hover:scale-110 cursor-pointer transition-transform"
            onClick={() => window.open(socialMedia.facebook, "_blank")}
          />
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
