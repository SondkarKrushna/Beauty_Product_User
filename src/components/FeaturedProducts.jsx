import React from "react";
import { TiArrowRight } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
  navigate("/products", { state: { fromCategory: true } });
};

  return (
    <div className="w-full mt-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
      {/* Responsive Grid Layout */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        <div className="relative col-span-1 sm:col-span-2 lg:col-span-2 rounded-2xl overflow-hidden h-[300px] sm:h-[340px] md:h-[380px]
        bg-gradient-to-r from-[#3F1543] via-[#704C80] to-[#370626]">
          <img
            src="/Images/modelwithProduct.webp"
            alt="Model with makeup"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[340px] md:h-[380px] flex items-center justify-center bg-[#1f0f24]">
          <img
            src="/Images/Rectangle 32.webp"
            alt="Compact"
            className="w-full h-full object-cover"
          />
        </div>

 
        <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[340px] md:h-[380px] flex items-center justify-center bg-[#2c0f24]">
          <img
            src="/Images/Rectangle 33.webp"
            alt="Cream"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-3">

     
        <div className="relative rounded-2xl bg-[#F9CCE1] px-8 py-10 sm:py-12 h-[260px] sm:h-[300px] md:h-[340px] flex flex-col justify-between overflow-hidden
        ">
          <h1 className="font-rafgins text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-black">
            Our Featured
            <br /> Products
          </h1>

          <div className="absolute bottom-6 right-8">
            <button
              onClick={handleViewAll}
              className="flex items-center text-base sm:text-lg font-semibold text-black hover:translate-x-1 transition-transform"
            >
              View All <TiArrowRight size={22} className="ml-2" />
            </button>
          </div>

          <img
            src="/Images/flower4.webp"
            alt="Flower decoration"
            className="absolute bottom-0 left-0 w-32 md:w-[200px]"
          />
        </div>

        <div className="rounded-2xl md:block hidden overflow-hidden bg-gradient-to-b from-[#4D1035] to-[#B50652] h-[260px] sm:h-[300px] md:h-[340px]  items-center justify-center">
          <img
            src="/Images/mascara.webp"
            alt="Mascara"
            className="w-[65%] sm:w-[55%] md:w-[50%] rotate-90 object-contain"
          />
        </div>

        <div className="rounded-2xl md:block hidden overflow-hidden bg-white h-[260px] sm:h-[300px] md:h-[340px] flex items-center justify-center">
          <img
            src="/Images/foundation2 (2).webp"
            alt="Foundation"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
