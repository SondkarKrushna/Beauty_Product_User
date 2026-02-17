import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetAllUserProductsQuery } from "../redux/api/UserApi/userApi";

const BestestProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllUserProductsQuery({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data?.success && Array.isArray(data.data)) {
      const allProducts = data.data.flatMap((cat) =>
        cat.product_array.map((p) => ({
          id: p._id,
          name: p.product_name,
          image: p.product_images?.[0],
          price: p.price_online,
        }))
      );
      setProducts(allProducts);
    }
  }, [data]);

  return (
    <div className="relative overflow-hidden w-full flex flex-col bg-white mt-20 md:mt-0">
      {/* Background Section */}
      <div className="flex flex-col md:flex-row w-full">
        <img
          src={"/Images/styleImg.webp"}
          alt=""
          className="h-[300px] sm:h-[400px] md:h-[700px] w-full md:w-1/2 object-cover"
        />
        <img
          src={"/Images/styleImg.webp"}
          alt=""
          className="hidden md:block h-[700px] w-1/2 object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 w-full px-4 sm:px-10 md:px-16 -mt-72 md:-mt-[600px]">
        {/* Title + Button */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 sm:gap-6 z-10">
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <h1 className="text-lg sm:text-3xl md:text-5xl text-[#280F22] font-rafgins leading-snug mb-4 md:mb-0">
              See Our Bestest Products With Best Price
            </h1>
            <button
              onClick={() =>
                navigate("/products", { state: { fromCategory: true } })
              }
              className="flex items-center justify-center gap-2 text-sm sm:text-lg md:text-xl font-medium transition-transform mt-2 md:mt-0"
            >
              Browse All <FaArrowRight size={16} className="sm:size-5" />
            </button>
            <img
              src={"/Images/Petal1.webp"}
              alt="petal"
              className="hidden md:block absolute -bottom-10 left-[700px] h-32"
            />
          </div>
        </div>

        {/* Text + Products */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 z-10">
          {/* Left Text */}
          <div className="relative w-full md:w-[35%] flex justify-center md:justify-start">
            <p className="text-[#92519A] text-sm sm:text-xl font-normal leading-relaxed z-10 relative text-center md:text-left">
              From Everyday Essentials To Luxury Beauty Must-Haves, Explore Our
              Wide Collection Of Makeup, Skincare, Haircare, And More. Each
              Product Is Carefully Chosen To Bring You Quality, Style, And Value
              All At Prices That Fit Your Budget. Discover Beauty That Inspires
              Confidence And Makes Every Day Your Best Look.
            </p>
            <img
              src={"/Images/flower2.webp"}
              className="hidden md:block h-96 rotate-180 absolute -bottom-64 -left-36 z-0"
              alt="flower"
            />
          </div>

          {/* Product Cards */}
          <div className="flex w-full md:w-[65%] overflow-x-auto scrollbar-hide gap-4 sm:gap-8 px-2 sm:px-4">
            {/* 🔥 SKELETON */}
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 rounded-xl flex-shrink-0 animate-pulse"
                  style={{
                    width: "220px",
                    minWidth: "180px",
                    maxWidth: "300px",
                  }}
                >
                  <div className="w-full h-[180px] sm:h-[240px] bg-gray-300 rounded-lg"></div>
                  <div className="h-4 bg-gray-300 rounded mt-4 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2 w-1/3 mx-auto"></div>
                </div>
              ))}

            {/* ✅ REAL DATA */}
            {!isLoading && products.length > 0 &&
              products.map((product) => (
                <div
                  key={product.id}
                  onClick={() =>
                    navigate(`/product/description/${product.id}`)
                  }
                  className="p-3 sm:p-4 rounded-xl text-center flex-shrink-0 hover:scale-105 transition-transform backdrop-blur-md"
                  style={{
                    width: "220px",
                    minWidth: "180px",
                    maxWidth: "300px",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[180px] sm:h-[240px] object-contain mx-auto"
                  />
                  <h2
                    className="text-sm sm:text-lg font-semibold text-black font-outfit mt-2 truncate w-full"
                    title={product.name}
                  >
                    {product.name}
                  </h2>

                  <p className="text-sm sm:text-base text-black font-bold font-outfit">
                    ₹{product.price}
                  </p>
                </div>
              ))}

            {/* ❌ NO DATA */}
            {!isLoading && products.length === 0 && (
              <p className="text-gray-600">No products available</p>
            )}

            {/* ❌ ERROR */}
            {isError && (
              <p className="text-red-500">Failed to load products</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestestProducts;
