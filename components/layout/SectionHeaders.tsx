import React from "react";

function SectionHeaders({
  subHeader,
  mainHeader,
}: {
  subHeader?: string | null | undefined;
  mainHeader?: string | null | undefined;
}) {
  return (
    <>
      {subHeader && (
        <h3 className="uppercase text-gray-600 font-semibold leading-4">
          {subHeader}
        </h3>
      )}

      {mainHeader && (
        <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
      )}
    </>
  );
}

export default SectionHeaders;
