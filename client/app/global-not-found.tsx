import type { Metadata } from "next";
import AppNotFound from "../components/AppNotFound";
import Header from "./(root)/components/Header";
import Footer from "./(root)/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Not Found | Dur-Sanchar Elearning",
  description:
    "The page you are looking for does not exist. - Dur-Sanchar Elearning",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-[calc(100vh-6.5rem)] mt-44">
          <AppNotFound message="Page not found!" />
        </div>
        <Footer />
      </body>
    </html>
  );
}
