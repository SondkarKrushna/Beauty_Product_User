import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto bg-white md:py-28 px-4 md:px-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      {/* Business Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Business Information</h2>
        <p><span className="font-semibold">Business Name:</span> Sonal Cosmetic</p>
        <p><span className="font-semibold">Managed by:</span> XYZ</p>
        <p>
          <span className="font-semibold">Contact:</span>{" "}
          <a href="tel:9898989898" className="text-blue-600 hover:underline">
            9898989898
          </a>{" "}
          |{" "}
          <a href="mailto:abc@gmail.com" className="text-blue-600 hover:underline">
            abc@gmail.com
          </a>
        </p>
        <p>
          <span className="font-semibold">Address:</span> chh.Sambhajinagar
        </p>
      </div>

      <p className="mb-6">
        At <span className="font-semibold">Sonal Cosmetic</span>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you purchase or interact with our beauty products.
      </p>

      {/* Sections */}
      <div className="space-y-6">
        {/* 1 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Personal details such as name, email, phone number, and shipping address.</li>
            <li>Payment information when you purchase beauty products.</li>
            <li>Skin type, preferences, and beauty routine information when you use our product recommendation features.</li>
            <li>Browsing activity and preferences when you use our website or beauty apps.</li>
          </ul>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To process and deliver your beauty product orders.</li>
            <li>To communicate order updates, promotions, and personalized beauty tips.</li>
            <li>To provide personalized product recommendations based on your preferences and skin type.</li>
            <li>To improve our products, services, and overall customer experience.</li>
          </ul>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">3. Sharing of Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>We do not sell or rent customer data.</li>
            <li>Information may be shared with trusted third parties (payment processors, courier partners) only for order fulfillment.</li>
            <li>We may share data with dermatologists or beauty experts for product consultation, with your consent.</li>
            <li>We may disclose information if required by law.</li>
          </ul>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">4. Data Security</h2>
          <p>
            We use appropriate technical and organizational measures to protect your data from unauthorized access, misuse, or disclosure. Your skin type, product preferences, and other sensitive beauty-related data are kept strictly confidential.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">5. Your Rights</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You can request access, correction, or deletion of your personal data.</li>
            <li>You may unsubscribe from promotional emails and beauty tips anytime.</li>
            <li>You have the right to opt-out of personalized recommendations.</li>
          </ul>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">6. Contact Us</h2>
          <p>
            For any privacy concerns or questions about our beauty products, reach us at:{" "}
            <a href="mailto:luxivo@gmail.com" className="text-blue-600 hover:underline flex items-center gap-1">
              <HiOutlineMail /> abc@gmail.com
            </a>{" "}
            
            <a href="tel:9898989898" className="text-blue-600 hover:underline flex items-center gap-1">
              <FiPhone /> 9898989898
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
