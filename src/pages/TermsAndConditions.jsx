// TermsAndConditions.jsx
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="mx-auto md:px-10 md:py-28">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
        Terms & Conditions
      </h1>

      {/* 1. General */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">1. General</h2>
        <p className="text-gray-600">
          These Terms govern the sale of beauty products offered by Sonal Cosmetic. 
          By placing an order, you agree to comply with these terms.
        </p>
      </section>

      {/* 2. Products */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">2. Products</h2>
        <p className="text-gray-600">
          We strive to provide accurate descriptions, images, and sizes of our products.
          However, minor variations in color, texture, or packaging may occur.
        </p>
      </section>

      {/* 3. Orders & Payments */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">3. Orders & Payments</h2>
        <p className="text-gray-600">
          All orders are subject to availability and acceptance. Payments must be made through approved methods before dispatch.
        </p>
      </section>

      {/* 4. Shipping & Delivery */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">4. Shipping & Delivery</h2>
        <p className="text-gray-600">
          We deliver to the address provided at checkout. Delivery times may vary depending on location and logistics. 
          We are not responsible for delays caused by courier partners or unforeseen circumstances.
        </p>
      </section>

      {/* 5. Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">5. Limitation of Liability</h2>
        <p className="text-gray-600">
          Sonal Cosmetic is not responsible for indirect, incidental, or consequential damages arising from product use.
        </p>
      </section>

      {/* 6. Governing Law */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">6. Governing Law</h2>
        <p className="text-gray-600">
          These Terms shall be governed by and construed in accordance with the laws of India. 
          Any disputes will be subject to the jurisdiction of courts in Sambhajinagar, Maharashtra.
        </p>
      </section>

      {/* 7. Return & Refund Policy */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">7. Return & Refund Policy</h2>
        <p className="text-gray-600">
          Refunds will be credited to your original payment method within 3-5 business days. 
          Replacement orders will be delivered within 3-5 business days. 
          Returns can be initiated within 7 days of receiving the order.
        </p>
      </section>

      {/* 8. Shipping Policy */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">8. Shipping Policy</h2>
        <p className="text-gray-600">
          Orders will be delivered within 3-5 business days.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
