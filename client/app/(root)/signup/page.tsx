import type { Metadata } from "next";
import SingupPageClient from "./components/SingupPageClient";

export const metadata: Metadata = {
  title: "Singup | Dur-Sanchar Elearning",
  description: `Singup to Dur-Sanchar Elearning, a leading government-provided e-learning
              platform dedicated to fostering education and empowering
              individuals to reach their full potential. Our platform offers a
              wide range of online video courses, study materials in the form of
              PDFs, and software tools designed to enhance the learning
              experience.`,
};

export default function SignupPage() {
  return <SingupPageClient />;
}
