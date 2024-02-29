"use client";

import React, { Key, useContext, useEffect, useState } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/layout/menu/CartProduct";

function CartPage() {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const { userDetail: profileData } = useProfile();

  let subtotal = cartProducts?.reduce(
    (acc: Number, p: any) => acc + cartProductPrice(p),
    0
  );

  const [address, setAddress] = useState<Object>({});

  useEffect(() => {
    const { phone, streetAddress, postalCode, city, country } = profileData;
    const addressFromProfile = {
      phone,
      streetAddress,
      postalCode,
      city,
      country,
    };
    setAddress(addressFromProfile);
  }, [profileData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.location?.href?.includes("canceled=1")) {
        toast.error("Payment failed");
      }
    }
  }, []);

  function handleAddressChange(propName: string, value: any) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(e: any) {
    e.preventDefault();

    const promisePayment = new Promise(async (resolve: Function, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartProducts, address }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json(); // redirect to stripe link
        } else {
          reject();
        }
      });
    });

    toast.promise(promisePayment, {
      loading: "Preparing your order...",
      success: "Redirecting to payment",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8">
        <SectionHeaders mainHeader="Cart" />

        <p className="mt-4">Your shopping cart is empty</p>
      </section>
    );
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="">
          {cartProducts?.length === 0 ? (
            <div className="">No products in your shopping cart</div>
          ) : (
            cartProducts?.map((product: any, i: Key) => (
              <CartProduct
                key={i}
                product={product}
                onRemove={(ind: any) => removeCartProducts(i)}
                index={i}
              />
            ))
          )}

          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>

            <div className="font-semibold pl-2 text-right">
              ${subtotal}
              <br />${5}
              <br />${subtotal + 5}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Check out</h2>

          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />

            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
