import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ChatItem = (props) => {
  const { name, image } = props;

  return (
    <div className="hover:bg-blue-200 border-b-[1px] border-blue-300 cursor-pointer flex gap-4 items-center px-3 py-2">
      <img
        className="rounded-full w-[50px] h-[50px] cursor-pointer object-cover"
        src={image}
        alt=""
      />
      <h3 className="md:text-base">{name}</h3>
    </div>
  );
};

export default ChatItem;
