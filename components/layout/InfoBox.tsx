import React, { ReactNode } from "react";

function InfoBox({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
      {children}
    </h2>
  );
}

export default InfoBox;
