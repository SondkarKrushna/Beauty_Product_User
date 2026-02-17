import React from "react";

const ContactHeroPage = () => {
  return (
    <div className="relative w-full md:min-h-screen bg-gradient-to-r from-[#8E347A] to-[#23111F] text-black overflow-hidden pt-10 sm:pt-28 md:pt-32">
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-20 py-16 md:py-20 relative">
        
       
        <h1 className="text-5xl sm:text-7xl md:text-6xl lg:text-6xl xl:text-8xl font-rafgins font-bold leading-snug sm:leading-relaxed md:leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-[#E4C38D] via-[#C7A161] to-[#F9F7EA] max-w-[95%] sm:max-w-4xl md:max-w-6xl flex flex-col gap-6 sm:gap-8 md:gap-10 items-center tracking-[0.03em] sm:tracking-[0.08em]">
          
          <span className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 whitespace-nowrap">
            BEAUTY
            <img
              src="/Images/Rectangle 33.webp"
              alt="Eye Cream"
              className="w-10 h-12 sm:w-14 sm:h-16 md:w-20 md:h-24 rounded-full shadow-lg object-cover"
            />
            BEGINS THE
          </span>

     
          <span className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 whitespace-nowrap">
            MOMENT YOU
            <img
              src="/Images/foundation.webp"
              alt="Foundation"
              className="w-10 h-12 sm:w-14 sm:h-16 md:w-20 md:h-24 rounded-full shadow-lg object-cover"
            />
            DECIDE
          </span>

     
          <span className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 whitespace-nowrap">
            <img
              src="/Images/lipstick.webp"
              alt="Lipstick"
              className="w-10 h-12 sm:w-14 sm:h-16 md:w-20 md:h-24 rounded-full shadow-lg object-cover"
            />
            TO REACH OUT
          </span>
        </h1>

    
        <img
          src="/Images/flower4.webp"
          alt="Flower"
          className="absolute bottom-4 sm:bottom-8 md:bottom-12 right-10 sm:right-20 md:right-4 w-20 sm:w-28 md:w-40 lg:w-56"
        />
        <img
          src="/Images/flower4.webp"
          alt="Flower"
          className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 w-20 sm:w-28 md:w-44"
        />
        <img
          src="/Images/Petal1.webp"
          alt="Petal"
          className="absolute top-16 sm:top-0 left-6 sm:left-12 md:left-4 w-16 sm:w-20 md:w-28"
        />
        <img
          src="/Images/Petal2.webp"
          alt="Petal"
          className="absolute -top-6 sm:-top-10 md:-top-12 right-10 sm:right-40 md:right-60 w-16 sm:w-20 md:w-24 lg:w-28"
        />
      </div>
    </div>
  );
};

export default ContactHeroPage;