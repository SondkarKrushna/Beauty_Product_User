import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { MdDiamond } from "react-icons/md";

const Qualities = () => {
  return (
    <div className="relative w-full md:mt-0">
      
      <img
        src="/Images/styleImg.webp"
        alt="background"
        className="absolute  inset-0 h-[350px] sm:h-[450px] md:h-[550px] xl:h-[600px] -z-10 left-10 sm:left-40 xl:left-60 hidden lg:block object-contain"
      />
     
      <img
        src="/Images/flower1.webp"
        alt="flower1"
        className="absolute  -top-24 sm:-top-42 left-2 h-[300px] sm:h-[400px] md:h-[420px] hidden lg:block object-contain"
      />
      <img
        src="/Images/flower2.webp"
        alt="flower2"
        className="absolute -bottom-10 sm:-bottom-20 right-0 h-[280px] sm:h-[400px] md:h-[420px] hidden lg:block object-contain"
      />
      <img
        src="/Images/Petal1.webp"
        alt="petal1"
        className="absolute  top-40 sm:top-72 -left-10 sm:-left-4 h-20 sm:h-28 md:h-24 hidden lg:block object-contain"
      />
      <img
        src="/Images/Petal2.webp"
        alt="petal2"
        className="absolute  -top-4 sm:-top-[20px] right-2 h-20 sm:h-28 md:h-30 hidden lg:block object-contain"
      />

      <div className="hidden lg:block relative z-10 h-[650px] xl:h-[750px] 2xl:h-[850px]">
        {/* Title */}
        <h1 className="absolute left-1/2 -translate-x-1/2 top-10 xl:top-16 text-3xl md:text-5xl font-rafgins text-[#280F22] text-center whitespace-nowrap">
          Why Shoppers Love Us &#63;
        </h1>

        {/* Model Image */}
        <div className="absolute left-1/2 -translate-x-1/2 top-28 xl:top-48 bg-gradient-to-b from-[#FF007B] to-[#250D20] w-[400px] md:w-[450px] xl:w-[480px] h-[480px] md:h-[520px] xl:h-[500px] overflow-hidden shadow-lg rounded-lg">
          <img
            src="/Images/model.webp"
            alt="model"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Top left */}
        <div className="absolute top-[44%] left-[calc(50%-430px)] w-[200px] xl:w-[240px] h-[2px] bg-[#23111F]" />
        {/* Top right */}
        <div className="absolute top-[44%] right-[calc(50%-430px)] w-[200px] xl:w-[240px] h-[2px] bg-[#23111F]" />
        {/* Bottom left */}
        <div className="absolute top-[66%] left-[calc(50%-400px)] w-[160px] xl:w-[190px] h-[2px] bg-[#23111F]" />
        {/* Bottom right */}
        <div className="absolute top-[66%] right-[calc(50%-400px)] w-[160px] xl:w-[190px] h-[2px] bg-[#23111F]" />

        {/* Quality 1 */}
        <div className="absolute top-[38%] left-[calc(50%-520px)] xl:left-[calc(50%-560px)] text-center">
          <div className="w-[80px] h-[70px] xl:w-[85px] xl:h-[80px] mx-auto bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-3 shadow-md">
            <img src="/icons/Vector.svg" className="h-10 xl:h-12" />
          </div>
          <p className="text-black font-medium leading-tight text-sm xl:text-base">
            Premium Quality <br /> Ingredients
          </p>
        </div>

        {/* Quality 2 */}
        <div className="absolute top-[38%] right-[calc(50%-520px)] xl:right-[calc(50%-560px)] text-center">
          <div className="w-[80px] h-[70px] xl:w-[85px] xl:h-[80px] mx-auto bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-3 shadow-md">
            <img src="/icons/Vector (1).svg" className="h-10 xl:h-12" />
          </div>
          <p className="text-black font-medium leading-tight text-sm xl:text-base">
            Trend-Driven <br /> Collections
          </p>
        </div>

        {/* Quality 3 */}
        <div className="absolute top-[63%] left-[calc(50%-490px)] xl:left-[calc(50%-530px)] text-center">
          <div className="w-[80px] h-[70px] xl:w-[85px] xl:h-[80px] mx-auto bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-3 shadow-md">
            <AiFillClockCircle className="text-white" size={40} />
          </div>
          <p className="text-black font-medium leading-tight text-sm xl:text-base">
            Exclusive Daily <br /> Flash Sales
          </p>
        </div>

        {/* Quality 4 */}
        <div className="absolute top-[63%] right-[calc(50%-490px)] xl:right-[calc(50%-530px)] text-center">
          <div className="w-[80px] h-[70px] xl:w-[85px] xl:h-[80px] mx-auto bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-3 shadow-md">
            <MdDiamond className="text-white" size={40} />
          </div>
          <p className="text-black font-medium leading-tight text-sm xl:text-base">
            Affordable <br /> Luxury
          </p>
        </div>
      </div>

      <div className="lg:hidden flex flex-col items-center text-center px-4 sm:px-6 py-10 sm:py-12 space-y-8 sm:space-y-10 bg-gradient-to-b  relative md:mt-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-rafgins mb-2 leading-snug">
          Why Shoppers Love Us &#63;
        </h1>

        <div className="w-[220px]  sm:w-[260px] md:w-[300px] h-[260px] sm:h-[320px] md:h-[350px] bg-gradient-to-b from-[#FF007B] to-[#250D20] rounded-lg overflow-hidden shadow-lg">
          <img
            src="/Images/model.webp"
            alt="model"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 mt-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-2 shadow-md">
              <img src="/icons/Vector.svg" className="h-8 sm:h-10" />
            </div>
            <p className="text-black font-medium text-xs sm:text-sm md:text-base leading-tight">
              Premium Quality <br /> Ingredients
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-2 shadow-md">
              <img src="/icons/Vector (1).svg" className="h-8 sm:h-10" />
            </div>
            <p className="text-black font-medium text-xs sm:text-sm md:text-base leading-tight">
              Trend-Driven <br /> Collections
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-2 shadow-md">
              <AiFillClockCircle className="text-white" size={32} />
            </div>
            <p className="text-black font-medium text-xs sm:text-sm md:text-base leading-tight">
              Exclusive Daily <br /> Flash Sales
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-b from-[#280F22] to-[#8E347A] rounded-lg flex justify-center items-center mb-2 shadow-md">
              <MdDiamond className="text-white" size={32} />
            </div>
            <p className="text-black font-medium text-xs sm:text-sm md:text-base leading-tight">
              Affordable <br /> Luxury
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qualities;
