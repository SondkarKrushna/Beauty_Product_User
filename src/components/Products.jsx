import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useGetAllUserProductsQuery } from "../redux/api/UserApi/userApi";

const Products = () => {
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
    <div
      className="relative w-full py-24 mt-10 overflow-visible"
      style={{
        backgroundImage: `url("/Images/styleImg.webp"),`,
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        backgroundPosition: "left top, center center, right bottom",
        backgroundSize: "500px, 500px, 400px",
      }}
    >
      {/* ===== DECORATIVE IMAGES (UNCHANGED) ===== */}
      <img
        src="/Images/flower1.webp"
        className="absolute top-[-120px] h-40 z-20 
          xl:top-[-100px] lg:h-64 md:h-80 md:top-[-60px] sm:h-36 sm:top-[-40px]"
        alt="flower"
      />

      <img
        src="/Images/flower2.webp"
        className="absolute top-[350px] right-0 h-40 z-20 
          md:h-72 md:top-[380px] sm:h-32 sm:top-[150px]"
        alt="flower"
      />

      <img
        src="/Images/foundation.webp"
        alt="foundation"
        className="absolute left-0 h-[550px] object-contain z-10 
          xl:h-[500px] lg:h-[400px] md:h-[250px] sm:h-[180px] opacity-50 hidden lg:block lg:opacity-100 mt-8"
      />

      <img
        src="/Images/lipstick.webp"
        alt="lipstick"
        className="absolute right-[2%] h-[420px] object-contain z-10 
          xl:h-[350px] lg:h-[300px] md:h-[220px] sm:h-[160px] opacity-50 lg:opacity-100 hidden lg:block"
      />

      <img
        src="/Images/lipstick2.webp"
        alt="floating lipstick"
        className="absolute top-[400px] right-[25%] h-48 z-10
           lg:right-[22%] md:right-[20%] sm:right-[15%] sm:h-36 opacity-50 lg:opacity-100 hidden lg:block"
      />

      {/* ===== TEXT SECTION (UNCHANGED) ===== */}
      <div className="relative z-30 max-w-2xl mx-auto text-center -mt-10 md:mt-10 px-4">
        <h2 className="text-3xl md:text-5xl md:leading-snug font-rafgins text-[#280F22] mb-4 sm:text-2xl">
          Beauty That Inspires, <br /> Deals That Excite
        </h2>
        <p className="text-[#7D7D86] md:leading-relaxed mb-6 font-outfit text-lg sm:text-sm md:text-xl">
          We bring you the finest beauty & makeup essentials,
          <br className="hidden" /> handpicked to match every style & skin
          type. With daily
          <br className="hidden" /> flash sales and exclusive collections,
          make looking
          <br className="hidden" /> gorgeous simple, affordable, and fun.
        </p>
        <button
          className="bg-gradient-to-r from-[#3F1543] via-[#704C80] to-[#370626] text-white px-12 py-3 rounded-full shadow-md hover:opacity-90 transition font-outfit sm:px-6 sm:text-sm md:text-xl"
          onClick={() => navigate("/about")}
        >
          Know More
        </button>
      </div>

      {/* ===== TOP PICKS SECTION ===== */}
      <div className="mt-32 sm:mt-40 md:mt-60 relative z-30 max-w-6xl mx-auto px-4">
        <h3 className="text-2xl md:text-5xl font-rafgins text-[#280F22] flex items-center justify-center gap-2 mb-4 sm:text-3xl">
          <span>💄</span> Top Picks for You
        </h3>
        <p className="text-[#7D7D86] font-outfit text-center text-xl mb-6 md:text-xl sm:text-base">
          Handpicked beauty & makeup must-haves you can’t resist.
        </p>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex md:gap-20 gap-10 md:mt-8 mt-8">
            {/* 🔥 SKELETON ONLY HERE */}
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[220px] md:w-[220px] animate-pulse"
                >
                  <div className="w-full h-[240px] bg-gray-300 rounded-lg"></div>
                </div>
              ))}

            {/* ✅ REAL PRODUCTS */}
            {!isLoading &&
              products.length > 0 &&
              products.map((product) => (
                <div
                  key={product.id}
                  onClick={() =>
                    navigate(`/product/description/${product.id}`)
                  }
                  className="flex-shrink-0 w-[220px] md:w-[220px] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[240px] md:h-[240px] object-cover rounded-lg"
                  />
                </div>
              ))}

            {/* ❌ NO DATA */}
            {!isLoading && !isError && products.length === 0 && (
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

export default Products;
