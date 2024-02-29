"use client";

import React, { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { useProfile } from "@/components/UseProfile";
import { redirect } from "next/navigation";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Image from "next/image";

function MenuItemsPage() {
  const session = useSession();
  const { status } = session;
  const { loading: profilLoading, data: profileData } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => {
        setMenuItems(items);
      });
  }, []);

  if (status === "loading" || profilLoading) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  if (!profileData && !profilLoading) {
    // return redirect("/profile");
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData} />

      <div className="mt-8">
        <Link className="button flex" href="/menu-items/new">
          Crete new menu item
          <Right />
        </Link>
      </div>

      <div className="">
        <h2 className="text-sm text-gray-500 mt-4">Edit menu item</h2>

        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems?.map((item: any) => (
              <Link
                key={item?._id}
                className="bg-gray-300 rounded-lg p-4"
                href={`/menu-items/edit/${item?._id}`}
              >
                {item?.image && (
                  <div className="relative w-24 h-24">
                    <Image
                      className="rounded-md"
                      src={item?.image}
                      alt={item?.name}
                      width={100}
                      height={100}
                    />
                  </div>
                )}

                <div className="text-center">{item?.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MenuItemsPage;
