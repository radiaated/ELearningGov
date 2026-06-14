import type { Metadata } from "next";

import LoginPageWrapper from "./components/LoginPageWrapper";

export const metadata: Metadata = {
  title: "Login | Dur-Sanchar Elearning",
  description: `Login to Dur-Sanchar Elearning. Dur-Sanchar Elearning is a leading 
              government-provided e-learning platform dedicated to fostering education 
              and empowering individuals to reach their full potential. Our platform offers a
              wide range of online video courses, study materials in the form of
              PDFs, and software tools designed to enhance the learning
              experience.`,
};

const LoginPage = () => {
  return <LoginPageWrapper />;
};

export default LoginPage;
