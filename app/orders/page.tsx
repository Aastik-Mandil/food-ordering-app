"use client";

import React, { Key, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";

function OrdersPage() {
  const session = useSession();
  const { status } = session;
  const { loading: profilLoading, data: profileData } = useProfile();
  const [loadingOrders, setLoadingOrders] = useState<Boolean>(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.reverse());
        setLoadingOrders(false);
      })
      .catch((err) => {
        setLoadingOrders(false);
      });
  }

  if (status === "loading" || profilLoading || loadingOrders) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData} />

      <div className="mt-8">
        {orders?.length > 0 &&
          orders?.map((order: any) => (
            <div
              key={order?._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center cursor-pointer gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div className="">
                  <div
                    className={`${
                      order?.paid ? "bg-green-500" : "bg-red-400"
                    } p-2 rounded-md text-white w-24 text-center`}
                  >
                    {order?.paid ? "Paid" : "Not paid"}
                  </div>
                </div>

                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order?.userEmail}</div>

                    <div className="text-gray-500 text-xs">
                      {dbTimeForHuman(order?.createdAt)}
                    </div>
                  </div>

                  <div className="text-gray-500 text-sm">
                    {order?.cartProducts?.map((p: any) => p?.name?.join(", "))}
                  </div>
                </div>
              </div>

              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={`/orders/${order._id}`} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default OrdersPage;
