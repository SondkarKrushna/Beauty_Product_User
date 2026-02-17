import React from "react";
import ProductDescriptionCompo from "../components/ProductDescriptionCompo";
import ProductSuggestions from "../components/ProductSuggestions";

const ProductDescription = ({ globalModal, setGlobalModal }) => {
  return (
    <div>
      <ProductDescriptionCompo />
      <ProductSuggestions setGlobalModal={setGlobalModal} />
    </div>
  );
};

export default ProductDescription;
