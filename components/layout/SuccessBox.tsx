import React, { ReactNode } from "react";

function SuccessBox({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
      {children}
    </h2>
  );
}

export default SuccessBox;
