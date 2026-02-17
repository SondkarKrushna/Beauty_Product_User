import React, { useEffect, useState } from "react";
import {
  useGetCartQuery,
  useGetUserProfileQuery,
  useAddUserAddressMutation,
  useRemoveFromCartMutation,
} from "../redux/api/UserApi/userApi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Loader from "./Loader";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import ProductSuggestions from "./ProductSuggestions";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useVerifyPaymentMutation } from "../redux/api/paymentApi/payIntegration";
import { FaArrowRight } from "react-icons/fa";
import OrderPlaced from "./OrderPlaced";
import Modal from "./Model";
import { IoPricetag } from "react-icons/io5";
import { setCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const UserProductCart = () => {
  const dispatch = useDispatch();
  const {
    data: cartData,
    isLoading,
    isError,
    refetch: refetchCart,
  } = useGetCartQuery();
  const { data: profile, refetch } = useGetUserProfileQuery();
  const [address, setAddress] = useState();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalProductImages, setModalProductImages] = useState([]);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressInput, setAddressInput] = useState({
    Name: "",
    Number: "",
    City: "",
    homeOrFlat: "",
    areaOrLocality: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [addAddress] = useAddUserAddressMutation();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const [deletingIds, setDeletingIds] = useState([]);
  const [numberError, setNumberError] = useState("");
  const [verifyPayment] = useVerifyPaymentMutation();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [removeFromCart] = useRemoveFromCartMutation();
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  const [isOrderPlacedModalOpen, setIsOrderPlacedModalOpen] = useState(false);
  const { data: cartDataInfo } = useGetCartQuery();

  const [cartItemsState, setCartItemsState] = useState([]);

  // useEffect to populate cart
  useEffect(() => {
    if (cartData?.items) {
      const items = cartData.items.map((entry) => {
        const isFlash = entry.productType === "flash_sale";
        const product =
          (isFlash
            ? entry.flashSaleProduct?.flash_sale_products?.length
              ? entry.flashSaleProduct.flash_sale_products[
                  entry.flashSaleProduct.flash_sale_products.length - 1
                ]
              : entry.flashSaleProduct?.product || entry.flashSaleProduct
            : entry.product?.product_array?.[0] || entry.product) || {};

        return {
          ...product,
          quantity: entry.quantity,
          productArrayId: product._id,
          priceToShow: Number(product.price_online || 0),
        };
      });
      setCartItemsState(items);
    }
  }, [cartData]);

  // console.log(" Cart Data:", cartDataInfo);

  const increaseQty = (id) => {
    const item = cartItemsState.find((p) => p._id === id);
    if (!item) return;

    const currentQty = quantities[id] || item.quantity || 1;
    const stock = Number(item.product_Quantity || 0);

    if (currentQty >= stock) {
      toast.error(`Insufficient Stock! Only ${stock} available.`);
      return;
    }

    setQuantities((prev) => ({ ...prev, [id]: currentQty + 1 }));
  };

  const decreaseQty = (id) => {
    const item = cartItemsState.find((p) => p._id === id);
    if (!item) return;

    const currentQty = quantities[id] || item.quantity || 1;

    if (currentQty <= 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    setQuantities((prev) => ({ ...prev, [id]: currentQty - 1 }));
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("selectedAddress");
    if (savedAddress) {
      setSelectedAddress(JSON.parse(savedAddress));
    } else if (profile?.Address?.length > 0) {
      const reversed = [...profile.Address].reverse();
      setSelectedAddress(reversed[0]);
    }
  }, [profile]);

  const cartItems = Array.isArray(cartData?.items)
    ? cartData.items
        .map((entry) => {
          const isFlash = entry.productType === "flash_sale";
          const product =
            (isFlash
              ? entry.flashSaleProduct?.flash_sale_products?.[0]?._id
                ? entry.flashSaleProduct.flash_sale_products[0]
                : entry.flashSaleProduct?.product || entry.flashSaleProduct
              : entry.product?.product_array?.[0] || entry.product) || {};
          const finalPrice = Number(product.price_online || 0);
          return {
            ...product,
            priceToShow: finalPrice,
            quantity: entry.quantity,
            productArrayId: product._id,
          };
        })
        .filter(Boolean)
    : [];

  // console.log("Final CartItems:", cartItems);

  const totalItems = cartItemsState.reduce(
    (acc, item) => acc + (quantities[item._id] || item.quantity || 1),
    0
  );
  const totalPrice = cartItemsState.reduce((acc, item) => {
    const qty = quantities[item._id] || item.quantity || 1;
    return acc + Number(item.priceToShow) * qty;
  }, 0);

  const isOutOfStock = cartItemsState.some(
    (item) =>
      (quantities[item._id] || item.quantity) > (item.product_Quantity || 0)
  );

  // const razorpayAmount = Math.round(totalPrice * 100); // ₹1549 => 154900 paise
  const razorpayAmount = totalPrice; // ₹1549 => 154900 paise

  const handleDelete = async (productId) => {
    setDeletingIds((prev) => [...prev, productId]);
    try {
      const res = await removeFromCart(productId);
      const success =
        res?.data?.success === true ||
        res?.data?.success === "true" ||
        res?.data?.message?.includes("removed");

      if (success) {
        toast.success("Product removed from cart successfully");
        refetchCart();
      } else {
        toast.error(res?.data?.message || "Failed to remove product");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleSaveAddress = async () => {
    if (
      !addressInput.homeOrFlat ||
      !addressInput.areaOrLocality ||
      !addressInput.pincode
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsSaving(true);
    try {
      await addAddress(addressInput).unwrap();
      toast.success("Address added successfully!");
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to add address.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCheckout = async () => {
    if (cartItemsState.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const outOfStockItem = cartItemsState.find(
      (item) =>
        (quantities[item._id] || item.quantity) > (item.product_Quantity || 0)
    );

    if (outOfStockItem) {
      toast.error(
        `Insufficient Stock for ${
          outOfStockItem.product_name || "a product"
        }! Only ${outOfStockItem.product_Quantity} available.`
      );
      return; // stop checkout
    }

    setIsCheckingOut(true);

    try {
      if (!selectedAddress?._id) throw new Error("Select address first");

      // Razorpay order create
      const { data } = await axios.post(
        `${API_BASE_URL}/api/user/order/place`,
        {
          products: cartItemsState.map((item) => ({
            productId: item.productArrayId,
            quantity: quantities[item._id] || item.quantity || 1,
            price: item.priceToShow,
          })),
          address: selectedAddress,
          amount: razorpayAmount,
          paymentMethod: "online",
        },
        { withCredentials: true }
      );

      const { razorpayOrder, order } = data;

      const options = {
        key: RAZORPAY_KEY_ID,
        order_id: razorpayOrder.id,
        amount: razorpayAmount,
        currency: razorpayOrder.currency,

        handler: async function (response) {
          try {
            // ✅ Send payload exactly like your curl
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              products: cartItemsState.map((item) => ({
                productId: item.productArrayId,
                quantity: quantities[item._id] || item.quantity || 1,
              })),
              address: selectedAddress,
            };

            await verifyPayment(verifyPayload).unwrap(); // RTK query call

            for (const item of cartItemsState) {
              await removeFromCart(item.productArrayId).unwrap();
            }

            toast.success("Payment successful!");
            dispatch(setCart([]));
            setIsOrderPlacedModalOpen(true);
            setQuantities({});
            setCartItemsState([]);
            refetchCart();
          } catch (err) {
            console.log("Payment verification failed:", err);
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: profile?.Name || "",
          email: profile?.Email || "",
          contact: profile?.Number || selectedAddress?.Number || "",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-white min-h-screen relative overflow-hidden md:mt-28 mt-20  lg:px-0">
      {/* Breadcrumb */}
      <div className="bg-[#FFDFEE]  py-5 px-4 sm:px-6 md:px-6 lg:px-16 text-lg text-black font-outfit ml-2 flex items-center gap-2">
        <FaArrowRight size={13} />
        <button className="cursor-pointer " onClick={() => navigate("/")}>
          Home
        </button>
        -
        <span className="cursor-pointer" onClick={() => navigate("/products")}>
          {" "}
          Products
        </span>
        -<span className="cursor-pointer"> Cart</span>
      </div>

      <div className="flex px-6 flex-col lg:flex-row gap-6 lg:px-20 mt-10">
        {/* Cart Items */}
        <div className="flex-1 ">
          <h2 className="text-2xl font-semibold mb-4">
            {cartItemsState.length === 0 ? "Your Cart is Empty" : "My Cart"}
          </h2>

          {cartItemsState.length === 0 ? (
            <div className="text-gray-500 text-lg py-8">
              {/* No items found in your cart. */}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItemsState.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col sm:flex-row justify-between cursor-pointer items-center bg-white border border-[#F8B9CE] rounded-xl py-6 px-4 sm:px-6 shadow-sm hover:bg-pink-50 transition"
                  onClick={() => navigate(`/product/description/${item._id}`)}
                >
                  {/* product left side */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.product_images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md border border-pink-100"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                        {item.product_name || "Unnamed Product"}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base">
                        {item.product_catagory || "Category not available"}
                      </p>
                      <p className="text-[#E93CA5] font-semibold mt-1">
                        ₹{item.priceToShow.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* right side - quantity + delete */}
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-500 rounded-full">
                      <button
                        className="px-3 py-1 text-lg text-gray-600 hover:text-pink-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          decreaseQty(item._id);
                        }}
                      >
                        -
                      </button>
                      <span className="px-3 text-sm sm:text-base text-gray-800">
                        {quantities[item._id] || item.quantity || 1}
                      </span>
                      <button
                        className="px-3 py-1 text-lg text-gray-600 hover:text-pink-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseQty(item._id);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      disabled={deletingIds.includes(item._id)}
                      className="text-red-600 hover:text-red-600 "
                    >
                      {deletingIds.includes(item._id) ? (
                        "Deleting..."
                      ) : (
                        <MdDelete size={22} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Details */}
        <div className="w-full lg:w-1/3 border border-[#F8B9CE] rounded-xl p-4 mt-6 lg:mt-0">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton width="60%" height={24} />
              <Skeleton width="80%" height={18} />
              <Skeleton width="100%" height={120} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="100%" height={40} />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-base sm:text-lg">
                  <span>
                    <IoPricetag />
                  </span>{" "}
                  Coupons & Offers
                </h3>
                <div className="text-sm bg-[#77778117] rounded-md py-3 px-3 sm:px-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm sm:text-base">
                      Address
                    </p>
                    <button
                      className="text-[#00A113] text-xs sm:text-sm mt-1"
                      onClick={() => setIsModalOpen(true)}
                    >
                      + Add
                    </button>
                  </div>

                  {profile?.Address && profile.Address.length > 0 ? (
                    <div>
                      <div
                        className="flex items-center p-3 border rounded-md cursor-pointer hover:border-pink-400 transition-all duration-200 "
                        onClick={() => setIsAddressListOpen(!isAddressListOpen)}
                      >
                        <p className="text-gray-700 text-sm leading-snug break-words md:w-[950%]">
                          {selectedAddress ? (
                            <>
                              {selectedAddress.Name &&
                                `${selectedAddress.Name}, `}
                              {selectedAddress.Number &&
                                `${selectedAddress.Number}, `}
                              {selectedAddress.homeOrFlat &&
                                `${selectedAddress.homeOrFlat}, `}
                              {selectedAddress.areaOrLocality &&
                                `${selectedAddress.areaOrLocality}, `}
                              {selectedAddress.landmark &&
                                `${selectedAddress.landmark}, `}
                              {selectedAddress.City &&
                                `${selectedAddress.City}, `}
                              {selectedAddress.state &&
                                `${selectedAddress.state}, `}
                              {selectedAddress.country &&
                                `${selectedAddress.country}, `}
                              {selectedAddress.pincode &&
                                `${selectedAddress.pincode}, `}
                              {/* {selectedAddress.latitude &&
                                `Lat: ${selectedAddress.latitude}, `}
                              {selectedAddress.longitude &&
                                `Long: ${selectedAddress.longitude}`} */}
                            </>
                          ) : (
                            "Select Address"
                          )}
                        </p>

                        <div className="flex items-center gap-12  text-pink-600 font-medium text-sm ">
                          <span className="md:text-xs">Select Address</span>
                        </div>
                      </div>

                      {isAddressListOpen && (
                        <div className="space-y-2 mt-3 max-h-40 overflow-y-auto pr-2">
                          {profile.Address.map((addr, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedAddress(addr);
                                localStorage.setItem(
                                  "selectedAddress",
                                  JSON.stringify(addr)
                                ); // SAVE HERE
                                setIsAddressListOpen(false);
                              }}
                              className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                                selectedAddress?._id === addr._id
                                  ? "border-pink-500 bg-pink-50"
                                  : "border-gray-300 hover:border-pink-300"
                              }`}
                            >
                              <p className="text-gray-700 text-sm leading-snug break-words">
                                {addr.Name && `${addr.Name}, `}
                                {addr.Number && `${addr.Number}, `}
                                {addr.homeOrFlat && `${addr.homeOrFlat}, `}
                                {addr.areaOrLocality &&
                                  `${addr.areaOrLocality}, `}
                                {addr.landmark && `${addr.landmark}, `}
                                {addr.City && `${addr.City}, `}
                                {addr.state && `${addr.state}, `}
                                {addr.country && `${addr.country}, `}
                                {addr.pincode && `${addr.pincode}, `}
                                {/* {addr.latitude && `Lat: ${addr.latitude}, `}
                                {addr.longitude && `Long: ${addr.longitude}`} */}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No addresses added yet.
                    </p>
                  )}
                </div>
              </div>
              <div className="border-t-2 border-[#FF007B] pt-4 text-sm sm:text-base">
                <h3 className="font-semibold mb-3">Price Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Price</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold mt-4 border-t pt-3">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  className={`w-full py-2 rounded-lg mt-4 transition-all text-white font-semibold ${
                    isCheckingOut
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#8E347B] hover:bg-[#6a2962] cursor-pointer"
                  }`}
                  onClick={handleCheckout}
                  disabled={isCheckingOut} // only disable during processing
                >
                  {isCheckingOut ? (
                    <div className="flex justify-center items-center gap-2">
                      <BeatLoader size={8} color="#fff" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-white rounded-lg p-6 w-full max-w-md sm:w-[420px] shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Add New Address
            </h3>

            <div className="space-y-3">
              {[
                "Name",
                "Number",
                "City",
                "homeOrFlat",
                "areaOrLocality",
                "pincode",
                "landmark",
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={addressInput[field]}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (field === "Number") {
                      if (!/^\d*$/.test(value)) {
                        setNumberError("Please enter digits only");
                        return;
                      }

                      if (value.length > 10) {
                        setNumberError("Number cannot exceed 10 digits");
                        return;
                      }

                      setNumberError("");
                    }

                    setAddressInput({
                      ...addressInput,
                      [field]: value,
                    });
                  }}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ))}
            </div>

            <div className="flex justify-end mt-5 gap-3 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={isSaving}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isOrderPlacedModalOpen}
        onClose={() => setIsOrderPlacedModalOpen(false)}
      >
        <OrderPlaced />
      </Modal>

      <ProductSuggestions />
    </div>
  );
};

export default UserProductCart;
