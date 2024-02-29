// "use client";

import React from "react";
import AddToCartButton from "./AddToCartButton";

function MenuItemTile({
  menuItems,
  onAddToCart,
}: {
  menuItems: {
    image: String;
    name: String;
    description: String;
    basePrice: Number;
    sizes: [Object];
    extraIngredientPrices: [Object];
  };
  onAddToCart: Function;
}) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItems;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={image}
          alt={name}
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>

      <h4 className="font-semibold my-3 text-xl">{name}</h4>

      <p className="text-gray-500 text-sm line-clamp-3 truncate">
        {description}
      </p>

      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        image={image}
        basePrice={basePrice}
      />
    </div>
  );
}

export default MenuItemTile;
