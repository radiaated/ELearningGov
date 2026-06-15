import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full mx-auto py-6 font-black text-zinc-50 text-center shadow bg-primary-dark">
        Admin Panel
      </div>
      {children}
    </>
  );
};

export default layout;
