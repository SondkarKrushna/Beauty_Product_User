import React, { useState, useEffect, useRef } from "react";
import {
  useRegisterUserMutation,
  useVerifyRegisterOtpMutation,
} from "../redux/api/AuthApi/AuthApi";
import { useNavigate } from "react-router-dom";
import logo from "/icons/logo.png";

const SignUp = ({
  onClose = () => {},
  onSuccess = () => {},
  onSwitchToSignIn = () => {},
}) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // OTP Timer
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    if (timer === 0) setCanResend(true);
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const startOtpTimer = () => {
    setTimer(30);
    setCanResend(false);
  };

  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();
  const [verifyOtp, { isLoading: isVerifying }] =
    useVerifyRegisterOtpMutation();

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhone(value);
  };

  const handleSignUp = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit number");
      return;
    }

    try {
      const response = await registerUser({ name, contact: phone }).unwrap();

      if (response?.message === "User already exists") {
        alert("User already registered! Please login.");
        onSwitchToSignIn();
        return;
      }

      alert("OTP sent!");
      setOtpSent(true);
      startOtpTimer();
    } catch (err) {
      alert(err?.data?.message || "Registration Failed!");
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    try {
      const response = await verifyOtp({
        contact: phone,
        otp: enteredOtp,
      }).unwrap();

      localStorage.setItem("user", JSON.stringify(response.user));

      alert("Account verified!");
      onSwitchToSignIn();
    } catch (err) {
      setError(err?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-2 z-50">

      <div
        ref={modalRef}
        className="
          bg-white w-full max-w-xl rounded-3xl overflow-y-auto shadow-lg font-outfit
          max-h-[95vh] scrollbar-hide
        "
      >
        {/* TOP IMAGE + LOGO */}
        <div className="relative w-full">
          <img
            src="/Images/bgImage.webp"
            alt="Background"
            className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-t-3xl"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <img src={logo} className="h-24 sm:h-28 md:h-36 w-auto" alt="Logo" />
          </div>
        </div>

        {/* FORM */}
        <div className="px-6 sm:px-8 py-5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-pink-600 mb-8">
            {otpSent ? "Verify OTP" : "Sign Up Now"}
          </h2>

          {/* SIGNUP FORM */}
          {!otpSent && (
            <>
              {/* NAME */}
              <div className="mb-5">
                <label className="block text-gray-800 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-pink-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* PHONE */}
              <div className="mb-5">
                <label className="block text-gray-800 font-medium mb-2">
                  Mobile Number
                </label>

                <div className="flex items-center gap-3">
                  <div className="border border-pink-300 rounded-lg px-4 py-3">
                    +91
                  </div>

                  <input
                    type="text"
                    placeholder="9191919191"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="flex-1 border border-pink-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* SIGNUP BUTTON */}
              <button
                onClick={handleSignUp}
                disabled={isRegistering}
                className={`
                  w-full py-3 rounded-lg text-white font-semibold text-lg
                  ${
                    isRegistering
                      ? "bg-pink-400 cursor-not-allowed"
                      : "bg-[#FF007B] hover:bg-pink-700"
                  }
                `}
              >
                {isRegistering ? "Signing Up..." : "Sign Up"}
              </button>
            </>
          )}

          {/* OTP SECTION */}
          {otpSent && (
            <>
              <p className="text-center text-gray-700 mb-4">
                Enter the 6-digit OTP sent to your phone.
              </p>

              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    className="
                      w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center
                      border border-pink-300 rounded-lg focus:ring-2
                      focus:ring-pink-500 text-lg
                    "
                  />
                ))}
              </div>

              {error && (
                <p className="text-red-600 text-center mb-4">{error}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className={`
                  w-full py-3 rounded-lg text-white font-semibold text-lg
                  ${
                    isVerifying
                      ? "bg-pink-400 cursor-not-allowed"
                      : "bg-[#FF007B] hover:bg-pink-700"
                  }
                `}
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>

              {/* RESEND */}
              {canResend ? (
                <button
                  onClick={handleSignUp}
                  className="mt-4 w-full bg-gray-200 text-pink-600 font-semibold py-2 rounded-lg"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-center text-gray-600 mt-4">
                  Resend OTP in {timer}s
                </p>
              )}
            </>
          )}

          {/* BOTTOM LINK */}
          {!otpSent && (
            <p className="text-center text-gray-800 mt-6">
              Already have an account?{" "}
              <span
                onClick={onSwitchToSignIn}
                className="text-[#FF007B] font-semibold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          )}

          <button
            onClick={onClose}
            className="block mx-auto mt-6 text-gray-500 hover:text-[#FF007B]"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
