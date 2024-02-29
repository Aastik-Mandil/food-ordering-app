"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/components/UseProfile";
import { redirect } from "next/navigation";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import toast from "react-hot-toast";

function EditUserPage({ params }: { params: { id: String } }) {
  const session = useSession();
  const { status } = session;
  const { loading: profilLoading, data: profileData } = useProfile();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (params?.id) {
      fetch(`/api/users?_id=${params?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [params?.id]);

  async function handleSaveButtonClick(e: any, data: Object) {
    e.preventDefault();

    const updatePromise = new Promise(async (resolve: Function, reject) => {
      const response: any = fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: params?.id }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(updatePromise, {
      loading: "User details updating...",
      success: "User details updated",
      error: "Error",
    });
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
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData} />

      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}

export default EditUserPage;
