import AppNotFound from "@/components/AppNotFound";
import { Metadata } from "next";

export default function NotFound() {
  return <AppNotFound message="Course not found!" />;
}

export const metadata: Metadata = {
  title: "Course not found",
  description: "The requested course does not exist.",
};
