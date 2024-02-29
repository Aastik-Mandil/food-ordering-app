"use client";

import React, { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

function CategoriesPage() {
  const session = useSession();
  const { status } = session;
  const { loading: profilLoading, data: profileData } = useProfile();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState<string | null | undefined>(
    ""
  );
  const [editedCategory, setEditedCategory] = useState<any>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }

  async function handleCategorySubmit(e: any) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve: Function, reject) => {
      let data: any = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory?._id;
      }
      const response: any = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setCategoryName("");
        fetchCategories();
        setEditedCategory(null);
        resolve();
      } else {
        reject();
      }

      await toast.promise(creationPromise, {
        loading: editedCategory
          ? "Updating category..."
          : "Creating your new category...",
        success: editedCategory ? "Category updated" : "Category created",
        error: "Error, sorry...",
      });
    });
  }

  async function handleDeleteClick(id: String) {
    const deletePromise = new Promise(async (resolve: Function, reject) => {
      const response: any = fetch(`/api/categories?_id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchCategories();
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(deletePromise, {
      loading: "Category deleting...",
      success: "Category deleted",
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

      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New category name"}

              {editedCategory && (
                <>
                  : <b>{editedCategory?.name || ""}</b>
                </>
              )}
            </label>
            <input
              type="text"
              placeholder="Category name"
              value={categoryName || ""}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="pb-2 flex gap-2">
            <button type="submit" className="border border-primary">
              {editedCategory ? "Update" : "Create"}
            </button>

            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>

        {categories?.length > 0 &&
          categories?.map((c: any) => (
            <div
              key={c?._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c?.name}</div>

              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c?.name);
                  }}
                >
                  Edit
                </button>

                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(c?._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default CategoriesPage;
