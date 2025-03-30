import { createContext, useState, useContext } from "react";

// Create a single context
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    profile,
    setProfile: setProfile,
    users,
    setUsers: setUsers,
    isOpen,
    setIsOpen: setIsOpen,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// Hook to use the Profile context
export const useProfile = () => {
  return useContext(ProfileContext);
};
