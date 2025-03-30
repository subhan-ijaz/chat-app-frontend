import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import MobileNav from "../components/ui/MobileNav";
import { useProfile } from "../lib/profileContext";
import Header from "../components/ui/Header";
import { AnimatePresence, motion } from "framer-motion";
import { getProfile, getProfiles } from "../lib/actions";
import Users from "../components/ui/Users";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Chat from "../components/ui/Chat";
import clsx from "clsx";
import ProfileView from "../components/ui/ProfileView";

const Chats = () => {
  const { profile, setProfile, setUsers, isOpen, setIsOpen } = useProfile();
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");
  const [check, setCheck] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const uuid = localStorage.getItem("uuid");

      try {
        const res = await getProfile(uuid);
        setProfile(res);

        const profiles = await getProfiles();
        setUsers(profiles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ stiffness: 100, duration: 0.7, ease: "easeInOut" }}
      className="p-0 md:p-2 h-screen md:h-[97vh] flex justify-start sm:flex-row flex-col rounded-3xl shadow-n gap-3 bg-blue-400"
    >
      <Header fullname={profile?.fullname} img={profile?.image} />

      <Sidebar
        setOpen={setIsOpen}
        setCheck={setCheck}
        fullname={profile?.fullname}
        img={profile?.image}
      />

      <div className="w-full sm:h-full md:w-[40%] lg:w-[25%] rounded-3xl overflow-y-auto border-[1px] border-blue-300 h-[90%] bg-white">
        {location.pathname === "/profileview" ? (
          <ProfileView setIsOpen={setIsOpen} />
        ) : (
          <Users setIsOpen={setCheck} />
        )}
      </div>

      <AnimatePresence>
        {check && location.pathname !== "/profileview/" && (
          <motion.div
            key={isOpen}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ stiffness: 100, duration: 0.3, ease: "easeInOut" }}
            className={clsx(
              "lg:w-[70%] md:w-[60%] rounded-3xl bg-white border-[1px] border-blue-300 md:flex md:static absolute w-full sm:w-[89%] right-0 top-0 h-full overflow-hidden"
            )}
          >
            {location.pathname == "/chat/" && (
              <Chat key={userid} setIsOpen={setCheck} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile nav */}
      {!check && <MobileNav setCheck={setCheck} />}
    </motion.div>
  );
};

export default Chats;
