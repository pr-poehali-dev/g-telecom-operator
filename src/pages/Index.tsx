import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/components/GTelecomData";
import { NetworkBackground, NavBar, Footer } from "@/components/GTelecomLayout";
import { Hero, Services, Tariffs, Coverage, Blog, Support, Contacts, About } from "@/components/GTelecomSections";
import { Cabinet } from "@/components/GTelecomCabinet";

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [cabinetOpen, setCabinetOpen] = useState(false);

  const scrollTo = (id: string) => {
    if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = ["hero", ...NAV_LINKS.map(n => n.id)];
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-white">
      <NetworkBackground />
      <NavBar activeSection={activeSection} onNav={scrollTo} onCabinet={() => setCabinetOpen(true)} />
      <Hero onNav={scrollTo} />
      <Services />
      <Tariffs />
      <Coverage />
      <Blog />
      <Support />
      <Contacts />
      <About />
      <Footer onNav={scrollTo} />
      {cabinetOpen && <Cabinet onClose={() => setCabinetOpen(false)} />}
    </div>
  );
}
