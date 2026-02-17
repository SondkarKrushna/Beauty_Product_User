import React, { useEffect, useState } from "react";
import eyeCream from "/Images/Rectangle 33.webp";
import { useGetMyProductsQuery } from "../redux/api/UserApi/userApi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserPlacedOrders = () => {
  const [products, setProducts] = useState([]);
  const { data: cartData, isLoading, isError } = useGetMyProductsQuery();
  const navigate = useNavigate();

  console.log("Placed Order Data:", cartData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cartData?.data) {
      setProducts(cartData.data);
    }
  }, [cartData]);

  if (isError)
    return (
      <p className="text-black text-center py-10">You haven't placed any order yet</p>
    );

  // Function to calculate total quantity and price
  const getOrderTotals = (products) => {
    const totalQuantity = products.reduce((acc, prod) => acc + prod.quantity, 0);
    const totalPrice = products.reduce(
      (acc, prod) => acc + prod.productData.price_online * prod.quantity,
      0
    );
    return { totalQuantity, totalPrice };
  };


  return (
    <div className="space-y-6 min-h-[60vh] flex flex-col justify-center items-center w-full px-4 md:px-10">
      {isLoading ? (
        Array(3)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="rounded-xl p-4 border w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <Skeleton width={200} height={24} />
                <Skeleton width={250} height={24} />
              </div>
              <div className="mt-3 border-[1px] border-[#FF007B2B] rounded-2xl p-4">
                <Skeleton width={150} height={24} />
                {Array(2)
                  .fill(0)
                  .map((_, prodIdx) => (
                    <div
                      key={prodIdx}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-3"
                    >
                      <Skeleton
                        width={144}
                        height={128}
                        className="rounded-xl flex-shrink-0"
                      />
                      <div className="flex flex-col gap-2 w-full">
                        <Skeleton width="100%" height={24} />
                        <Skeleton width="50%" height={20} />
                        <Skeleton width="40%" height={20} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
      ) : products.length > 0 ? (
        [...products].reverse().map((order, orderIndex) => (
          <div key={orderIndex} className="rounded-xl  w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <p className="text-lg">
                Order ID:{" "}
                <span className="text-[#7D7D86]">#{order?._id?.slice(-6)}</span>
              </p>
              <p className="font-outfit text-lg">
                Placed on{" "}
                <span className="text-[#00A113] ml-0 md:ml-3">
                  {new Date(order?.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>

            <div className="mt-3 border-[1px] border-[#FF007B2B] rounded-2xl">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <p className="text-xl">{order?.status}</p>
              </div>

              <div className="mt-3 border-[1px] border-[#FF007B2B] rounded-2xl relative p-4">
                {order?.products?.map((prod, prodIndex) => (
                  <div
                    key={prodIndex}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/product/description/${prod?.productData?._id}`)
                    }
                  >
                    <img
                      src={prod?.productData?.product_images?.[0] || eyeCream}
                      alt={prod?.productData?.product_name || "Product Image"}
                      className="w-full sm:w-36 h-32 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col gap-2 sm:gap-6 w-full">
                      <p className="font-medium text-xl">
                        {prod?.productData?.product_name || "No Name Found"}
                      </p>
                      <p className="font-medium text-md">
                        ₹{prod?.productData?.price_online || 0}
                      </p>
                    </div>
                  </div>
                ))}

                {/* SINGLE TOTAL BOX PER ORDER */}
                <div className="mt-4 bg-[#FF007B2B] rounded-xl p-3 text-left text-black text-md">
                  {(() => {
                    const totalQuantity = order.products.reduce(
                      (acc, p) => acc + p.quantity,
                      0
                    );
                    const totalPrice = order.products.reduce(
                      (acc, p) => acc + p.productData.price_online * p.quantity,
                      0
                    );
                    return (
                      <>
                        <p><strong>Total Items: &nbsp;</strong> {totalQuantity}</p>
                        <p><strong>Total Price: &nbsp;</strong> ₹{Math.ceil(totalPrice)}</p>
                      </>
                    );
                  })()}
                </div>
              </div>



            </div>
          </div>
        ))
      ) : (
        <p className="text-xl text-gray-500 text-center py-10">
          You haven’t placed any orders yet.
        </p>
      )}
    </div>
  );
};

export default UserPlacedOrders;
