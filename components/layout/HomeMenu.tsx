"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuItems from "./menu/MenuItems";
import SectionHeaders from "./SectionHeaders";

function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBestSellers(data?.slice(-3));
      });
  }, []);

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt={"sallad"} />
        </div>

        <div className="absolute right-0 -top-[100px] -z-10">
          <Image src={"/sallad2.png"} width={107} height={195} alt={"sallad"} />
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"Check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers?.map((item: any) => (
            <MenuItems key={item?._id} menuItems={item} />
          ))}
      </div>
    </section>
  );
}

export default HomeMenu;
