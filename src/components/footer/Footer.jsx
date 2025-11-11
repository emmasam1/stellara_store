import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-center py-8 text-sm text-gray-400 border-t border-gray-700 mt-10">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#CDA434] font-semibold">Stellara</span>. All
        rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
