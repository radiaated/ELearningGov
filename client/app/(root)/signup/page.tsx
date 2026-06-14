import type { Metadata } from "next";

import SingupPageWrapper from "./components/SingupPageWrapper";

export const metadata: Metadata = {
  title: "Singup | Dur-Sanchar Elearning",
  description: `Singup to Dur-Sanchar Elearning. Dur-Sanchar Elearning is a 
              leading government-provided e-learning platform dedicated to fostering 
              education and empowering individuals to reach their full potential.
              Our platform offers a wide range of online video courses, study materials 
              in the form of PDFs, and software tools designed to enhance the learning
              experience.`,
};

export default function SignupPage() {
  return <SingupPageWrapper />;
}
