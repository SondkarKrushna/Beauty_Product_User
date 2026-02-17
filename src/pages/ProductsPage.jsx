import React, { useState, useMemo, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductsHeroSection from "../components/ProductsHeroSection";
import Categories from "../components/Categories";
import { useGetUserSaleQuery } from "../redux/api/UserApi/userApi";

const ProductsPage = () => {
  const [showSaleProduct, setShowSaleProduct] = useState(false);
  const [scrollToCategoryId, setScrollToCategoryId] = useState(null); // new
  const location = useLocation();
  const { data: saleData } = useGetUserSaleQuery();
  const categoriesRef = useRef(null);

  const cameFromCategory = location.state?.fromCategory || false;

  const handleScrollToCategory = (categoryId) => {
    setScrollToCategoryId(categoryId);
    // if (categoriesRef.current) {
    //   categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    // }
  };

  useEffect(() => {
    if (cameFromCategory && categoriesRef.current) {
      setTimeout(() => {
        categoriesRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [cameFromCategory]);

  useEffect(() => {
    if (scrollToCategoryId && categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToCategoryId]);

  const flashSaleProducts = useMemo(() => {
    if (!saleData || !saleData.data) return [];
    return saleData.data.flatMap((sale) => sale.flash_sale_products || []);
  }, [saleData]);

  return (
    <div>
      <ProductsHeroSection onClickSale={() => setShowSaleProduct(true)} />

      <div ref={categoriesRef} className="pt-32 md:pt-40 lg:pt-20">
        <Categories
          showSale={showSaleProduct}
          saleProducts={flashSaleProducts}
          setShowSale={setShowSaleProduct}
          scrollToCategoryId={scrollToCategoryId} // <-- pass to categories
        />
      </div>
    </div>
  );
};


export default ProductsPage;
