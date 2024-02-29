"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItems from "@/components/layout/menu/MenuItems";
import React, { useEffect, useState } from "react";

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

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
    fetch("/api/menu-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
      });
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories?.map((c: any) => (
          <div key={c?._id} className="">
            <div className="text-center">
              <SectionHeaders mainHeader={c?.name} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {/* // <div > */}
              {menuItems
                ?.filter((item: any) => item?.category === c?._id)
                ?.map((item: any) => (
                  <MenuItems key={item?._id} menuItems={item} />
                ))}
              {/* // </div> */}
            </div>
          </div>
        ))}
    </section>
  );
}

export default MenuPage;
