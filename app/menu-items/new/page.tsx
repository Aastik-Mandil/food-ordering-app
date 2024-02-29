"use client";

import React, { useState } from "react";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Left from "@/components/icons/Left";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";

function NewMenuItemPage() {
  const session = useSession();
  const { status } = session;
  const { loading: profilLoading, data: profileData } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState<boolean>(false);

  async function handleFormSubmit(e: any, data: Object) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve: Function, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
        setRedirectToItems(true);
      } else {
        reject();
      }
    });

    toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Item saved",
      error: "Error",
    });
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

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
    <section
      className="mt-8"
      // max-w-2xl mx-auto
    >
      <UserTabs isAdmin={profileData} />

      <div className="max-w-2xl mx-auto mt-8">
        <Link href="/menu-items" className="button">
          <Left />

          <span>Show all menu items</span>
        </Link>
      </div>

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
}

export default NewMenuItemPage;
