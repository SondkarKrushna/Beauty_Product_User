import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
// import Navbar from "./Navbar";
import UserPlacedOrders from "./UserPlacedOrders";
import WishlistProducts from "./WishlistProducts";
import {
  useGetUserProfileQuery,
  useAddUserAddressMutation,
  useDeleteUserAddressMutation,
} from "../redux/api/UserApi/userApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogoutUserMutation } from "../redux/api/AuthApi/AuthApi";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "info"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [addressInput, setAddressInput] = useState({
    homeOrFlat: "",
    areaOrLocality: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("beauty_user")) || null;
  const token = localStorage.getItem("beauty_token") || null;

  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  const [addUserAddress, { isLoading: isSaving }] = useAddUserAddressMutation();
  const [deleteUserAddress] = useDeleteUserAddressMutation();

  const user = token && profileData ? profileData : localUser || {};

  // if (isLoading)
  //   return (
  //     <p className="text-center mt-10 text-lg font-semibold">
  //       Loading profile...
  //     </p>
  //   );

  // if (isError)
  //   return (
  //     <p className="text-center mt-10 text-red-500 text-lg">
  //       Failed to load profile.
  //     </p>
  //   );

  const openAddModal = () => {
    setEditIndex(null);
    setIsModalOpen(true);
    setAddressInput({
      homeOrFlat: "",
      areaOrLocality: "",
      pincode: "",
      landmark: "",
      latitude: "",
      longitude: "",
    });
  };

  const openEditModal = (index, existingAddress) => {
    setEditIndex(index);
    setIsModalOpen(true);
    setAddressInput(existingAddress);
  };

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setAddressInput((prev) => ({ ...prev, latitude, longitude }));

        try {
          const proxyUrl = "https://api.allorigins.win/get?url=";
          const targetUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          const response = await fetch(
            proxyUrl + encodeURIComponent(targetUrl)
          );
          const data = await response.json();
          const result = JSON.parse(data.contents);

          const addr = result?.address || {};
          const postalCode = addr.postcode || "";

          const formattedAddress = [
            addr.house_number,
            addr.road,
            addr.suburb || addr.neighbourhood,
            addr.city || addr.town || addr.village,
            addr.state,
          ]
            .filter(Boolean)
            .join(", ");

          setAddressInput((prev) => ({
            ...prev,
            areaOrLocality: formattedAddress,
            pincode: postalCode,
          }));
        } catch (error) {
          alert("Failed to get address. Please try again.");
        }
      },
      (error) => {
        alert("Please allow location access in your browser!");
      }
    );
  };

  const handleSaveAddress = async () => {
    if (!addressInput.areaOrLocality || !addressInput.pincode) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const res = await addUserAddress(addressInput).unwrap();

      setIsModalOpen(false);
      refetch();
    } catch (err) {
      alert("Failed to add address. Try again!");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const deletingToast = toast.loading("Deleting address...");
    try {
      await deleteUserAddress(addressId).unwrap();
      toast.success("Address deleted successfully!", { id: deletingToast });
      refetch();
    } catch (err) {
      toast.error("Failed to delete address.", { id: deletingToast });
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser().unwrap();
      localStorage.removeItem("beauty_token");
      localStorage.removeItem("beauty_user");
      window.location.reload();
      navigate("/");
    } catch (err) {
      toast.error("Logout failed! Try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <div className="min-h-screen md:mt-36 mt-20 font-outfit bg-[#FDFDFD]">
      {/* <Navbar /> */}
      <div className="">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-[#FFDFEE] py-5 px-4 sm:px-16 text-lg font-semibold">
          <h2 className="text-md font-semibold text-gray-800">Your Profile</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 md:px-16">
          <div className="flex flex-col w-full lg:w-1/4">
            {/* Sidebar Box */}
            <div className="bg-white w-full h-fit rounded-lg border border-[#FF007B2B] p-4 flex flex-col">
              {/* Sidebar Items */}
              <ul className="space-y-4 flex-grow">
                {["info", "orders", "wishlist"].map((section) => (
                  <li
                    key={section}
                    className={`flex justify-between items-center border-b border-[#C5C5CA] pb-3 cursor-pointer hover:text-pink-600 ${
                      activeSection === section
                        ? "text-pink-600 font-medium text-xl"
                        : "text-xl"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section === "info"
                      ? "My Information"
                      : section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className="text-4xl">›</span>
                  </li>
                ))}
              </ul>

              {/* Logout Button (only 1 — perfect responsive) */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`px-6 py-2 text-white rounded shadow-sm mt-4 transition ${
                  isLoggingOut ? "bg-gray-400 cursor-not-allowed" : "bg-red-600"
                }`}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg border border-[#F9CCE1] p-4 sm:p-6 shadow-sm max-h-[65vh] overflow-y-auto">
            {!token && (
              <div className="text-center mt-10 text-red-500 font-semibold text-xl">
                You are not logged in. Please login to view your profile.
              </div>
            )}

            {token && (
              <>
                {activeSection === "info" && (
                  <>
                    {/* LOADING STATE */}
                    {isLoading && (
                      <p className="text-center mt-4 text-gray-600">
                        Loading profile...
                      </p>
                    )}

                    {/* ERROR STATE */}
                    {isError && (
                      <p className="text-center mt-4 text-red-500">
                        Failed to load profile. Please login again.
                      </p>
                    )}

                    {/* ONLY SHOW INFO WHEN NOT LOADING + NOT ERROR */}
                    {!isLoading && !isError && (
                      <>
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 mb-6">
                          <div className="bg-[#FF007B] text-white rounded-full p-8 flex-shrink-0">
                            <FaUser size={44} />
                          </div>
                          <div className="text-center sm:text-left">
                            <h3 className="text-2xl text-gray-800 font-semibold">
                              {user.name || "No Name"}
                            </h3>
                            <p className="text-xl font-medium text-gray-700">
                              {user.contact || "No Contact"}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div className="bg-[#F8F8F8] p-4 rounded-sm border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold text-lg text-gray-900">
                                Default Address
                              </h4>
                              <button
                                onClick={openAddModal}
                                className="text-green-600 text-lg font-medium hover:underline"
                              >
                                + Add
                              </button>
                            </div>
                            <p className="text-gray-800 font-medium break-words">
                              {user?.Address?.[0] ? (
                                <>
                                  {user.Address[0].Name &&
                                    `${user.Address[0].Name}, `}
                                  {user.Address[0].Number &&
                                    `${user.Address[0].Number}, `}
                                  {user.Address[0].homeOrFlat &&
                                    `${user.Address[0].homeOrFlat}, `}
                                  {user.Address[0].areaOrLocality &&
                                    `${user.Address[0].areaOrLocality}, `}
                                  {user.Address[0].landmark &&
                                    `${user.Address[0].landmark}, `}
                                  {user.Address[0].City &&
                                    `${user.Address[0].City}, `}
                                  {user.Address[0].state &&
                                    `${user.Address[0].state}, `}
                                  {user.Address[0].country &&
                                    `${user.Address[0].country}, `}
                                  {user.Address[0].pincode &&
                                    `${user.Address[0].pincode}`}
                                </>
                              ) : (
                                "No default address added."
                              )}
                            </p>
                          </div>

                          {user.Address && user.Address.length > 1 ? (
                            user.Address.slice(1).map((address, index) => (
                              <div
                                key={index}
                                className="bg-[#F8F8F8] p-4 rounded-sm border border-gray-200 break-words"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold text-lg text-gray-900">
                                    Address {index + 2}
                                  </h4>
                                  <button
                                    onClick={() =>
                                      handleDeleteAddress(address._id)
                                    }
                                    className="text-red-500 text-lg font-medium hover:underline"
                                  >
                                    Delete
                                  </button>
                                </div>
                                <p className="text-gray-800 font-medium break-words">
                                  {address.Name && `${address.Name}, `}
                                  {address.Number && `${address.Number}, `}
                                  {address.homeOrFlat &&
                                    `${address.homeOrFlat}, `}
                                  {address.areaOrLocality &&
                                    `${address.areaOrLocality}, `}
                                  {address.landmark && `${address.landmark}, `}
                                  {address.City && `${address.City}, `}
                                  {address.state && `${address.state}, `}
                                  {address.country && `${address.country}, `}
                                  {address.pincode && `${address.pincode}`}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="bg-[#F8F8F8] p-4 rounded-sm border border-gray-200 text-gray-500 font-medium">
                              No address available.
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}

                {activeSection === "orders" && <UserPlacedOrders />}
                {activeSection === "wishlist" && <WishlistProducts />}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editIndex !== null ? "Edit Address" : "Add New Address"}
            </h3>

            <div className="space-y-3">
              {["homeOrFlat", "areaOrLocality", "pincode", "landmark"].map(
                (field) => (
                  <input
                    key={field}
                    name={field}
                    value={addressInput[field]}
                    onChange={(e) =>
                      setAddressInput({
                        ...addressInput,
                        [field]: e.target.value,
                      })
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                )
              )}
              <button
                onClick={handleGetLocation}
                className="w-full py-2 bg-pink-100 border border-pink-400 text-pink-700 font-medium rounded-md hover:bg-pink-200 transition"
              >
                📍 Use Current Location
              </button>
            </div>

            <div className="flex justify-end mt-5 gap-3">
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
    </div>
  );
};

export default UserProfile;
