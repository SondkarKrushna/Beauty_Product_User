import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HeroPage from "../pages/HeroPage";
import About from "../pages/About";
import ContactPage from "../pages/ContactPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDescription from "../pages/ProductDescription";
import UserProfile from "../components/UserProfile";
import UserProductCart from "../components/UserProductCart";
import Footer from "../components/Footer";
import ModalManager from "../components/ModeManager";
import Cart from "../pages/Cart";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import Navbar from "../components/Navbar";
import WishlistProducts from "../components/WishlistProducts";
import TermsAndConditions from "../pages/TermsAndConditions";
import ScrollToTop from "../components/ScrollToTop";

const RootNavigation = () => {
  const [token, setToken] = useState(localStorage.getItem("beauty_token"));
  const location = useLocation();

  const [globalModal, setGlobalModal] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("beauty_token");
    setToken(savedToken);
  }, [location.pathname]);

  if (token === undefined) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar globalModal={globalModal} setGlobalModal={setGlobalModal} />

      <ScrollToTop />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/order-placed" element={<OrderPlaced />} /> */}

          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route
            path="/product/description/:id"
            element={
              <ProductDescription
                globalModal={globalModal}
                setGlobalModal={setGlobalModal}
              />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/userProfile"
            element={
              token ? <UserProfile /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/cart"
            element={token ? <Cart /> : <Navigate to="/" replace />}
          />
          <Route
            path="/user/cart"
            element={token ? <UserProductCart /> : <Navigate to="/" replace />}
          />
          <Route
            path="/user/wishlist"
            element={token ? <WishlistProducts /> : <Navigate to="/" replace />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <ModalManager globalModal={globalModal} setGlobalModal={setGlobalModal} />
      <Footer />
    </div>
  );
};

export default RootNavigation;
