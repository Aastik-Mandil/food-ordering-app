"use client";

import React, { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { useProfile } from "@/components/UseProfile";
import { redirect } from "next/navigation";
import Link from "next/link";

function UsersPage() {
  const session = useSession();
  const { status } = session;
  const { loading: profilLoading, data: profileData } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
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
        {users?.length > 0 &&
          users?.map((user: any) => (
            <div
              key={user?._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {user?.name ? (
                    <span className="">{user?.name}</span>
                  ) : (
                    <span className="italic">No name</span>
                  )}
                </div>

                <span className="text-gray-500">{user?.email}</span>
              </div>

              <div className="">
                <Link className="button" href={`/users/${user?._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default UsersPage;
