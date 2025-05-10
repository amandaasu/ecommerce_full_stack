import HeroSection from "./components/HeroSection";

import BrandsSection from "./components/BrandsSection";
import DealsSection from "./components/DealsSection";
import NewArrivalsSection from "./components/NewArrivalsSection";
import NewsletterSection from "./components/NewsletterSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Features from "./components/Features";
import ChatBot from "./components/ChatBot";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <DealsSection />
      <NewArrivalsSection />
      <Features />
      <TestimonialsSection />
      <NewsletterSection />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ChatBot />
      </div>
    </>
  );
}
