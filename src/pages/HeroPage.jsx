import React from "react";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products";
import SaleTiming from "../components/SaleTiming";
import Qualities from "../components/Qualities";
import FeaturedProducts from "../components/FeaturedProducts";
import BestestProducts from "../components/BestestProducts";
import Discount from "../components/Discount";
import RecentlyAddedProducts from "../components/RecentlyAddedProducts";

const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <div className="relative max-h-[850px]">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 mt-[-150px]">
          <img
            src="/Images/bgImage.webp"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Section */}
        <div className="relative h-[800px] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between">
          {/* Petals */}
          <img
            src="/Images/Petal1.webp"
            alt="Petal1"
            className="hidden md:block absolute top-32 left-10 w-36"
          />
          <img
            src="/Images/Petal2.webp"
            alt="Petal2"
            className="hidden md:block absolute bottom-40 right-10 w-44"
          />

          {/* Center Hero Image */}
          <div className="absolute inset-0 flex justify-center items-center mt-2 z-[20] pointer-events-none">
            <img
              src="/Images/HeroImg.webp"
              alt="Hero"
              className="md:top-0 top-60 md:block h-[350px] md:h-[750px] object-contain relative md:-mb-32"
            />

          </div>

          {/* Left Section */}
          <div className="absolute md:top-[20%]   lg:right-[67%] top-[10%] text-center md:text-right  space-y-4 md:space-y-8 z-10 w-full md:w-auto px-5">
            <img
              src="/icons/logo.png"
              alt="logo"
              className="h-24 md:h-44 w-auto mx-auto md:ml-48"
            />

            <p className="text-white text-lg md:text-2xl md:text-right leading-[1.6rem] md:leading-[2.2rem] font-outfit">
              Shop makeup, skincare, & more.
              <br />
              <span className="md:block">Discover daily flash sales for</span>
              <span className="md:block">unbeatable deals</span>
            </p>

            <button
              onClick={() =>
                navigate("/products", { state: { fromCategory: true } })
              }
              className="bg-gradient-to-r from-[#3F1543] via-[#704C80] to-[#370626] px-8 md:px-10 py-2 border rounded-3xl text-white font-semibold text-lg md:text-xl font-outfit mx-auto md:mr-2"
            >
              Shop Now
            </button>
          </div>

          {/* Right Section */}
          <div className="absolute md:top-[22%]   xl:right-[10px] top-[42%] text-center md:text-left w-full md:w-auto px-5 z-10">
            <h1 className="text-white text-xl md:text-5xl font-rafgins leading-[2.6rem] md:leading-[4rem] tracking-[0.1em]">
              Glow Every Day
              <br /> With Our Exclusive
              <br /> Beauty Collection
            </h1>

            <img
              src="/Images/eyeshadow.webp"
              alt="eyeshadow"
              className="h-44 w-36 hidden md:block md:h-80 md:w-64 mt-2 mx-auto md:mx-12"
            />
          </div>
        </div>
      </div>

      {/* Other Components */}
      <Products />
      <SaleTiming />
      <Qualities />
      <FeaturedProducts />
      <BestestProducts />
      <Discount />
      <RecentlyAddedProducts />
    </div>
  );
};

export default HeroPage;
