import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import {
  useGetRecommendationQuery,
  useLikeProductMutation,
  useGetUserProfileQuery,
  useAddToCartMutation,
} from "../redux/api/UserApi/userApi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

const ProductSuggestions = ({ setGlobalModal }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const { data, isLoading, isError } = useGetRecommendationQuery();
  const [likeProduct] = useLikeProductMutation();
  const { data: userProfile, refetch: refetchUserProfile } =
    useGetUserProfileQuery();
  const navigate = useNavigate();
  const token = localStorage.getItem("beauty_token");

  useEffect(() => {
    if (userProfile?.wishlist) {
      setLikedProducts(userProfile.wishlist.map((item) => item._id));
    }
  }, [userProfile]);

  const toggleLike = async (productId) => {
    if (!token) {
      toast.error("Please login to add product in wishlist");
      setGlobalModal("signin");
      return;
    }

    const isLiked = likedProducts.includes(productId);

    // Optimistic UI update
    setLikedProducts((prev) =>
      isLiked ? prev.filter((id) => id !== productId) : [...prev, productId]
    );

    try {
      await likeProduct({ productId }).unwrap();
      toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist");
      refetchUserProfile();
    } catch (err) {
      // Revert state in case of failure
      setLikedProducts((prev) =>
        isLiked ? [...prev, productId] : prev.filter((id) => id !== productId)
      );
      toast.error("Something went wrong!");
    }
  };
  const products =
    data?.data
      ?.map((category) => category?.product_array || [])
      .flat()
      .filter((p) => p && p._id) || [];

  return (
    <div className="relative bg-[#FFDFEE] py-8 px-4 sm:px-6 md:px-10 rounded-lg my-10 mx-4 sm:mx-8 md:mx-16">
      <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 text-start font-outfit">
        You May Also Like
      </h2>

      <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-white flex flex-col items-center text-center p-3 rounded-lg shadow-sm min-w-[160px] sm:min-w-[200px] md:min-w-[240px]"
              >
                <Skeleton width={140} height={120} />
                <Skeleton width={100} height={20} className="mt-2" />
                <Skeleton width={80} height={18} className="mt-1" />
                <Skeleton width={100} height={30} className="mt-3" />
              </div>
            ))}

        {isError && <p className="text-red-500">Something went wrong!</p>}

        {!isLoading &&
          !isError &&
          products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg flex flex-col items-center text-center shadow-md hover:shadow-lg transition duration-300 cursor-pointer p-3 sm:p-4 min-w-[160px] sm:min-w-[200px] md:min-w-[270px]"
              onClick={() => navigate(`/product/description/${item._id}`)}
            >
              <div className="relative w-full flex justify-center">
                <img
                  src={item?.product_images?.[0] ?? "/placeholder.png"}
                  alt={item?.product_name || "Product"}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                  className="w-[120px] h-[100px] sm:w-[160px] sm:h-[140px] md:w-[200px] md:h-[160px] object-contain rounded-md"
                />

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item._id);
                  }}
                  className="absolute  -top-2 -right-2 cursor-pointer z-10"
                >
                  {likedProducts.includes(item._id) ? (
                    <FaHeart
                      size={24}
                      className="text-red-500 transition-all"
                    />
                  ) : (
                    <Heart
                      size={24}
                      className="text-[#FF007B] transition-all"
                    />
                  )}
                </div>
              </div>

              <h3 className="text-xs sm:text-sm md:text-base font-medium mb-2 font-outfit mt-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">
                {item.product_name}
              </h3>

              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">
                <span className="text-black font-semibold font-outfit">
                  ₹{item.price_online}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;
