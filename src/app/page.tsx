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
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "PrépaForce",
  description: "PrépaForce — plateforme de révision et d'entraînement PA / GPX.",
};
;

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white antialiased">
      <HaloBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo/logo.png"
              alt="Logo PrépaForce"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-sm font-semibold text-white/90">PrépaForce</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/60 md:flex">
            <a href="#fiches" className="hover:text-white">Fiches</a>
            <a href="#qcm" className="hover:text-white">QCM</a>
            <a href="#videos" className="hover:text-white">Vidéos</a>
            <a href="#situations" className="hover:text-white">Mises en situation</a>
            <a href="#progression" className="hover:text-white">Progression</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/80 hover:border-white/25 hover:text-white"
            >
              Se connecter
            </a>
            <a
              href="#get-started"
              className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-white/90"
            >
              Créer un compte
            </a>
          </div>
        </div>
      </header>

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
