import React, { useState, useEffect } from "react";
import { useGetUserSaleQuery } from "../redux/api/UserApi/userApi";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-hot-toast";

const SaleTiming = () => {
  const { data: saleData, isLoading } = useGetUserSaleQuery();
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const parseDateTime = (input) => {
    if (!input) return null;

    const d = new Date(input);
    if (!isNaN(d.getTime())) return d;

    const today = new Date();
    const [h, m] = input.split(":").map(Number);

    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      h,
      m,
      0
    );
  };

  const handleNavigate = (sale) => {
    const token = localStorage.getItem("beauty_token");
    if (!token) {
      toast.error("Please login to Continue");
      return;
    }

    navigate("/products", { state: { showSale: true, saleId: sale._id } });
    window.scrollTo(0, 0);
  };

  const formatTimeOnly = (d) => {
    if (!(d instanceof Date) || isNaN(d.getTime())) return "--:--";

    return d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl p-6 animate-pulse">
          <div className="h-64 bg-gray-300 rounded-xl mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const activeSales =
    saleData?.data?.filter((sale) => sale.flash_saleActive) || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="relative w-full md:min-h-screen min-h-svh flex items-center justify-center cursor-pointer md:mt-0 -mt-14">
      {/* Background */}
      <img
        src="/Images/bgImage.webp"
        alt="background"
        className="absolute w-full h-full object-cover"
      />

      {/* Petals */}
      <img
        src="/Images/Petal2.webp"
        className="absolute top-8 left-10 h-16 sm:h-24 opacity-80"
        alt=""
      />
      <img
        src="/Images/Petal2.webp"
        className="absolute bottom-10 right-10 h-16 sm:h-24 opacity-80 rotate-180"
        alt=""
      />

      {/* ================= CONTENT ================= */}
      {activeSales.length === 0 ? (
        /* ---- NO SALE (UI SAME) ---- */
        <div className="relative z-20 text-white md:text-3xl text-2xl">
          No Sale Available
        </div>
      ) : (
        /* ---- SLIDER ---- */
        <Slider {...settings} className="w-full px-4 sm:px-10 relative z-20">
          {activeSales.map((sale, index) => {
            const start = parseDateTime(sale.flash_sale_start_time);
            const end = parseDateTime(sale.flash_sale_end_time);
            const saleNotStarted = now < start;
            const saleActive = now >= start && now < end;

            return (
              <div key={index}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-32 min-h-[80vh] py-10">
                  {/* Image */}
                  <img
                    src={sale.flash_sale_image}
                    alt={sale.flash_sale}
                    className="w-full max-w-sm object-contain rounded-xl h-[240px] md:h-[440px]"
                  />

                  {/* Text */}
                  <div className="text-center md:text-left text-white max-w-xl flex flex-col gap-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-rafgins bg-gradient-to-r from-[#E4C38D] via-[#D99D41] to-[#E0CCA5] text-transparent bg-clip-text">
                      {sale.flash_sale}
                    </h1>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(sale);
                      }}
                      className="bg-gradient-to-r from-[#E4C38D] via-[#D99D41] to-white text-black px-12 py-3 rounded-full text-lg"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default SaleTiming;
