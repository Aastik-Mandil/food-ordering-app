import React from "react";

function AddressInputs({
  disabled = false,
  addressProps,
  setAddressProps = () => {},
}: {
  disabled?: Boolean | null | undefined;
  addressProps: any;
  setAddressProps?: Function;
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone Number"
        value={phone || ""}
        onChange={(e) => setAddressProps("phone", e.target.value)}
      />

      <label>Street address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street address"
        value={streetAddress || ""}
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            // style={{ margin: 0 }}
            value={postalCode || ""}
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
          />
        </div>

        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            // style={{ margin: 0 }}
            value={city || ""}
            onChange={(e) => setAddressProps("city", e.target.value)}
          />
        </div>
      </div>

      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country || ""}
        onChange={(e) => setAddressProps("country", e.target.value)}
      />
    </>
  );
}

export default AddressInputs;
