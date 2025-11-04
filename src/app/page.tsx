import Image from "next/image";
import HaloBackground from "@/components/ui/HaloBackground";
import Hero from "@/components/home/Hero";
import FeatureGrid from "@/components/home/FeatureGrid";
import QCMSection from "@/components/home/QCMSection";
import Progression from "@/components/home/Progression";
import PricingFAQ from "@/components/home/PrincingFAQ";
import Testimonials from "@/components/home/Testimonials";
import TrainerTipPro from "@/components/home/TrainerTipPro";
import Footer from "@/components/home/Footer";
import Header from "@/components/layout/Header"; // ✅ nouveau
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PrépaForce",
  description: "PrépaForce — plateforme de révision et d'entraînement PA / GPX.",
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white antialiased">
      <HaloBackground />

      {/* ✅ Header dynamique */}
      <Header />

      {/* Sections principales */}
      <Hero />
      <FeatureGrid />
      <QCMSection />
      <Progression />
      <PricingFAQ />
      <Testimonials />
      <TrainerTipPro />
      <Footer />
    </main>
  );
}
