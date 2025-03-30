import { useEffect } from "react";
import { useProfile } from "../../lib/profileContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Text from "../ui/Text";

const ProfileView = ({ setIsOpen }) => {
  const { profile } = useProfile();

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="md:py-2 flex flex-col w-full items-center gap-4"
    >
      <h2 className="md:text-xl lg:text-2xl font-semibold text-blue-500 py-4 px-3">
        User Profile
      </h2>
      <img
        src={profile?.image}
        alt={profile?.fullname}
        className="w-52 h-52 object-top object-cover md:w-36 md:h-36  rounded-3xl"
      />
      <h2 className="text-2xl md:text-3xl capitalize font-semibold text-blue-500 py-2 px-3">
        {profile?.fullname}
      </h2>
      <Text className="border border-blue-300">{profile?.bio}</Text>

      <div className="flex border border-blue-300">
        <p
          scope="row"
          className="border-r border-blue-300 px-2 py-3 text-sm md:text-base font-medium text-black"
        >
          Email:
        </p>
        <p className="px-3 py-3 text-sm md:text-base">{profile?.email}</p>
      </div>
      <Link to="/profile" className="underline text-md text-black/70">
        Edit Profile
      </Link>
    </motion.div>
  );
};

export default ProfileView;
