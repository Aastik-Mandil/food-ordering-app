"use client";

import React, { Key, useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/components/AppContext";
import FlyingButton from "react-flying-item";
import MenuItemTile from "./MenuItemTile";

function MenuItems({
  menuItems,
}: {
  menuItems: {
    image: string;
    name: string;
    description: String;
    basePrice: Number;
    sizes: [Object];
    extraIngredientPrices: [Object];
  };
}) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItems;
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const [selectedSize, setSelectedSize] = useState<any>(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes?.length > 0 || extraIngredientPrices?.length > 0;
    if (hasOptions && showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItems, selectedSize, selectedExtras);
    await new Promise(async (resolve) => setTimeout(resolve, 1000));
    setShowPopup(false);
  }

  function handleExtraThingClick(e: any, extraThing: Object) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) =>
        prev?.filter((e) => e?.name !== extraThing?.name)
      );
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize?.price || 0;
  }
  if (selectedExtras?.length > 0) {
    selectedPrice += selectedExtras?.reduce(
      (acc, curr) => acc + (curr?.price || 0),
      0
    );
  }

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-2 rounded-lg max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image || ""}
                alt={name}
                width={200}
                height={200}
                className="mx-auto"
              />

              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>

              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className="rounded-md p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>

                  {sizes?.map((size: any, i: Key) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-4 rounded-md mb-1 border"
                    >
                      <input
                        type="radio"
                        name="size"
                        checked={selectedSize?.name === size?.name}
                        onChange={() => setSelectedSize(size)}
                      />{" "}
                      {size?.name} ${basePrice + size?.price}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className="rounded-md p-2">
                  <h3 className="text-center text-gray-700">Any extras</h3>

                  {extraIngredientPrices?.map((extraThing: any, i: Key) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-4 rounded-md mb-1 border"
                    >
                      <input
                        type="checkbox"
                        name={extraThing?.name}
                        checked={selectedExtras?.find(
                          (ex: any) => ex?.name === extraThing?.name
                        )}
                        onClick={(e) => handleExtraThingClick(e, extraThing)}
                      />{" "}
                      {extraThing?.name} +${extraThing?.price}
                    </label>
                  ))}
                </div>
              )}

              <FlyingButton src={image} targetTop="5%" targetLeft="95%">
                <div
                  className="primary sticky bottom-2"
                  onClick={handleAddToCartButtonClick}
                >
                  {`Add to cart $${selectedPrice || 0}`}
                </div>
              </FlyingButton>

              <button
                type="button"
                className="mt-2"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile
        menuItems={menuItems}
        onAddToCart={handleAddToCartButtonClick}
      />
    </>
  );
}

export default MenuItems;
