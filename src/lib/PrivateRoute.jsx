/* eslint-disable react/prop-types */
import api from "./api";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../components/ui/Loading";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // decode the token
    const decoded = jwtDecode(token);
    const tokenExporession = decoded.exp;
    const now = new Date() / 1000;

    // check if token is expired, if yes, refresh it
    if (tokenExporession < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  // if not authorized then render loading
  if (isAuthorized === null)
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Smooth transition duration
          className="w-full h-screen absolute bg-white top-0 left-0 grid place-content-center"
        >
          <Loading />
        </motion.div>
      </AnimatePresence>
    );

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
