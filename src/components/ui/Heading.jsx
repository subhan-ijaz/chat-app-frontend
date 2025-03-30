import React from "react";

const Heading = ({ children }) => {
  return (
    <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
      {children}
    </h2>
  );
};

export default Heading;
