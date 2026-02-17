import React from 'react';
import eyeShadow from '/Images/Rectangle 115.webp';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {


const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md w-full">
        
        {/* Background Image */}
        <div className="relative">
          <img src={eyeShadow} alt="eyeshadow palette" className="w-full h-40 object-cover" />
        </div>

        {/* Order Content */}
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 italic mb-6">
            “Thank you for your purchase, Gorgeous!”
          </p>

          <div className="bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded-lg p-4 mb-6">
            <p className="text-sm mb-2">
              Your order has been confirmed and is being prepared with love & care.  
              We’ll notify you once it’s shipped so you can start your beauty journey soon.
            </p>
            <p className="text-sm font-medium">Order ID: 1234</p>
            <p className="text-sm">Estimated Delivery: 3–4 Business Days</p>
          </div>

          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition"
          onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
