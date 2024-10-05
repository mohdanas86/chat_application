import React from "react";

const Loding = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export default Loding;
