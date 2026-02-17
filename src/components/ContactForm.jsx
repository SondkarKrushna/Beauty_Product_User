import React, { useState } from "react";
import { useAddUserAddressMutation } from "../redux/api/UserApi/userApi";
import { toast } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const [errorMsg, setErrorMsg] = useState(""); 

  const [addUserAddress, { isLoading, isError }] =
    useAddUserAddressMutation();

  const handleContactChange = (e) => {
    const value = e.target.value;

    // ✅ If non-digit entered
    if (/[^0-9]/.test(value)) {
      setErrorMsg("Enter digits only");
      return;
    } else {
      setErrorMsg(""); // clear message if valid
    }

    // ✅ Allow only up to 10 digits
    if (value.length <= 10) {
      setFormData({ ...formData, contact: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.message) {
      toast.error("Please fill out all fields");
      return;
    }

    if (formData.contact.length !== 10) {
      setErrorMsg("Contact number must be exactly 10 digits");
      return;
    }

    setErrorMsg(""); // clear any previous errors

    try {
      await addUserAddress(formData).unwrap();
      toast.success("Your message has been sent successfully");
      setFormData({ name: "", contact: "", message: "" });
    } catch (error) {
      
      toast.error("Failed to send message. Please try again");
    }
  };

  return (
    <div
      className="relative h-[480px] md:min-h-screen flex items-center justify-center bg-cover bg-center px-4 md:px-0"
      style={{ backgroundImage: `url("/Images/styleImg.webp")` }}
    >
      {/* Decorative Images */}
      <img
        src="/Images/flower1.webp"
        alt="flower"
        className="absolute -top-20 md:-top-40 left-0 w-20 sm:w-32 md:w-72"
      />
      <img
        src="/Images/flower2.webp"
        alt="flower"
        className="absolute bottom-0 right-0 w-20 sm:w-32 md:w-72"
      />

      {/* Form Container */}
      <div className="bg-[#FFDFEE] shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md sm:max-w-2xl md:max-w-3xl relative">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
          We’re Here to Help You Glow
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
          />

          <div className="flex flex-col">
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleContactChange}
              maxLength={10}
              className={`w-full p-2 sm:p-3 focus:outline-none focus:ring-2 rounded ${
                errorMsg ? "focus:ring-red-400" : "focus:ring-pink-400"
              }`}
            />
            {errorMsg && (
              <p className="text-red-600 text-sm mt-1">{errorMsg}</p>
            )}
          </div>

          <textarea
            name="message"
            placeholder="Message"
            rows="3"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-pink-600 text-white font-medium px-4 sm:px-6 py-2 rounded-full hover:bg-pink-700 transition mx-auto"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>

          {isError && (
            <p className="text-red-600 text-center mt-2 text-sm sm:text-base">
              Failed to send message.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
