import React from "react";
import FlyingButton from "react-flying-item";

function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  image,
  basePrice,
}: {
  hasSizesOrExtras: Boolean | null | undefined;
  onClick: Function;
  image: String;
  basePrice: Number;
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton src={image} targetTop="5%" targetLeft="95%">
          <div onClick={onClick}>{`Add to cart $${basePrice}`}</div>
        </FlyingButton>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
      onClick={onClick}
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
}

export default AddToCartButton;
