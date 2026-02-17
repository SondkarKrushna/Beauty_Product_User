
import React, { useEffect, useState } from "react";
import { useGetUserSaleQuery } from "../redux/api/UserApi/userApi"; // backend se data fetch

const HeroSection = ({ onClickSale }) => {
  const { data: saleData } = useGetUserSaleQuery();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (saleData && saleData.data && saleData.data.length > 0) {
      // Reverse array aur last sale pick karo
      const reversed = [...saleData.data].reverse();
      const lastSale = reversed[0];

      if (lastSale?.flash_sale_end_date && lastSale?.flash_sale_end_time) {
        const endDateTime = new Date(
          `${lastSale.flash_sale_end_date}T${lastSale.flash_sale_end_time}`
        );

        const updateTimer = () => {
          const now = new Date();
          const diff = Math.max(0, Math.floor((endDateTime - now) / 1000));
          setTimeLeft(diff);
        };

        updateTimer(); // initialize immediately
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [saleData]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ":" : ""}${h > 0 ? String(m).padStart(2, "0") : m}:${String(
      s
    ).padStart(2, "0")}`;
  };

  return (
    <div
      className="relative rounded-b-3xl overflow-hidden bg-cover bg-center min-h-[600px] md:min-h-[620px] max-h-[620px]"
      style={{ backgroundImage: `url(/Images/brushes.webp)` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#23111FC2]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-start justify-between gap-8 h-full">
        {/* Left Image */}
        <div className="w-full md:block hidden md:w-2/4 flex justify-center md:justify-start items-end">
          <img
            src="/Images/model.webp"
            alt="Skincare Product"
            className="rounded-xl w-[200px] md:mt-36 md:w-[680px] max-h-[600px] h-auto object-contain"
          />
        </div>

        {/* Center Promo */}
        <div className="w-full mt-20 md:w-1/3 md:mt-24 text-center text-white flex flex-col items-center justify-center gap-4">
          <img
            src="/Images/flower4.webp"
            alt="Sonal Cosmetics"
            className="w-20 md:block hidden sm:w-28 md:w-36 mb-2"
          />
          <div className="text-lg md:text-xl font-medium">Hurry Up !! Sale Ends In</div>
          <div className="text-3xl md:text-4xl font-bold">
            {timeLeft > 0 ? formatTime(timeLeft) : "Sale Ended"}
          </div>
          <button
            onClick={onClickSale}
            className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
          >
            Shop Now
          </button>
          <div className="text-4xl md:text-5xl font-extrabold mt-4">50% Off</div>
          <div className="text-lg md:text-xl mt-1">On skin & makeup Products</div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-2/4 flex justify-center md:justify-end items-end">
          <img
            src="/Images/modelWithLipstick.webp"
            alt="Makeup Product"
            className="rounded-xl w-[180px] md:mt-36 md:w-[680px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
