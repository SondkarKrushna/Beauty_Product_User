import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import OrderPlaced from "./OrderPlaced";
import Modal from "./Model";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  useGetUserProductByIdQuery,
  useLikeProductMutation,
  useGetUserProfileQuery,
  useAddToCartMutation,
  useGetCartQuery,
} from "../redux/api/UserApi/userApi";
import Loader from "./Loader";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

const ProductDescriptionCompo = () => {
  // ------------------- HOOKS -------------------
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isAddingToBag, setIsAddingToBag] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [addToBagError, setAddToBagError] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [mainImage, setMainImage] = useState("/Images/Rectangle 33.png"); // placeholder

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isFlashSale = location.state?.isFlashSale || false;
  const saleId = location.state?.saleId || null;

  const { data, isLoading, error, refetch } = useGetUserProductByIdQuery(id);
  const [likeProduct, { isLoading: isLiking }] = useLikeProductMutation();
  const { data: userProfile, refetch: refetchUserProfile } = useGetUserProfileQuery();
  const [addToCart] = useAddToCartMutation();
  const { refetch: refetchCart } = useGetCartQuery();


  console.log("PRoduct Data:", data);

  useEffect(() => {
    if (data?.data?.product_images?.length) {
      setMainImage(data.data.product_images[0]);
    }
  }, [data]);


  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const token = localStorage.getItem("beauty_token");

  const handleLikeProduct = async () => {
    if (!token) {
      toast.error("Please login to like the product!");
      return;
    }

    const newLikedState = !liked;
    setLiked(newLikedState);

    try {
      const res = await likeProduct({ productId: id }).unwrap();
      if (res.success) {
        toast.success(newLikedState ? "Added to wishlist " : "Removed from wishlist ");
        await refetchUserProfile();
      } else {
        setLiked(!newLikedState);
        toast.error("Something went wrong");
      }
    } catch (err) {
      setLiked(!newLikedState);
      toast.error("Failed to update wishlist");
    }
  };

  const handleAddToBag = async () => {
    if (!token) {
      toast.error("Please login to add product!");
      return;
    }

    setIsAddingToBag(true);
    setAddToBagError(null);

    try {
      const res = await addToCart({ productId: id, quantity }).unwrap();
      const success =
        res?.success === true ||
        res?.success === "true" ||
        res?.message?.includes("added") ||
        res?.status === 200;

      if (success) {
        setIsInCart(true);
        toast.success("Product added to cart ");
      } else {
        toast.error(res?.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error adding to bag");
    } finally {
      setIsAddingToBag(false);
    }
  };

  const handleBuyNow = async () => {
    if (!token) {
      toast.error("Please login to continue!");
      return;
    }

    setIsBuyingNow(true);
    setAddToBagError(null);

    try {
      const res = await addToCart({ productId: id, quantity }).unwrap();
      const success =
        res?.success === true ||
        res?.success === "true" ||
        res?.message?.includes("added") ||
        res?.status === 200;

      if (success) {
        await refetchCart();
        navigate("/user/cart", { replace: true });
      } else {
        toast.error(res?.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error adding product to cart");
    } finally {
      setIsBuyingNow(false);
    }
  };


  if (isLoading) {
    return (
      <p className="text-center mt-10">
        <Loader />
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Error loading product.</p>
    );
  }

  const productData = data?.data || {};


  return (
    <div key={id} className="bg-white min-h-screen md:mt-28 mt-20">
      {/* Breadcrumb */}
      <div className="bg-[#FFDFEE] py-5 px-4 sm:px-6 md:px-6 lg:px-16 text-lg text-black font-outfit ml-2 flex items-center gap-2">
        <FaArrowRight size={13} />
        <button className="cursor-pointer" onClick={() => navigate("/")}>Home</button>-
        <button className="cursor-pointer" onClick={() => navigate("/products")}> Products</button>-
        <span className="cursor-pointer"> Description</span>
      </div>


      <div className="flex flex-col md:flex-row gap-4 p-4 sm:p-6 md:p-12 ml-2 sm:ml-4 md:ml-4 mr-2 sm:mr-4 md:mr-4">
        {/* Left Side - Images */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-center">
            <RiArrowDropDownLine
              size={35}
              className="sm:transform sm:rotate-180 items-center"
            />

            {(productData?.product_images?.length
              ? productData.product_images
              : ["/Images/Rectangle 33.png", "/Images/Rectangle 33.png", "/Images/Rectangle 33.png"]
            )
              .slice(0, showAll ? 6 : 3)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={typeof img === "string" ? img : "/Images/Rectangle 33.png"}
                  alt="Thumbnail"
                  className="w-20 h-20 sm:w-36 sm:h-36 rounded-xl cursor-pointer hover:border-pink-500 object-cover"
                  onClick={() => setMainImage(img)}
                />
              ))}

            <button
              onClick={() => setShowAll(!showAll)}
              className="focus:outline-none"
            >
              <RiArrowDropDownLine
                size={35}
                className={`transition-transform duration-300 ${showAll ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </div>

          {/* Main Image */}
          <div
            className="flex justify-center items-center rounded-lg border border-gray-200 
                w-[320px] sm:w-[400px] md:w-[500px] 
                h-[350px] sm:h-[420px] md:h-[580px] overflow-hidden"
          >
            <img
              src={mainImage}
              alt={productData?.product_name || "Product"}
              className="w-full h-full object-cover p-2"
            />
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="flex-1 border rounded-lg border-[#F8B9CE] p-4 sm:p-4 md:p-4">
          <div className="flex flex-row sm:flex-row sm:items-center justify-between mb-2">
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-3 font-outfit">
              {productData?.product_name || "Product Name"}
            </h2>
            <button onClick={handleLikeProduct} disabled={isLiking}>
              {liked ? (
                <GoHeartFill className="text-pink-600" size={30} />
              ) : (
                <GoHeart className="text-pink-600" size={30} />
              )}
            </button>
          </div>



          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            {data?.source === "Sale" && data?.data?.discountType === "percentage" ? (
              (() => {
                const discountedPrice = Number(data?.data?.price_online) || 0;
                const discountValue = Number(data?.data?.discountValue) || 0;
                const originalPrice = discountValue
                  ? (discountedPrice / (1 - discountValue / 100)).toFixed(0)
                  : discountedPrice;

                return (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    {/* Discounted Price */}
                    <span className="text-xl sm:text-2xl text-green-900 font-bold">
                      ₹{discountedPrice}
                    </span>

                    {/* Original Price Line-through */}
                    <span className="text-sm sm:text-lg text-gray-500 line-through">
                      ₹{originalPrice}
                    </span>

                    {/* Discount Label */}
                    <span className="text-sm text-pink-600 font-semibold">
                      ({discountValue}% OFF)
                    </span>
                  </div>
                );
              })()
            ) : (
              <p className="text-xl sm:text-2xl text-green-900 font-bold">
                ₹{data?.data?.price_online}
              </p>
            )}



          </div>

          <p className="text-sm sm:text-md text-[#7D7D86] font-semibold mb-4">
            Inclusive of taxes & charges
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
            {/* <div className="flex w-32 items-center border border-[#FF007B] rounded-full px-4 py-1">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 text-lg sm:text-xl font-bold text-gray-600"
              >
                -
              </button>
              <span className="px-3 py-1 text-lg sm:text-xl">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 text-lg sm:text-xl font-bold text-gray-600"
              >
                +
              </button>
            </div> */}

            <div className="relative group w-full sm:w-auto">
              <button
                onClick={handleAddToBag}
                disabled={isAddingToBag}
                className={`w-full sm:w-auto whitespace-nowrap ${isAddingToBag
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#8E347B] cursor-pointer"
                  } text-white px-10 sm:px-14 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold transition`}
              >
                {isAddingToBag ? <BeatLoader size={8} color="#fff" /> : "Add To Bag"}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={isBuyingNow}
              className={`w-full sm:w-auto ${isBuyingNow
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#8E347B] cursor-pointer"
                } text-white px-10 sm:px-14 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold whitespace-nowrap`}
            >
              {isBuyingNow ? <BeatLoader size={8} color="#fff" /> : "Buy Now"}
            </button>
          </div>

          {addToBagError && (
            <div className="text-red-500 mb-3">{addToBagError}</div>
          )}

          <div
            className="space-y-4 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: "280px" }}
          >
            <div className="border border-[#C5C5CA4D] p-4 rounded-md">
              <h3 className="text-lg font-bold text-gray-700 border-b border-[#FF007B29] py-2 font-outfit">
                Product Highlights
              </h3>
              <p className="mt-2 text-lg text-black font-outfit">
                {productData?.product_Highlight || "No highlights available"}
              </p>
            </div>

            <div className="border border-[#C5C5CA4D] p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-700 border-b border-[#FF007B29] py-2 font-outfit">
                Description
              </h3>
              <p className="mt-2 text-lg text-black font-outfit">
                {productData?.product_description || "No description available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <OrderPlaced />
        </Modal>
      )}
    </div>
  );
};

export default ProductDescriptionCompo;
