import React from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import bgImg from "/Images/footerBgImage.jpg";
import { useNavigate } from "react-router-dom";

const infoItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Product", path: "/products" },
  { label: "Contact", path: "/contact" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="relative w-full text-white px-4  py-10 sm:py-12 md:py-16 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
     
      <div className="max-w-full md:px-16 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-10">
        {/* Logo */}
        <div className="flex md:mt-0 mt-4 justify-start sm:justify-center md:justify-start items-center">
          <img
            src={"/icons/logo.png"}
            alt="Logo"
            className="h-16 sm:h-24 md:h-32 object-contain"
          />
        </div>

     
        <div>
          <h3 className="text-md font-semibold mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-md text-[#F8B9CE]">
            {infoItems.map((item) => (
              <li
                key={item.label}
                className="cursor-pointer hover:text-white transition-colors"
                onClick={() => handleNavigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Security */}
        <div>
          <h3 className="text-md font-semibold mb-4">SECURITY</h3>
          <ul className="space-y-2 text-md text-[#F8B9CE]">
            <li
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => handleNavigate("/privacy-policy")}
            >
              Privacy & Policy
            </li>
            <li
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => handleNavigate("/terms-conditions")}
            >
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-md font-semibold mb-4">ADDRESS</h3>
          <p className="text-md leading-relaxed text-[#F8B9CE]">
            Golden City Center,
            <br />
            Chhatrapati Sambhajinagar,
            <br />
            431001
          </p>
        </div>

        {/* Contact */}
        <div className="md:text-center sm:text-left">
          <a
            href="tel:+919999999999"
            className="text-base sm:text-lg font-semibold mb-2 bg-[#FF0089] px-5 sm:px-7 py-2 sm:py-3 rounded-xl inline-block"
          >
            Request a call
          </a>
          <p className="text-sm sm:text-md mt-1 text-[#FF0089]">+91 999 999 9999</p>
          <p className="text-sm sm:text-md mt-1">
            <a href="mailto:tiara@gmail.com" className="text-[#FF0089]">
              tiara@gmail.com
            </a>
          </p>
        </div>
      </div>

 
      <div className="flex flex-col md:flex-row md:px-16 justify-between items-start gap-6 mt-8 md:mt-12">
        {/* Text */}
        <div className="text-lg sm:text-xl md:text-3xl">
          <p className="block lg:hidden">
            If you didn’t find the Products you are interested in or have questions?
          </p>
          <p className="hidden lg:block  leading-snug">
            If you didn’t find the Products <br />
            you are interested in or have <br />
            questions?
          </p>
        </div>

        {/* Input & Social */}
        <div className="w-full md:w-auto text-left md:text-right">
          <div className="flex gap-3 justify-start md:justify-end mb-4">
            <a
              href="https://www.telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0089] p-2 rounded-full"
            >
              <FaTelegramPlane className="text-white" />
            </a>

            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0089] p-2 rounded-full"
            >
              <FaWhatsapp className="text-white" />
            </a>
          </div>

          <p className="text-sm sm:text-md mb-2 text-gray-200">
            Just send us your contact email and we will contact you.
          </p>

          <div className="relative w-full sm:w-[300px] md:w-[500px]  mt-2">
            <input
              type="text"
              className="w-full h-10 sm:h-12 md:h-14 px-4 rounded-2xl bg-transparent border border-white/50 text-white text-sm placeholder:text-gray-300 focus:outline-none"
              placeholder="YOUR EMAIL/CONTACT NO"
            />
            <FaArrowRightLong className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer" />
          </div>
        </div>
      </div>


      <div className="flex flex-col md:flex-row justify-between  md:items-center mt-8 md:mt-12 gap-4 text-start md:text-start px-4 sm:px-0 md:px-16">
        <h1 className="text-xs sm:text-sm md:text-base">&copy; 2025 - All Rights Reserved</h1>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <h1 className="text-xs sm:text-sm md:text-base">Developed By</h1>
          <img
            src={"/icons/tech_surya_logo.png"}
            className="h-6 sm:h-8 md:h-10"
            alt="Tech Surya"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
