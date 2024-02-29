"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

function EditMenuItemPage({ params }: { params: { id: string } }) {
  const session = useSession();
  const { status } = session;
  const { loading: profilLoading, data: profileData } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState<boolean>(false);

  useEffect(() => {
    if (params?.id) {
      fetch(`/api/menu-items/${params?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((item) => {
          setMenuItem(item || {});
        });
    }
  }, [params?.id]);

  async function handleFormSubmit(e: any, data: Object) {
    e.preventDefault();
    data = { _id: params?.id, ...data };
    const savingPromise = new Promise(async (resolve: Function, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setMenuItem(null);
        resolve();
        setRedirectToItems(true);
      } else {
        reject();
      }
    });

    toast.promise(savingPromise, {
      loading: "Updating this tasty item",
      success: "Item updated",
      error: "Error",
    });
  }

  async function handleDeleteClick() {
    const deletePromise = new Promise(async (resolve: Function, reject) => {
      const response = await fetch(`/api/menu-items?_id=${params?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(deletePromise, {
      loading: "Menu item deleting...",
      success: "Menu item deleted",
      error: "Error",
    });

    setRedirectToItems(true);
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

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />

      <div className="max-w-2xl mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}

export default EditMenuItemPage;
