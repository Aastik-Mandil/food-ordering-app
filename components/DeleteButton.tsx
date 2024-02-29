"use client";

import React, { useState } from "react";

function DeleteButton({
  label,
  onDelete,
}: {
  label: String;
  onDelete: Function;
}) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 items-center justify-center h-full inset-0">
        <div className="bg-white p-4 rounded-lg">
          <div className="">Are you sure you want to delete?</div>

          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>

            <button
              type="button"
              className="primary"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}

export default DeleteButton;
