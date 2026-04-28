import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Story from "@/components/landing/Story";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCta from "@/components/landing/FinalCta";
import SocialProof from "@/components/landing/SocialProof";
import UseCases from "@/components/landing/UseCases";
import PricingTeaser from "@/components/landing/PricingTeaser";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SocialProof />
      <Story />
      <Features />
      <HowItWorks />
      <UseCases />
      <PricingTeaser />
      <FinalCta />
      <Footer />
    </div>
  );
};

export default Index;
