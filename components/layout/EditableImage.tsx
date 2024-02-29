import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function EditableImage({ link, setLink }: { link: string; setLink: Function }) {
  async function handleFileChange(e: any) {
    const files = e.target.files;
    if (files.length > 0) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = new Promise(async (resolve: Function, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (response.ok) {
          const link = await response.json();
          setLink(link);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload completed",
        error: "Upload error",
      });
    }
  }

  return (
    <>
      {link ? (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link || ""}
          width={250}
          height={250}
          alt="avatar"
        />
      ) : (
        <div className="bg-gray-200 p-4 text-center text-gray-500 rounded-lg">
          No image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />

        <span className="border rounded-lg p-2 block text-center border-gray-300 cursor-pointer">
          Edit image
        </span>
      </label>
    </>
  );
}

export default EditableImage;
