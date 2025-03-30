import { Navigate } from "react-router-dom";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN, UUID } from "./constants";
import { useProfile } from "./profileContext";

const getUser = async () => {
  try {
    const res = await api.get("/api/users/");
    return res.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const getProfiles = async () => {
  try {
    const res = await api.get("/api/profile/");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (values) => {
  const { email, password } = values;

  try {
    const res = await api.post("/api/users/", values);

    if (res.status === 201) {
      await login(email, password);

      return { success: true };
    }
  } catch (error) {
    console.error(error);
    alert("Registration failed");
  }
};

// login user
export const login = async (email, password) => {
  try {
    const res = await api.post("/api/token/", { email, password });

    if (res.status === 200) {
      // save the tokens
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      const { id, email } = await getUser(); // fetch user data after successful login
      console.log(id, email);

      localStorage.setItem(UUID, id);

      return { success: true, message: "Login successful" };
    }
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

export const logout = (navigate) => {
  localStorage.clear();
  navigate("/login");
};

export const getProfile = async (uuid) => {
  try {
    const res = await api.get(`/api/profile/?user_uuid=${uuid}`);
    if (res.status === 200) {
      return res.data[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (formData, id) => {
  try {
    console.log("Sending");

    const res = await api.patch(`/api/profile/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data);

    if (res.status === 200) {
      console.log("Sent response");
      return { success: true, message: "Login successful" };
    } else {
      console.log("error: ");
      return { success: false, message: "Failed to update profile" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async () => {
  try {
    const res = await api.get(`/chat/messages/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
