"use client";

import React, { Key, useState } from "react";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}: {
  name: String;
  addLabel: String;
  props: [];
  setProps: Function;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function addProp() {
    setProps((oldProps: any) => [...oldProps, { name: "", price: 0 }]);
  }

  function editProp(e: any, index: Key | any, key: String | any) {
    setProps((prevProps: any) => {
      const newProps = [...prevProps];
      newProps[index][key] = e.target.value;
      return newProps;
    });
    // prevProps?.map((s, ind) => (i === ind ? { ...s, [key]: e.target.value } : s))
  }

  function removeProp(index: Key) {
    setProps((prevProps: any) =>
      prevProps?.filter((_: any, ind: Key) => index !== ind)
    );
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        className="inline-flex p-1 border-0 justify-start"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}

        <span>{name}</span>

        <span>({props?.length || 0})</span>
      </button>

      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props?.map((size: any, i: Key) => (
            <div key={i} className="flex items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={size?.name || ""}
                  onChange={(e) => {
                    editProp(e, i, "name");
                  }}
                />
              </div>

              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size?.price || ""}
                  onChange={(e) => {
                    editProp(e, i, "price");
                  }}
                />
              </div>

              <div>
                <button
                  type="button"
                  className="bg-white px-2 mb-2"
                  onClick={() => removeProp(i)}
                >
                  <Trash />
                  {""}
                </button>
              </div>
            </div>
          ))}

        <button
          type="button"
          onClick={() => {
            addProp();
          }}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />

          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}

export default MenuItemPriceProps;
