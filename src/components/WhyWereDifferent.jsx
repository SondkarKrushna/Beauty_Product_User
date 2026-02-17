import React from "react";

const WhyWereDifferent = () => {
  return (
   <div
  className="w-full  md:mt-10 mt-2 min-h-screen bg-no-repeat bg-center bg-cover text-white flex flex-col justify-center overflow-x-hidden"
  style={{
    backgroundImage: `url("/Images/bgImage.webp")`,
  }}
>

      {/* Title */}
      <div className="text-center md:mt-48 xl:mt-70 mt-32 px-4">
        <h2 className="text-4xl sm:text-5xl font-rafgins">
          Why We're Different ??
        </h2>
        <p className="mt-2 text-base sm:text-xl font-outfit">
          Unlike other stores, we go beyond selling products. We bring you
        </p>
      </div>

      {/* Grid Boxes */}
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-3 
          justify-items-center 
       
          -mt-20
          
          md:gap-20 
          py-20
          
          px-4 sm:px-10 md:px-20 
        "
      >
        {/* 1st Box */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[260px] sm:w-[350px] md:w-[400px] h-[280px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
            <img
              src="/Images/Flower_Circle_Decoration.webp"
              alt="Flower Decoration"
              className="absolute w-full h-full object-contain"
            />
            <p className="relative text-[13px] sm:text-lg md:text-xl font-outfit leading-relaxed mt-6 sm:mt-10">
              Trend-driven
              <br /> collections that keep
              <br /> you ahead in style.
            </p>
          </div>
        </div>

        {/* 2nd Box */}
        <div className="flex flex-col items-center text-center  ">
          <div className="relative w-[260px] sm:w-[350px] md:w-[400px] h-[280px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
            <img
              src="/Images/Flower_Circle_Decoration.webp"
              alt="Flower Decoration"
              className="absolute w-full h-full object-contain"
            />
            <p className="relative text-[13px]  md:text-xl font-outfit leading-relaxed mt-6 sm:mt-10">
              Affordable luxury so
              <br /> you never have to
              <br /> compromise.
            </p>
          </div>
        </div>

        {/* 3rd Box */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[260px] sm:w-[350px] md:w-[400px] h-[280px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
            <img
              src="/Images/Flower_Circle_Decoration.webp"
              alt="Flower Decoration"
              className="absolute w-full h-full object-contain"
            />
            <p className="relative text-[13px] md:text-xl font-outfit leading-relaxed mt-6 sm:mt-10">
              Personalized
              <br /> recommendations to
              <br /> help you find your
              <br /> perfect match.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyWereDifferent;
