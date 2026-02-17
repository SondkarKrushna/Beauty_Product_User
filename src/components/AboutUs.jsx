import React from "react";

const AboutUs = () => {
  return (
    <div
      className="relative w-full overflow-hidden
        h-[580px] md:h-[700px]
        bg-gradient-to-r from-[#2a0339] via-[#5b0a57] to-[#3a083f]
        lg:rounded-b-[50px] px-4 sm:px-6"
    >
      {/* Petals */}
      <img
        src="/Images/Petal1.webp"
        alt="petal1"
        className="absolute top-2 right-[10%] w-10 animate-fadeIn"
      />
      <img
        src="/Images/Petal2.webp"
        alt="petal2"
        className="absolute bottom-2 right-2 w-14 animate-fadeIn"
      />

      {/* Main section */}
      <div className="relative h-full w-full flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Image */}
        <div className="relative mt-10 md:mt-52 w-full flex justify-center items-center">
          <img
            src="/Images/Group 50.png"
            alt="Cosmetic"
            className="w-full h-full"
          />
        </div>

        {/* Right Text Side */}
        <div className="text-white w-full md:w-[70%] text-center md:text-left mt-20 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-rafgins leading-tight bg-gradient-to-r from-[#E4C38D] via-[#C7A161] to-[#F9F7EA] bg-clip-text text-transparent">
            Affordable luxury,<br />
            Ethical choices, timeless<br />
            Beauty
          </h1>

          <p className="text-sm sm:text-base md:text-xl leading-tight text-[#F9CCE1] mt-4 font-outfit">
            We believe beauty is more than just makeup – <br />
            it’s confidence, self-expression, and care. Our<br />
            mission is to make premium-quality beauty and<br />
            skincare products accessible to everyone,<br />
            blending luxury with affordability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;