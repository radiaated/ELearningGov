import CoursesForYouSection from "./components/CoursesForYouSection";
import CoursesForYouSectionSkeleton from "./components/CoursesForYouSectionSkeleton";
import { Suspense } from "react";
import CategoriesSection from "./components/CategoriesSection";
import ImageSliderSection from "./components/ImageSliderSection";
import TestimonialsSection from "./components/TestimonialsSection";

const HomePage = () => {
  return (
    <>
      <ImageSliderSection />
      <Suspense fallback={<CoursesForYouSectionSkeleton />}>
        <CoursesForYouSection />
      </Suspense>
      <TestimonialsSection />
      <CategoriesSection />
    </>
  );
};

export default HomePage;
