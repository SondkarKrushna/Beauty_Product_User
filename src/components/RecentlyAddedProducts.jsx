import React, { useState, useEffect } from "react";
import { useGetAllUserProductsQuery } from "../redux/api/UserApi/userApi";
import { useNavigate } from "react-router-dom";

const RecentlyAddedProducts = () => {
  const { data: productData, isLoading } = useGetAllUserProductsQuery();
  const navigate = useNavigate();

  const categories = productData?.data || [];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].product_catagory);
    }
  }, [categories, selectedCategory]);

  const selectedProducts =
    categories.find((cat) => cat.product_catagory === selectedCategory)
      ?.product_array || [];

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
    if (showAll) {
      window.scrollBy({ top: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py- relative w-full">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
          <img
            src="/Images/flower4.webp"
            className="h-12 md:h-36"
            alt="flower"
          />
          <h1 className="text-2xl sm:text-3xl md:text-5xl text-[#280F22] font-rafgins mb-2 sm:mb-4">
            Recently Added
          </h1>
          <img
            src="/Images/flower4.webp"
            className="h-12 sm:h-28 md:h-36"
            alt="flower"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center md:justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide whitespace-nowrap px-2 sm:px-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedCategory(cat.product_catagory);
                setShowAll(false);
              }}
              className={`inline-block px-5 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === cat.product_catagory
                  ? "bg-[#FF0089] text-white"
                  : "text-black hover:text-[#FF0089] border border-gray-300"
              }`}
            >
              {cat.product_catagory}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          justify-items-center 
          px-2 sm:px-4 md:px-8 
          gap-4 sm:gap-6 md:gap-4
        "
      >
        {isLoading
          ? // 🔹 SKELETON PLACEHOLDER
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-2 sm:p-3 rounded-lg flex flex-col items-center animate-pulse"
              >
                <div className="h-40 sm:h-56 md:h-64 w-40 sm:w-56 md:w-64 bg-gray-300 rounded-lg mb-2"></div>
                <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
            ))
          : // 🔹 REAL PRODUCTS
          selectedProducts.length > 0
          ? (showAll ? selectedProducts : selectedProducts.slice(0, 5)).map(
              (product, index) => (
                <div
                  key={index}
                  className="p-2 sm:p-3 rounded-lg flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() =>
                    navigate(`/product/description/${product._id}`)
                  }
                >
                  <img
                    src={product.product_images?.[0]}
                    alt={product.product_name}
                    className="h-40 sm:h-56 md:h-64 w-40 sm:w-56 md:w-64 object-contain"
                  />
                  <div className="text-center mt-2 sm:mt-3">
                    <h2 className="text-sm sm:text-base md:text-lg font-medium">
                      {product.product_name}
                    </h2>
                    <p className="text-black font-bold text-sm sm:text-base">
                      ₹{product.price_online}
                    </p>
                  </div>
                </div>
              )
            )
          : // 🔹 NO PRODUCTS FOUND
            <p>No products found for this category.</p>}
      </div>

      {/* See All / Show Less Button */}
      {selectedProducts.length > 5 && (
        <div className="text-center mt-8">
          <button
            onClick={handleToggleShowAll}
            className="bg-[#FF0089] hover:bg-[#e00078] text-white font-medium px-6 py-2 rounded-full transition-all duration-300"
          >
            {showAll ? "Show Less" : "See All Products"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentlyAddedProducts;
