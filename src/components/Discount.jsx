import React from "react";
import { useNavigate } from "react-router-dom";

const Discount = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full lg:h-[600px] md:h-[520px] sm:h-[450px] h-auto mt-20 overflow-hidden">
      {/* Background Image */}
      <img
        src={"/Images/Rectangle 41.webp"}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Decorative Images */}
      <img
        src={"/Images/Petal1.webp"}
        alt="Petal 1"
        className="absolute bottom-10 lg:left-[600px] h-20 hidden md:block z-10"
      />
      <img
        src={"/Images/Petal2.webp"}
        alt="Petal 2"
        className="absolute top-10 lg:right-40 h-16 hidden md:block z-10"
      />
      <img
        src={"/Images/Petal2.webp"}
        alt="Petal 2"
        className="absolute -top-2 lg:left-[450px] h-32 hidden md:block z-10"
      />
      <img
        src={"/Images/flower3.webp"}
        alt="Flower"
        className="absolute bottom-0 -left-48 h-[450px] object-contain top-20 hidden md:block z-10"
      />

      {/* ✅ Content Section */}
      <div
        className="
    relative flex flex-col-reverse md:flex-row items-center 
    justify-center md:justify-between lg:justify-center
    gap-6 md:gap-6 lg:gap-[2px] xl:gap-10    
    w-full px-4 sm:px-6 md:px-10
    text-white z-20
    lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2
    py-10 sm:py-12 md:py-16
  "
      >
        {/* Left Content */}
        <div
          className="
          flex flex-col gap-4 
          lg:min-w-[300px] md:min-w-[380px]
          text-center md:text-left 
          w-full lg:w-auto 
          -mt-10 lg:mt-0
        "
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold font-outfit leading-tight">
            Save 50%
          </h1>

          <h2 className="text-lg sm:text-2xl md:text-4xl text-[#F9CCE1] font-medium font-outfit">
            Massage Cream Products
          </h2>

          <p className="text-xs sm:text-sm md:text-lg text-[#F8B9CE] font-outfit tracking-wide leading-relaxed px-2 sm:px-0 max-w-[480px] mx-auto md:mx-0">
            Discover the magic of beauty at unbeatable prices — shop your
            favorite makeup, skincare, and fragrance with exclusive offers
            designed to make you glow without overspending.
          </p>

          <div className="flex justify-center md:justify-start mt-4">
            <button
              style={{
                background:
                  "linear-gradient(90deg, #E4C38D, #D99D41, #C7A161, #E0CCA5, #F9F7EA)",
                borderRadius: "50px",
                width: "170px",
                padding: "12px",
                fontFamily: "outfit",
                fontSize: "21px"
              }}
               onClick={() =>
                navigate("/products", { state: { fromCategory: true } })
              }
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Image */}
        <img
          src={"/Images/Cosmetic-Product.webp"}
          alt="Cosmetic Product"
          className="
            object-contain 
            h-[180px] sm:h-[250px] md:h-[380px] lg:h-[550px]
            w-[150px] sm:w-[220px] md:w-[360px] lg:w-[550px]
            mb-6 md:mb-0
            max-md:mx-auto
            z-20
          "
        />
      </div>
    </div>
  );
};

export default Discount;
