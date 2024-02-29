import React, { Key } from "react";
import Image from "next/image";
import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";

function CartProduct({
  product,
  onRemove = () => {},
  index,
}: {
  product: any;
  onRemove?: Function | null | undefined;
  index: Key;
}) {
  return (
    <div className="flex items-center gap-4 border-b py-3">
      <div className="w-24">
        <Image
          src={product?.image}
          alt={product?.name}
          width={240}
          height={240}
        />
      </div>

      <div className="grow">
        <h3 className="font-semibold">{product?.name}</h3>

        {product?.size && (
          <div className="text-sm">
            Size: <span className="">{product?.size?.name}</span>
          </div>
        )}

        {product?.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product?.extras?.map((extra: any, ind: Key) => (
              <div key={ind}>
                {extra?.name} ${extra?.price}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>

      {!!onRemove && (
        <div className="ml-2">
          <button
            type="button"
            className="p-2"
            onClick={() => {
              if (onRemove) {
                onRemove(index);
              }
            }}
          >
            <Trash />
            {""}
          </button>
        </div>
      )}
    </div>
  );
}

export default CartProduct;
