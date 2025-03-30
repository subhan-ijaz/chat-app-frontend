import { useNavigate, useSearchParams } from "react-router-dom";
import { useProfile } from "../../lib/profileContext";
import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";

const Users = ({ setIsOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, profile } = useProfile();
  const navigate = useNavigate();

  const handleClick = (id, profileId) => {
    // console.log("Clicked!");
    navigate(`/chat/?userid=${id}&q=${profileId}`);
  };

  return (
    <div className="md:py-2 h-full flex flex-col w-full">
      <h2 className="md:text-xl lg:text-2xl font-semibold text-blue-500 py-2 px-3">
        All Users
      </h2>
      {users?.map((user) => (
        <div
          className="w-full"
          onClick={() => {
            handleClick(user.userid, user?.id);
            setIsOpen(true);
          }}
          key={user?.id}
        >
          <ChatItem
            name={user?.fullname}
            id={user?.userid}
            profileId={user?.id}
            image={user?.image}
          />
        </div>
      ))}
      <div className="py-10"></div>
    </div>
  );
};

export default Users;
