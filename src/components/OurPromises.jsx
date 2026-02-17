import React from "react";
import flower from "/Images/flower1.webp";
import bear from "/icons/Vector (2).svg";
import heart from "/icons/Vector (4).svg";
import current from "/icons/Frame 120.svg";
import diamond from "/icons/Vector (3).svg";

const OurPromises = () => {
  return (
    <div
      className="relative w-full py-20 flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url("/Images/styleImg.png"), url("/Images/styleImg.png")`,
        backgroundPosition: "left center, right center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "35%, 50%",
      }}
    >
      {/* Decorative flower on side */}
      <img
        src={flower}
        alt="Flower"
        className="absolute top-[300px] left-0 w-80 hidden md:block"
      />

      {/* Desktop Layout */}
      <div className="relative hidden md:block">
        <img
          src="/Images/Flower_Circle_Decoration.webp"
          alt="Flower Circle"
          className="  w-[400px] h-[400px] md:w-[800px] md:h-[600px] object-contain"
        />

        <div className="absolute  top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <h2 className="text-5xl font-rafgins mb-2 text-[#23111F]">
            Our Promise
          </h2>
          <p className="text-lg  text-[#8E347A] font-outfit">
            We go beyond beauty to bring you
            <br /> trust, quality, and care in every
            <br />
            product.
          </p>
        </div>

        {/* Top-left */}
        <div className="absolute top-32 -left-10 transform -translate-x-1/2 -translate-y-1/2 text-left">
          <div className="flex items-center space-x-6">
            <div>
              <h3 className=" text-gray-900 text-xl xl:text-2xl font-outfit">
                Cruelty Free & Ethical
              </h3>
              <p className="text-md xl:text-xl text-gray-600 text-right font-outfit">
                Because beauty should
                <br /> never come at the cost
                <br /> of kindness.
              </p>
            </div>
            <div className="relative w-fit">
              <div className="absolute bg-[#FF0099] rounded-full p-[39px]" />
              <div className="relative bg-pink-200 rounded-full p-5 z-10 shadow-lg">
                <img src={bear} alt="bear icon" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-left */}
        <div className="absolute bottom-36 -left-[30px] transform -translate-x-1/2 translate-y-1/2 text-left">
          <div className="flex items-center space-x-6">
            <div>
              <h3 className=" text-gray-900 text-xl xl:text-2xl text-right font-outfit">
                Exclusive Deals
              </h3>
              <p className="text-md xl:text-xl text-gray-600 text-right font-outfit">
                Daily time-limited offers
                <br /> to make beauty more
                <br /> affordable.
              </p>
            </div>
            <div className="relative w-fit">
              <div className="absolute bg-[#FF0099] rounded-full p-[39px]" />
              <div className="relative bg-pink-200 rounded-full p-5 z-10 shadow-lg">
                <img src={current} alt="current icon" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Top-right */}
        <div className="absolute top-32 right-0 transform translate-x-1/2 -translate-y-1/2 text-right">
          <div className="flex items-center justify-end space-x-6">
            <div className="relative w-fit">
              <div className="absolute bg-[#FF0099] rounded-full p-[39px]" />
              <div className="relative bg-pink-200 rounded-full p-5 z-10 shadow-lg">
                <img src={diamond} alt="diamond icon" className="w-8 h-8" />
              </div>
            </div>

            <div>
              <h3 className="text-left text-xl xl:text-2xl font-outfit">
                Premium Quality
              </h3>
              <p className="text-md xl:text-xl text-gray-600 text-left font-outfit">
                Only the finest, skin-friendly,
                <br /> and dermatologically tested
                <br />
                products.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-right */}
        <div className="absolute bottom-36 -right-[32px] transform translate-x-1/2 translate-y-1/2 text-right">
          <div className="flex items-center justify-end space-x-6">
            <div className="relative w-fit">
              <div className="absolute bg-[#FF0099] rounded-full p-[39px]" />
              <div className="relative bg-pink-200 rounded-full p-5 z-10 shadow-lg">
                <img src={heart} alt="heart icon" className="w-8 h-8" />
              </div>
            </div>

            <div>
              <h3 className="text-xl xl:text-2xl font-outfit">
                Trusted by Thousands
              </h3>
              <p className="text-md xl:text-xl text-gray-600 text-left font-outfit">
                A growing community of
                <br /> happy customers who love
                <br /> and trust us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col items-center gap-10 md:hidden w-full px-6 ">
        {/* Title */}
        <h2 className="text-4xl font-rafgins text-[#23111F] text-center">
          Our Promise
        </h2>
        <p className="text-base text-[#8E347A] font-outfit text-center">
          We go beyond beauty to bring you trust, quality, and care in every
          product.
        </p>

        {/* Top two boxes */}
        <div className="flex flex-col gap-6 w-full">
          <PromiseBox
            icon={bear}
            title="Cruelty Free & Ethical"
            desc="Because beauty should never come at the cost of kindness."
          />
          <PromiseBox
            icon={current}
            title="Exclusive Deals"
            desc="Daily time-limited offers to make beauty more affordable."
          />
        </div>

        {/* Center Image */}
        {/* <img
          src="/Images/Flower_Circle_Decoration.webp"
          alt="Flower Circle"
          className="w-[280px] h-[280px] object-contain"
        /> */}

        {/* Bottom two boxes */}
        <div className="flex flex-col gap-6 w-full">
          <PromiseBox
            icon={diamond}
            title="Premium Quality"
            desc="Only the finest, skin-friendly, and dermatologically tested products."
          />
          <PromiseBox
            icon={heart}
            title="Trusted by Thousands"
            desc="A growing community of happy customers who love and trust us."
          />
        </div>
      </div>
    </div>
  );
};

// Small reusable box for mobile
const PromiseBox = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 bg-pink-50 rounded-2xl p-4 shadow-sm">
    <div className="relative w-14 h-14 flex items-center justify-center">
      <div className="absolute bg-[#FF0099] rounded-full w-12 h-12" />
      <div className="relative bg-pink-200 rounded-full p-3 z-10 shadow-md">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
    </div>
    <div>
      <h3 className="font-outfit text-lg text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 font-outfit">{desc}</p>
    </div>
  </div>
);

export default OurPromises;