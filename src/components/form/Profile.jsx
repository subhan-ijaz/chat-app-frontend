import { useLayoutEffect, useState } from "react";
import { Form, Formik } from "formik";
import FormikControl from "../formik-ui/FormikControl";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../lib/actions";
import Loading from "../ui/Loading";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  // Get initial profile data
  useLayoutEffect(() => {
    setLoading(true);
    setProfile();
  }, []);

  async function setProfile() {
    try {
      const uuid = localStorage.getItem("uuid");
      console.log(uuid);
      const profileData = await getProfile(uuid);
      setProfileData(profileData);
      setImagePreview(profileData?.image || "");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  }

  const initialValues = {
    image: null,
    bio: profileData?.bio || "",
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      setLoading(true);
      console.log(values);

      if (values.image) formData.append("image", values.image);
      formData.append("bio", values.bio);
      console.log(profileData.id);

      const res = await updateProfile(formData, profileData.id);

      if (res.success) {
        console.log(res.success);
        setProfile();
        navigate("/");
      } else {
        console.log("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* loading logic */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen absolute bg-white top-0 left-0 grid place-content-center"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      {/* profile form */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, stiffness: 100, ease: "easeIn" }}
          className="flex flex-col gap-4 mx-auto w-11/12 md:w-[500px] sm:p-6 rounded-lg"
        >
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => (
              <Form className="w-full flex items-center flex-col gap-4">
                <div className="text-center pb-4 flex flex-col space-y-2 md:space-x-4">
                  <img
                    src={
                      imagePreview ||
                      (formik.values.image
                        ? URL.createObjectURL(formik.values.image)
                        : "")
                    }
                    alt={profileData?.fullname}
                    className="w-28 h-28 object-cover md:w-36 md:h-36  rounded-3xl"
                  />
                </div>
                <div className="capitalize text-center pb-4 flex flex-col space-y-2 md:space-x-4">
                  <Heading>{profileData?.fullname}</Heading>
                  <Text align="center">
                    Complete your profile before getting started
                  </Text>
                </div>

                <FormikControl
                  control="file"
                  label="Image"
                  name="image"
                  setImagePreview={setImagePreview} // Set the image preview URL
                />

                <FormikControl control="textarea" label="Bio" name="bio" />
                {formik.isSubmitting && console.log("Submitting!")}
                <Button type="submit">Setup Profile</Button>
                <Link to="/" className="underline">
                  Continue
                </Link>
              </Form>
            )}
          </Formik>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Profile;
