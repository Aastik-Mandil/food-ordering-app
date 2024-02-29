"use client";

import React, { useState } from "react";
import { useProfile } from "../UseProfile";
import EditableImage from "./EditableImage";
import AddressInputs from "./AddressInputs";

function UserForm({ user, onSave }: { user: any | null; onSave: Function }) {
  const { data: loggedInUserData } = useProfile();
  const [userName, setUserName] = useState<string>(user?.name || "");
  const [image, setImage] = useState<string>(user?.image || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState<string>(
    user?.streetAddress || ""
  );
  const [postalCode, setPostalCode] = useState<string>(user?.postalCode || "");
  const [city, setCity] = useState<string>(user?.city || "");
  const [country, setCountry] = useState<string>(user?.country || "");
  const [admin, setAdmin] = useState<boolean>(user?.admin || false);

  function handleAddressChange(propName: String, value: any) {
    switch (propName) {
      case "phone":
        setPhone(value || "");
        break;
      case "streetAddress":
        setStreetAddress(value || "");
        break;
      case "postalCode":
        setPostalCode(value || "");
        break;
      case "city":
        setCity(value || "");
        break;
      case "country":
        setCountry(value || "");
        break;
    }
  }

  return (
    <div className="md:flex gap-4">
      <div className="">
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>

      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="text"
          value={user?.email || ""}
          placeholder="Email ID"
          disabled
        />

        <AddressInputs
          addressProps={{
            phone,
            streetAddress,
            postalCode,
            city,
            country,
          }}
          setAddressProps={handleAddressChange}
        />

        {loggedInUserData?.admin && (
          <div className="">
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                checked={admin || false}
                onChange={(e) => setAdmin(e.target.checked)}
              />
              Admin
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
