"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import UserForm from "@/components/layout/UserForm";

function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [user, setUser] = useState(null);
  const [profileFetched, setProfileFetched] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (session && status === "authenticated") {
      // setImage(session?.data?.user?.image || "");
      fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data || {});
          setIsAdmin(data?.admin || false);
          setProfileFetched(true);
        });
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(e: any, data: Object) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve: Function, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved",
      error: "Error",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="block max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}

export default ProfilePage;
