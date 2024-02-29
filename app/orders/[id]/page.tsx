"use client";

import React, { Key, useContext, useEffect, useState } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/layout/menu/CartProduct";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function OrderPage({ params }: { params: { id: String } }) {
  const session = useSession();
  const { status } = session;
  const { clearCart } = useContext(CartContext);
  const [loadingOrder, setLoadingOrder] = useState<Boolean>(false);
  const [order, setOrder] = useState<any>(null);

  let subtotal = order?.cartProducts?.reduce(
    (acc: Number, p: any) => acc + cartProductPrice(p),
    0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.location?.href?.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (params?.id) {
      setLoadingOrder(true);
      fetch(`/api/orders?._id=${params?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoadingOrder(false);
        })
        .catch((err) => {
          setLoadingOrder(false);
        });
    }
  }, []);

  if (status === "loading" || loadingOrder) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader={"Your order"} />

        <div className="mt-4 mb-8">
          <p className="">Thaks for your order</p>

          <p className="">
            We will call you when your order will be on the way
          </p>
        </div>
      </div>

      {order && (
        <div className="grid md:grid-cols-2 gap-16">
          <div className="">
            {order?.cartProducts?.map((product: any, i: Key) => (
              <CartProduct
                key={i}
                product={product}
                // onRemove={(ind) => removeCartProducts(i)}
                index={i}
              />
            ))}

            <div className="text-right py-2 text-gray-500">
              Subtotal:{" "}
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
              Delivery:{" "}
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:{" "}
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>

          <div className="">
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={...order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrderPage;
