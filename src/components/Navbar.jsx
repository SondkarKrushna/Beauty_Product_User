import React, { useEffect, useState } from "react";
import { GoHomeFill, GoHeart } from "react-icons/go";
import { GiBasket } from "react-icons/gi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { FaUser } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import {
  useGetAllUserProductsQuery,
  useGetCartQuery,
  useGetUserProfileQuery,
} from "../redux/api/UserApi/userApi";

const navOption = [
  { title: "About", path: "/about" },
  { title: "Products", path: "/products" },
  { title: "Contact", path: "/contact" },
];

const Navbar = ({ globalModal, setGlobalModal, onScrollToCategory  }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { data: allProduct } = useGetAllUserProductsQuery();
  const { data: cartProduct, refetch: refetchCart } = useGetCartQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleCheckout = () => refetchCart();

  const { data: userProfile } = useGetUserProfileQuery();

  const wishlistCount = userProfile?.likedBy?.length || 0;
  const cartCount = cartProduct?.items?.length || 0;

  const user = JSON.parse(localStorage.getItem("beauty_user")) || null;
  const isAuthenticated = !!user;

  const handleUserClick = () => navigate("/userProfile");
  const handleWishlistClick = () => {
    window.scrollTo({ top: 0 });
    navigate("/userProfile", { state: { activeSection: "wishlist" } });
  };

  const path = location.pathname;

  const currentLogo = scrolled
    ? "/Images/Group 2.svg"
    : path === "/"
    ? "/icons/logo.png"
    : ["/about", "/products", "/contact"].includes(path)
    ? "/icons/logo.png"
    : "/Images/Group 2.svg";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!allProduct?.data || !search.trim()) {
      setFilteredItems([]);
      return;
    }

    const allItems = allProduct.data.flatMap((cat) =>
      cat.product_array.map((prod) => ({
        _id: prod._id,
        name: prod.product_name,
        categoryName: cat.product_catagory,
        categoryId: cat._id,
      }))
    );

    const query = search.toLowerCase().trim();

    const filtered = allItems.filter((item) => {
      const name = item.name.toLowerCase();
      const category = item.categoryName.toLowerCase();
      return name.includes(query) || category.includes(query);
    });

    setFilteredItems(filtered);
  }, [search, allProduct]);

  const handleCategoryClick = (category) => {
    setMenuOpen(false);
    setSearch("");
    navigate("/products", {
      state: {
        fromCategory: true,
        categoryId: category.categoryId || category._id,
        categoryName: category.categoryName || category.product_catagory,
      },
    });
  };

  const handleSearchEnter = (e) => {
  if (e.key === "Enter" && search.trim()) {
    e.preventDefault();

    const allItems =
      allProduct?.data?.flatMap((cat) =>
        cat.product_array.map((prod) => ({
          _id: prod._id,
          name: prod.product_name,
          categoryName: cat.product_catagory,
          categoryId: cat._id,
        }))
      ) || [];

    const query = search.toLowerCase().trim();

    const matchedItems = allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query)
    );

    if (matchedItems.length > 0) {
      // Scroll to category instead of navigating
      if (typeof onScrollToCategory === "function") {
        onScrollToCategory(matchedItems[0]._id);
      }
    }

    setSearch("");
    setFilteredItems([]);
  }
};


  return (
    <div className="relative">
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full flex items-center justify-center px-4 md:px-10 lg:px-16 py-8 md:py-12 z-50 transition-all duration-400 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="absolute left-4 md:left-10 lg:left-16 flex items-center gap-3 md:gap-4">
          {/* Desktop Home Button */}
          <Link
            to="/"
            className="hidden lg:flex bg-[#FF007B] p-2 rounded-full mr-2 md:mr-3 items-center justify-center"
          >
            <GoHomeFill size={20} color="white" />
          </Link>
        </div>

        {/* Hamburger Button Right */}
        <button
          className="lg:hidden bg-white px-4 py-2 rounded-full font-outfit hover:bg-[#FF007B] hover:text-white absolute right-4 md:right-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3 absolute left-20 md:left-32 lg:left-36">
          {navOption.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-2 cursor-pointer px-5 py-2 rounded-full font-outfit transition-all ${
                path === item.path
                  ? "bg-[#FF007B] text-white"
                  : "bg-white text-black hover:bg-[#FF007B] hover:text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Logo */}
        {currentLogo && (
          <div className="relative flex items-center justify-center w-full mt-4 md:mt-6 lg:mt-0">
            <img
              src={currentLogo}
              alt="Logo"
              className="absolute md:block hidden top-1/2 -translate-y-1/2 h-10 md:h-20 w-auto object-contain"
            />
          </div>
        )}

        {/* Right Buttons / Search */}
        <div className="fixed top-2 md:top-5 right-20 md:right-16 mt-2 flex items-center gap-2 md:gap-5">
          {/* Search */}
          {currentLogo && (
            <div className=" md:hidden mx-4 block  items-center justify-center mb-4 top-20">
              <img
                src={currentLogo}
                alt="Logo"
                className="h-10 ml-2 md:ml-0 w-auto object-contain"
              />
            </div>
          )}
          <div
            className={`flex items-center p-1 rounded-3xl transition-all duration-300 w-[220px]  md:w-[200px] lg:w-[200px] ${
              search
                ? "border-[1px] border-[#FF007B] bg-white"
                : "border-[2px] border-gray-400 bg-white"
            }`}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchEnter}
              placeholder="Search..."
              className="flex-1 w-full px-2 py-1 md:px-4 md:py-1 rounded-3xl outline-none border-none text-sm md:text-base"
            />
            <IoSearchOutline size={20} className="text-gray-500 mr-1 md:mr-2" />
          </div>

          {/* Wishlist */}
          <div className="relative">
            <div
              className="bg-[#FF007B] md:block hidden p-2 rounded-full cursor-pointer hover:bg-[#e6006f] transition-all"
              onClick={() => {
                if (!isAuthenticated) setGlobalModal("signin");
                else handleWishlistClick();
              }}
            >
              <GoHeart size={20} color="white" />
            </div>
            {isAuthenticated && wishlistCount > 0 && (
              <div className="absolute -top-2 bg-white px-1 left-5 rounded-full text-xs font-bold">
                {wishlistCount}
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <div
              className="bg-[#FF007B] block md:hidden p-2 rounded-full cursor-pointer hover:bg-[#e6006f] transition-all"
              onClick={() => {
                if (!isAuthenticated) setGlobalModal("signin");
                else navigate("/user/cart");
              }}
            >
              <GiBasket size={20} color="white" />
            </div>
            {isAuthenticated && cartCount > 0 && (
              <div className="absolute  -top-2 bg-white px-1 md:right-23 md:left-5 rounded-full text-xs font-bold">
                {cartCount}
              </div>
            )}
          </div>

          <div className="relative">
            <div
              className="bg-[#FF007B] md:block hidden p-2 rounded-full cursor-pointer hover:bg-[#e6006f] transition-all"
              onClick={() => {
                if (!isAuthenticated) setGlobalModal("signin");
                else navigate("/user/cart");
              }}
            >
              <GiBasket size={20} color="white" />
            </div>
            {isAuthenticated && cartCount > 0 && (
              <div className="absolute md:block hidden -top-2 bg-white px-1 md:right-23 md:left-5 rounded-full text-xs font-bold">
                {cartCount}
              </div>
            )}
          </div>

          {/* User Button */}
          {isAuthenticated ? (
            <button
              onClick={handleUserClick}
              className="hidden sm:flex bg-gradient-to-r from-[#3F1543] via-[#704C80] to-[#370626] text-white px-3 md:px-5 py-2 border rounded-full text-sm md:text-base items-center gap-2"
            >
              <FaUser />
              <span>{user?.Username || user?.contact || "User"}</span>
            </button>
          ) : (
            <button
              className="hidden sm:flex bg-gradient-to-r from-[#3F1543] via-[#704C80] to-[#370626] text-white px-3 md:px-5 py-2 border-[1px] rounded-full text-sm md:text-base"
              onClick={() => setGlobalModal("signin")}
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/20 z-[15]"
        ></div>
      )}
      {menuOpen && (
        <div className="fixed  top-16 right-0 w-[220px] h-72 rounded-3xl bg-white shadow-md flex flex-col items-start py-4 px-3 z-[9999] transition-all duration-300 ease-in-out">
          {/* <div
            className="bg-[#FF007B] p-2 rounded-full cursor-pointer hover:bg-[#e6006f] mb-4"
            onClick={() => {
              if (!isAuthenticated) setGlobalModal("signin");
              else navigate("/user/cart");
            }}
          >
            <GiBasket size={20} color="white" />
          </div> */}

          {/* Menu Links */}
          <div
            className="bg-[#FF007B] p-2 rounded-full cursor-pointer hover:bg-[#e6006f] transition-all"
            onClick={() => {
              if (!isAuthenticated) setGlobalModal("signin");
              else handleWishlistClick();
            }}
          >
            <GoHeart size={20} color="white" />
            {isAuthenticated && wishlistCount > 0 && (
              <div className="absolute top-2 bg-white px-1 left-8 rounded-full text-xs font-bold">
                {wishlistCount}
              </div>
            )}
          </div>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="w-full text-left py-2 hover:bg-[#FF007B] hover:text-white font-outfit flex items-center gap-2 px-2 rounded"
          >
            Home
          </Link>
          {navOption.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="w-full text-left py-2 hover:bg-[#FF007B] hover:text-white font-outfit px-2 rounded"
            >
              {item.title}
            </Link>
          ))}

          {!isAuthenticated && (
            <button
              className="bg-gradient-to-r from-[#3F1543] via-[#704C80] to-[#370626] text-white px-5 py-2 mt-2 rounded-full w-full text-center"
              onClick={() => {
                setMenuOpen(false); // <-- CLOSE MENU FIRST
                setGlobalModal("signin"); // <-- THEN OPEN MODAL
              }}
            >
              Login / Signup
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleUserClick();
              }}
              className="bg-gradient-to-r from-[#3F1543] via-[#704C80] to-[#370626] text-white px-5 py-2 mt-2 rounded-full flex items-center justify-center gap-2 w-full"
            >
              <FaUser />
              <span>{user?.Username || user?.contact || "User"}</span>
            </button>
          )}
        </div>
      )}

      {/* Search Suggestions */}
      {search && filteredItems.length > 0 && (
        <div className="fixed top-20 right-4 sm:right-10 md:right-[220px]  w-[150px] sm:w-[200px] md:w-64 lg:w-64 bg-white border rounded-md shadow-md z-50 p-2 overflow-auto max-h-64">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCategoryClick(item)}
              className="cursor-pointer px-3 py-2 rounded hover:bg-[#FF007B] hover:text-white transition text-sm sm:text-base"
            >
              {item.name}{" "}
              <span className="text-gray-400 text-xs sm:text-sm">
                ({item.categoryName})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Sign In / Sign Up Modal */}
      {globalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[70]">
          {globalModal === "signin" && (
            <SignIn
              onClose={() => setGlobalModal(null)}
              onSwitchToSignUp={() => setGlobalModal("signup")}
            />
          )}
          {globalModal === "signup" && (
            <SignUp
              onClose={() => setGlobalModal(null)}
              onSwitchToSignIn={() => setGlobalModal("signin")}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
