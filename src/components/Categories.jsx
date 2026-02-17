import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Check, Heart } from "lucide-react";
import {
  useGetAllUserProductsQuery,
  useGetUserSaleQuery,
  useAddToCartMutation,
  useLikeProductMutation,
  useGetCartQuery,
  useGetUserProfileQuery,
} from "../redux/api/UserApi/userApi";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const getAllProductsFromData = (data) => {
  if (!data?.data || !Array.isArray(data.data)) return [];
  return data.data.flatMap((category) =>
    Array.isArray(category.product_array)
      ? category.product_array.map((p) => ({
          ...p,
          parent_category_id: category._id,
        }))
      : []
  );
};

// const getAllDiscountRanges = () => [
//   "0% - 10%",
//   "10% - 20%",
//   "20% - 30%",
//   "30% - 50%",
// ];

const Categories = ({ showSale, setShowSale, scrollToCategoryId  }) => {
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState("Discount");
  const [openFilter, setOpenFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [discountFilter, setDiscountFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [dataToMap, setDataToMap] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loadingItems, setLoadingItems] = useState({});
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [likedProducts, setLikedProducts] = useState({});
  const [addedToBag, setAddedToBag] = useState({});

  const location = useLocation();
  const flashSaleRef = useRef(null);

  const {
    data: userProduct,
    error,
    isLoading,
    refetch,
  } = useGetAllUserProductsQuery();
  const [likedProductsApi] = useLikeProductMutation();
  const { data: userSaleData } = useGetUserSaleQuery();
  // console.log("User Sale Data:", userSaleData);
  const [addToCartApi] = useAddToCartMutation();
  const { data: cartProduct, refetch: refetchCart } = useGetCartQuery();
  const { data: userProfile, refetch: refetchUserProfile } =
    useGetUserProfileQuery();

  console.log("Cart Data:", cartProduct);
  const categoryRefs = useRef({});


  useEffect(() => {
    if (userProfile?.likedBy && Array.isArray(userProfile.likedBy)) {
      const wishlistMap = {};
      userProfile.likedBy.forEach((p) => {
        wishlistMap[p._id] = true;
      });
      setLikedProducts(wishlistMap);
      console.log("Liked Products:", wishlistMap);
    }
  }, [userProfile]);

   useEffect(() => {
    if (scrollToCategoryId) {
      setCategoryFilter([scrollToCategoryId]);
      setShowAllCategories(true); // make sure category is visible
    }
  }, [scrollToCategoryId]);

  useEffect(() => {
    if (showSale && flashSaleRef.current) {
      flashSaleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      flashSaleRef.current.style.transition = "background 0.5s";
      flashSaleRef.current.style.background = "#FFF4E5";
      setTimeout(() => {
        flashSaleRef.current.style.background = "transparent";
      }, 1500);
    }
  }, [showSale]);

  useEffect(() => {
    if (location.state?.showSale) {
      setShowSale(true);
    }
  }, [location.state, setShowSale]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSkeleton(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (location.state?.categoryId) {
      setCategoryFilter([String(location.state.categoryId)]);
      setShowAllCategories(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (userProduct && Array.isArray(userProduct.data)) {
      setDataToMap(userProduct.data);
    }
  }, [userProduct]);

  const allProducts = useMemo(() => {
    if (showSale && userSaleData && Array.isArray(userSaleData.data)) {
      const saleId = location.state?.saleId;
      const flashProducts = userSaleData.data.flatMap((sale) => {
        if (!sale.flash_saleActive || !Array.isArray(sale.flash_sale_products))
          return [];
        if (saleId && sale._id !== saleId) return [];
        return sale.flash_sale_products.map((prod) => ({
          ...prod,
          isFlashSale: true,
          parent_sale_id: sale._id,
        }));
      });
      return flashProducts;
    }
    return getAllProductsFromData(userProduct || []);
  }, [userProduct, userSaleData, showSale, location.state?.saleId]);

  const handleLikeProduct = async (e, item) => {
    e.stopPropagation();

    // Optimistically toggle the heart
    setLikedProducts((prev) => ({
      ...prev,
      [item._id]: !prev[item._id], // Toggle like state
    }));

    try {
      await likedProductsApi({ productId: item._id }).unwrap(); // API call to update wishlist
      await refetchUserProfile(); // Refresh profile
      toast.success(
        !likedProducts[item._id] ? "Added to wishlist" : "Removed from wishlist"
      );
    } catch (err) {
      // If API fails, revert the heart state
      setLikedProducts((prev) => ({
        ...prev,
        [item._id]: !prev[item._id],
      }));
      toast.error("Login To Add To Wishlist");
    }
  };

  const isFlashSaleActive = useMemo(
    () => allProducts.some((p) => p.isFlashSale),
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];
    if (categoryFilter.length && !isFlashSaleActive) {
      filtered = filtered.filter((p) =>
        categoryFilter.includes(String(p.parent_category_id))
      );
    }
    if (discountFilter.length && !isFlashSaleActive) {
      filtered = filtered.filter((p) => {
        const mrp = Number(p.price_offline) || 0;
        const price = Number(p.price_online) || 0;
        if (!mrp || !price) return false;
        const disc = ((mrp - price) / mrp) * 100;
        return discountFilter.some((range) => {
          const [min, max] = range
            .replace("%", "")
            .split("-")
            .map((v) => Number(v.trim()));
          return disc >= min && disc < max;
        });
      });
    }
    if (
      (priceRange[0] !== 0 || priceRange[1] !== 10000) &&
      !isFlashSaleActive
    ) {
      // Only filter normal products based on price range
      filtered = filtered.filter((p) => {
        if (p.isFlashSale) return true; // flash sale products always stay
        const price = Number(p.price_online) || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }
    if (genderFilter.length && !isFlashSaleActive) {
      filtered = filtered.filter((p) => genderFilter.includes(p.gender));
    }
    switch (selectedSort) {
      case "Price - low to high":
        filtered = filtered.sort(
          (a, b) => Number(a.price_online || 0) - Number(b.price_online || 0)
        );
        break;
      case "Price - high to low":
        filtered = filtered.sort(
          (a, b) => Number(b.price_online || 0) - Number(a.price_online || 0)
        );
        break;
      case "Discount":
        filtered = filtered.sort((a, b) => {
          const getDisc = (item) =>
            ((Number(item.price_offline || 0) -
              Number(item.price_online || 0)) /
              Number(item.price_offline || 1)) *
            100;
          return getDisc(b) - getDisc(a);
        });
        break;
      default:
        break;
    }

    filtered = filtered.filter((p) => {
      if (p.isFlashSale) {
        return p.product_Quantity > 0 && p.product_availability;
      }
      return true; // normal products pe no restriction
    });

    return filtered;
  }, [
    allProducts,
    selectedSort,
    categoryFilter,
    // discountFilter,
    priceRange,
    genderFilter,
    isFlashSaleActive,
  ]);

  const handleCategorySelect = (catId) => {
    setCategoryFilter((prev) =>
      prev.includes(String(catId))
        ? prev.filter((id) => id !== String(catId))
        : [...prev, String(catId)]
    );
  };

  // const handleDiscountChange = (range) => {
  //   setDiscountFilter((prev) =>
  //     prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
  //   );
  // };

  const handleGenderChange = (gender) => {
    setGenderFilter((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, Number(e.target.value)]);
  };

  if (error)
    return (
      <p className="text-center text-lg text-red-500 py-10">
        Failed to load products.
      </p>
    );

  const filterOptions = {
    Price: (
      <div className="mt-3">
        {showSkeleton ? (
          <Skeleton height={40} width="100%" />
        ) : (
          <>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full accent-[#FF007B]"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>₹0</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </>
        )}
      </div>
    ),
    // Discount: (
    //   <ul className="space-y-2 mt-2">
    //     {showSkeleton
    //       ? Array(4)
    //           .fill(0)
    //           .map((_, idx) => <Skeleton key={idx} height={20} />)
    //       : getAllDiscountRanges().map((range) => (
    //           <li key={range} className="flex items-center gap-2">
    //             <input
    //               type="checkbox"
    //               id={range}
    //               className="accent-[#FF007B]"
    //               checked={discountFilter.includes(range)}
    //               onChange={() => handleDiscountChange(range)}
    //             />
    //             <label htmlFor={range} className="text-gray-700">
    //               {range}
    //             </label>
    //           </li>
    //         ))}
    //   </ul>
    // ),
    // Gender: (
    //   <ul className="space-y-2 mt-2">
    //     {showSkeleton
    //       ? Array(2)
    //           .fill(0)
    //           .map((_, idx) => <Skeleton key={idx} height={20} />)
    //       : ["Male", "Female"].map((gender) => (
    //           <li key={gender} className="flex items-center gap-2">
    //             <input
    //               type="checkbox"
    //               id={gender}
    //               className="accent-[#FF007B]"
    //               checked={genderFilter.includes(gender)}
    //               onChange={() => handleGenderChange(gender)}
    //             />
    //             <label htmlFor={gender} className="text-gray-700">
    //               {gender}
    //             </label>
    //           </li>
    //         ))}
    //   </ul>
    // ),
  };

  return (
    <div className="bg-white pb-10">
      {/* Title Section */}
      <div className="flex items-center justify-between px-6 md:px-16 md:mb-6">
        <h2
          ref={isFlashSaleActive && !showAllCategories ? flashSaleRef : null}
          className="text-2xl md:text-4xl font-rafgins text-gray-800 md:-mt-0 -mt-32"
        >
          {isFlashSaleActive && !showAllCategories
            ? "Flash Sale"
            : "Shop By Category"}
        </h2>

        {isFlashSaleActive && !showAllCategories && (
          <button
            onClick={() => {
              setShowAllCategories(true);
              setShowSale(false);
              refetch();
            }}
            className="bg-[#FF007B] text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition text-sm md:text-base"
          >
            All Products
          </button>
        )}
      </div>

      {/* Categories Section */}
      {(!isFlashSaleActive || showAllCategories) && (
        <div className="flex gap-4 overflow-x-auto px-6 md:px-12 pb-6 scrollbar-hide">
          {showSkeleton
            ? Array(4)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center rounded-3xl min-w-[180px] md:min-w-[250px] h-[220px] md:h-[300px] overflow-hidden bg-gray-200 animate-pulse"
                  />
                ))
            : dataToMap.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center rounded-3xl min-w-[180px] md:min-w-[250px] h-[220px] md:h-[300px] overflow-hidden bg-gradient-to-b from-[#FF91B51A] via-[#FF91B530] to-[#FF007B4D] cursor-pointer"
                  onClick={() => {
                    setCategoryFilter([String(item._id)]);
                    setShowAllCategories(true);
                  }}
                >
                  <img
                    src={
                      item.product_catagory_image ||
                      item.product_category_image ||
                      "/Images/eyeCream.png"
                    }
                    alt={item.product_catagory || item.product_category}
                    className="w-28 md:w-36 h-40 md:h-96 object-contain mx-auto"
                  />
                  <div className="bg-[#FF007B] md:mt-0 mt-8 w-32 md:w-40 py-2 md:py-3 text-center rounded-t-3xl">
                    <p className="text-white text-base md:text-xl font-medium">
                      {item.product_catagory || item.product_category}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      )}

      {/* Filters + Products Section */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 ">
        {!isFlashSaleActive && (
          <>
            <div className="hidden md:flex justify-between gap-4 px-2 mt-4"></div>
            {/* Mobile Filters — Two Dropdown Boxes Side by Side */}
            <div className="flex justify-between gap-3 px-6 mt-4 md:hidden">
              {/* Categories Dropdown */}
              {/* <div className="relative w-1/2">
                <button
                  onClick={() =>
                    setOpenFilter(
                      openFilter === "Categories" ? null : "Categories"
                    )
                  }
                  className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm font-semibold text-gray-800 shadow-sm"
                >
                  Categories
                  {openFilter === "Categories" ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {openFilter === "Categories" && (
                  <div className="absolute left-0 z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filterOptions?.Categories || (
                      <p className="text-sm text-gray-500 p-2">No categories</p>
                    )}
                  </div>
                )}
              </div> */}

              {/* Price Dropdown */}
              <div className="relative w-1/2">
                <button
                  onClick={() =>
                    setOpenFilter(openFilter === "Price" ? null : "Price")
                  }
                  className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm font-semibold text-gray-800 shadow-sm"
                >
                  Price
                  {openFilter === "Price" ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {openFilter === "Price" && (
                  <div className="absolute left-0 z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filterOptions?.Price || (
                      <p className="text-sm text-gray-500 p-2">
                        No price filters
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Filters */}
            <aside className="hidden md:block w-1/5">
              {/* Sort */}
              <div className="mb-6 border-[2px] rounded-xl p-4">
                <div className="border-b pb-2 mb-3 flex justify-between items-center font-outfit text-xl">
                  <h3>Sort By</h3>
                  {/* <h3 className="text-[#FF007B]">{selectedSort}</h3> */}
                </div>
                <ul className="space-y-4 text-md font-semibold">
                  {[
                    "Price - low to high",
                    "Price - high to low",
                    "Popularity",
                  ].map((option) => (
                    <li
                      key={option}
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setSelectedSort(option)}
                    >
                      <span>{option}</span>
                      <span
                        className={`w-5 h-5 flex items-center  justify-center rounded-full border ${
                          selectedSort === option
                            ? "bg-[#FF007B] border-[#FF007B]"
                            : "border-pink-300"
                        }`}
                      >
                        {selectedSort === option && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filters */}
              <div className="border-[2px] border-[#FF007B2B] rounded-xl font-outfit">
                {Object.keys(filterOptions).map((filter, idx) => (
                  <div
                    key={idx}
                    className="border-b border-[#FF007B2B] last:border-none"
                  >
                    <div
                      onClick={() =>
                        setOpenFilter(openFilter === filter ? null : filter)
                      }
                      className="p-4 flex items-center justify-between cursor-pointer"
                    >
                      <h3 className="text-lg">{filter}</h3>
                      {openFilter === filter ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    {openFilter === filter && (
                      <div className="px-4 pb-4">{filterOptions[filter]}</div>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </>
        )}

        {/* Products Grid */}
        <div className="w-full md:w-4/5 bg-white p-4 md:p-6 h-auto md:h-[65vh] overflow-y-auto scrollbar-hide grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 rounded-lg">
          {showSkeleton ? (
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-col items-center text-center shadow-sm rounded-lg p-4 animate-pulse"
                >
                  <div className="h-32 w-full bg-gray-300 mb-3 rounded-lg"></div>
                  <div className="h-4 w-24 bg-gray-300 mb-2 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 mb-2 rounded"></div>
                  <div className="h-8 w-full bg-gray-300 rounded mt-auto"></div>
                </div>
              ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full flex items-center justify-center text-gray-500 text-lg md:text-2xl py-10">
              {isFlashSaleActive && !showAllCategories
                ? "No products available in this sale."
                : "No products available."}
            </div>
          ) : (
            filteredProducts.map((item) => (
              <div
                key={item._id}
                // inside products.map
                onClick={() => {
                  if (item.isFlashSale) {
                    navigate(`/product/description/${item._id}`, {
                      state: {
                        isFlashSale: item.isFlashSale || false,
                      },
                    });
                  } else {
                    navigate(`/product/description/${item._id}`);
                  }
                }}
                className="bg-white md:h-[270px] flex flex-col items-center text-center shadow-md rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,0,123,0.25)]"
              >
                <img
                  src={item.product_images?.[0] || "/Images/eyeCream.png"}
                  alt={item.product_name}
                  className="h-36 md:h-38 object-contain mb-3"
                />
                <h3
                  className="text-sm md:text-lg font-medium mb-1 w-full text-center truncate whitespace-nowrap overflow-hidden"
                  title={
                    item.product_name ||
                    item.productName ||
                    item.title ||
                    item.name ||
                    "No Name"
                  }
                >
                  {item.product_name ||
                    item.productName ||
                    item.title ||
                    item.name ||
                    "No Name"}
                </h3>

                <div className="mb-2">
                  {item.isFlashSale ? (
                    <div className="flex flex-col items-center">
                      {/* Calculate original price from discount */}
                      {(() => {
                        const discount =
                          item.discountValue || item.discount_percentage || 0; // Use whichever field your backend provides
                        const originalPrice = discount
                          ? (
                              Number(item.price_online) /
                              (1 - discount / 100)
                            ).toFixed(0)
                          : item.price_offline || item.original_price;
                        return (
                          <>
                            {/* Discounted Price */}
                            <p className="text-black font-bold text-lg">
                              ₹ {item.price_online}
                            </p>
                            {/* Original Price Line Through */}
                            <p className="text-gray-500 text-sm line-through">
                              ₹ {originalPrice}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <p className="text-black font-semibold">
                      ₹ {item.price_online}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center w-full border-t border-[#FF007B]">
                  {/* Heart Icon */}

                  <Heart
                    onClick={(e) => handleLikeProduct(e, item)}
                    className={`w-6 h-6 ml-4 md:w-8 md:h-8 md:ml-4 cursor-pointer transition ${
                      likedProducts[item._id]
                        ? "fill-[#FF007B] text-[#FF007B]"
                        : "text-[#FF007B] hover:text-pink-600"
                    }`}
                  />

                  {/* Add To Bag / Go To Bag Button */}

                  <button
                    onClick={async (e) => {
                      e.stopPropagation();

                      const alreadyInCart =
                        cartProduct?.data?.some(
                          (p) =>
                            p.productId?._id === item._id ||
                            p.flashSaleProductId?._id === item._id
                        ) || addedToBag[item._id];

                      if (alreadyInCart) {
                        navigate("/user/cart");
                        return;
                      }

                      setLoadingItems((prev) => ({
                        ...prev,
                        [item._id]: true,
                      }));

                      try {
                        await addToCartApi(
                          item.isFlashSale
                            ? {
                                productId: item._id,
                                flashSaleProductId: item._id,
                                quantity: 1,
                              }
                            : {
                                productId: item._id,
                                quantity: 1,
                              }
                        ).unwrap();

                        toast.success("Product added to bag!");
                        setAddedToBag((prev) => ({
                          ...prev,
                          [item._id]: true,
                        }));
                        await refetchCart();
                      } catch (err) {
                        toast.error("Login to add product to bag");
                      } finally {
                        setLoadingItems((prev) => ({
                          ...prev,
                          [item._id]: false,
                        }));
                      }
                    }}
                    className="bg-[#8E347B] text-white py-2 md:py-3 transition text-sm md:text-xl ml-4 w-full"
                  >
                    {loadingItems[item._id]
                      ? "Adding..."
                      : cartProduct?.items?.some(
                          (p) => p.productId?._id === item._id
                        ) || addedToBag[item._id]
                      ? "Go To Bag"
                      : "Add To Bag"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
