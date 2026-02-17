import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import {
  useGetUserProfileQuery,
  useLikeProductMutation,
  useAddToCartMutation,
} from "../redux/api/UserApi/userApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WishlistProducts = () => {
  const { data: userProfile, isLoading, refetch } = useGetUserProfileQuery();
  const [likeProduct] = useLikeProductMutation();
  const [addToCart] = useAddToCartMutation();
  const [localWishlist, setLocalWishlist] = useState([]);
  const [addingId, setAddingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile?.likedBy) {
      setLocalWishlist(userProfile.likedBy);
    }
  }, [userProfile]);

  const handleLikeToggle = async (productId) => {
    try {
      await likeProduct({ productId }).unwrap();

      setLocalWishlist((prev) =>
        prev.some((p) => p._id === productId)
          ? prev.filter((p) => p._id !== productId)
          : [...prev, { _id: productId }]
      );

      toast.success("Product removed from Wishlist successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update wishlist");
      refetch();
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingId(productId);
      await addToCart({ productId, quantity: 1 }).unwrap();
      toast.success("Added to cart");
      refetch();
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setAddingId(null);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/product/description/${id}`);
  };

  return (
    <div className="md:p-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-44 p-4 sm:p-6 rounded-2xl bg-[#FFDFEE5E]">

        {/* ✅ Skeleton Loader */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white flex flex-col items-center p-3 sm:p-4 rounded-xl shadow-sm"
            >
              <Skeleton height={110} width={110} />

              <Skeleton height={15} width={"80%"} className="mt-2" />
              <Skeleton height={12} width={"60%"} />

              <div className="flex justify-center gap-2 mt-3 w-full">
                <Skeleton height={30} width={"20%"} />
                <Skeleton height={30} width={"60%"} />
              </div>
            </div>
          ))}

        {/* No Wishlist */}
        {!isLoading && (!userProfile || !localWishlist.length) && (
          <p className="text-center col-span-full py-8">
            No products in wishlist
          </p>
        )}

        {/* Wishlist Items */}
        {!isLoading &&
          localWishlist.map((product) => (
            <div
              key={product._id}
              onClick={() => handleNavigate(product._id)}
              className="bg-white flex flex-col items-center justify-between cursor-pointer md:w-52
                rounded-xl transform transition-all duration-300 
              hover:scale-105 hover:-translate-y-2 hover:shadow-[0_8px_25px_rgba(255,0,123,0.25)]"
            >
              <img
                src={product.product_images?.[0] || "/Images/eyeCream.png"}
                alt={product.product_name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
              />

              <p className="text-center text-xs sm:text-sm font-outfit mt-1 sm:mt-2 whitespace-pre-line">
                {product.product_name}
              </p>

              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="font-semibold text-sm sm:text-base font-outfit">
                  ₹ {product.price_online}
                </span>
              </div>

              <div
                className="flex gap-2 sm:gap-4 border-t-[1px] border-[#FF007B] mt-2 sm:mt-3 w-full justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="text-[#FF007B]"
                  onClick={() => handleLikeToggle(product._id)}
                >
                  <Heart
                    size={26}
                    className={`transition-colors duration-300 ml-4 ${
                      localWishlist.some((p) => p._id === product._id)
                        ? "fill-[#FF007B]"
                        : "fill-gray-300 hover:fill-[#FF007B]"
                    }`}
                  />
                </button>

                <button
                  className="w-full bg-[#8E347B] text-white text-[10px] sm:text-sm md:text-lg py-2 sm:py-3 px-3 font-outfit whitespace-nowrap text-center hover:bg-[#FF007B] transition-all duration-300"
                  onClick={() => handleAddToCart(product._id)}
                  disabled={addingId === product._id}
                >
                  {addingId === product._id ? "Adding..." : "Add To Bag"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WishlistProducts;
