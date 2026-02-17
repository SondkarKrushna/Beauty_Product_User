import {
  useLoginUserMutation,
  useVerifyLoginOtpMutation,
} from "../redux/api/AuthApi/AuthApi";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/icons/logo.png";
import { BeatLoader } from "react-spinners";

const SignIn = ({
  onClose = () => {},
  onSuccess = () => {},
  onSwitchToSignUp = () => {},
}) => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [showOtpInputs, setShowOtpInputs] = useState(false);

  const [loginUser, { isLoading: loading }] = useLoginUserMutation();
  const [verifyOtp, { isLoading }] = useVerifyLoginOtpMutation();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // TIMER
  useEffect(() => {
    let interval;

    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }

    if (timer === 0) {
      setShowOtpInputs(false);
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      setError("Please Enter a valid 10-digit number");
      return;
    }

    try {
      const res = await loginUser({ contact: phone }).unwrap();

      if (res?.message === "User not registerd") {
        alert("User not registered, please sign up first");
        onSwitchToSignUp();
        return;
      }

      setOtpSent(true);
      setError("");

      setOtp("");
      setShowOtpInputs(true);
      setTimer(30);
      setCanResend(false);

    } catch (err) {
      setError(err?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({ contact: phone, otp }).unwrap();
      const userData = res.user || res.data?.user || res.data || res;
      const tokenData = res.token || "";

      localStorage.setItem("beauty_user", JSON.stringify(userData));
      localStorage.setItem("beauty_token", tokenData);

      onSuccess(userData);
      onClose();
      navigate("/");
    } catch {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-2 z-50">
      <div
        ref={modalRef}
        className="
          bg-white w-full max-w-xl relative rounded-3xl overflow-y-auto shadow-lg font-outfit
          max-h-[105vh] 
          scrollbar-hide
        "
      >

        {/* TOP IMAGE + LOGO */}
        <div className="relative w-full">
          <img
            src="/Images/bgImage.webp"
            className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-t-3xl"
            alt="Background"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <img src={logo} className="h-24 sm:h-28 md:h-36 w-auto" alt="Logo" />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="p-5 sm:p-6 md:p-8">

          <h2 className="text-3xl sm:text-4xl font-medium text-center mb-10 text-pink-600 font-outfit">
            Sign In Now
          </h2>

          {/* PHONE INPUT */}
          <div className="mb-4">
            <label className="block text-gray-700 text-lg sm:text-xl font-medium mb-2">
              Phone Number
            </label>

            <div className="flex items-center rounded-lg overflow-hidden gap-4">
              <div className="text-black text-lg font-medium px-2 py-2 sm:px-6 sm:py-4 border border-[#FF007B40] rounded-lg">
                +91
              </div>

              <input
                type="text"
                placeholder="Enter Here"
                className="flex-1 w-20 px-4 py-2 sm:px-4 sm:py-4 outline-none border border-[#FF007B40] rounded-lg"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) setPhone(value);
                  setError("");
                }}
                disabled={otpSent}
              />
            </div>
          </div>

          {/* OTP BOXES */}
          {otpSent && (
            <div className="flex flex-col items-center mt-4 mb-4">
              <div className="flex gap-2 sm:gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    className="
                      w-10 h-10
                    
                      md:w-12 md:h-10
                      text-center border border-[#FF007B40] 
                      rounded-lg focus:outline-none text-lg
                    "
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      const newOtp = otp.split("");
                      newOtp[i] = value;
                      setOtp(newOtp.join(""));
                      if (value && i < 5) {
                        const next = document.getElementById(`otp-${i + 1}`);
                        next && next.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        const newOtp = otp.split("");
                        newOtp[i] = "";
                        setOtp(newOtp.join(""));
                        if (i > 0) {
                          const prev = document.getElementById(`otp-${i - 1}`);
                          prev && prev.focus();
                        }
                      }
                    }}
                  />
                ))}
              </div>

              {timer > 0 ? (
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Enter OTP within {timer}s
                </p>
              ) : (
                <button
                  className="mt-2 text-[#FF007B] font-semibold hover:underline"
                  onClick={handleSendOtp}
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          {/* MAIN BUTTON */}
          <button
            className="
              w-full bg-[#FF007B] 
              text-lg sm:text-xl 
              text-white py-3 rounded-md mt-4 font-semibold
            "
            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            disabled={otpSent && timer === 0 && !canResend}
          >
            {loading || isLoading ? (
              <BeatLoader size={8} color="#fff" />
            ) : otpSent ? (
              "Verify OTP"
            ) : (
              "Send OTP"
            )}
          </button>

          <p className="text-center text-gray-700 mt-6 text-base sm:text-lg">
            Don’t have an account?{" "}
            <span
              onClick={onSwitchToSignUp}
              className="text-[#FF007B] cursor-pointer font-semibold hover:underline"
            >
              Sign Up
            </span>
          </p>

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

export default SignIn;
