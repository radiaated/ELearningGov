import type { Metadata } from "next";
import ProfilePageWrapper from "./components/ProfilePageWrapper";

export const metadata: Metadata = {
  title: "Profile | Dur-Sanchar Elearning",
  description: `View and update your profile on Dur-Sanchar Elearning. Dur-Sanchar Elearning 
              is a leading government-provided e-learning platform dedicated to fostering 
              education and empowering individuals to reach their full potential. Our platform offers a
              wide range of online video courses, study materials in the form of
              PDFs, and software tools designed to enhance the learning
              experience.`,
};

export const ProfilePage = () => {
  return <ProfilePageWrapper />;
};

export default ProfilePage;
