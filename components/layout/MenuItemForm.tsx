"use client";

import React, { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

function MenuItemForm({
  onSubmit,
  menuItem,
}: {
  onSubmit: Function;
  menuItem: Object | null | undefined | any;
}) {
  const [image, setImage] = useState<string>(menuItem?.image || "");
  const [name, setName] = useState<string>(menuItem?.name || "");
  const [description, setDescription] = useState<string>(
    menuItem?.description || ""
  );
  const [basePrice, setBasePrice] = useState<string>(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [category, setCategory] = useState<string>(menuItem?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    if (!menuItem) {
      return;
    }
    setImage(menuItem?.image || "");
    setName(menuItem?.name || "");
    setDescription(menuItem?.description || "");
    setBasePrice(menuItem?.basePrice || "");
    setSizes(menuItem?.sizes || []);
    setExtraIngredientPrices(menuItem?.extraIngredientPrices || []);
    setCategory(menuItem?.category || "");
  }, [menuItem]);

  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
      onSubmit={(e: any) =>
        onSubmit(e, {
          name,
          image,
          description,
          category,
          basePrice,
          sizes,
          extraIngredientPrices,
        })
      }
    >
      <div
        className="md:grid gap-4 items-start"
        style={{ gridTemplateColumns: "0.3fr 0.7fr" }}
      >
        <div className="">
          <EditableImage link={image} setLink={setImage} />
        </div>

        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            placeholder="Item name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Category</label>
          <select
            title="Category"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories?.map((category: any) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>

          <label>Base Price</label>
          <input
            type="text"
            placeholder="Base Price"
            value={basePrice || ""}
            onChange={(e) => setBasePrice(e.target.value)}
          />

          <MenuItemPriceProps
            name="Sizes"
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name="Extra ingredients"
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />

          <button type="submit">Update</button>
        </div>
      </div>
    </form>
  );
}

export default MenuItemForm;
