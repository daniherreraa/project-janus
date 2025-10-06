"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gsap from "gsap";

export function MorpheusTabs({ data, renderSection }) {
  const [activeTab, setActiveTab] = useState("human_risks");
  const descRef = useRef(null); // referencia al texto descriptivo
  const tabContentRef = useRef(null); // referencia al contenido para la animación blur

  const tabBase =
    "truncate transition-all duration-300 text-xs sm:text-sm uppercase font-technor font-semibold tracking-wide text-white/70 " +
    "data-[state=active]:text-white data-[state=active]:bg-white/20 " +
    "hover:text-white border border-transparent data-[state=active]:border-white/40 " +
    "rounded-md backdrop-blur-md";

  const getWidthClass = (tab) => {
    if (activeTab === tab) return "flex-[2] sm:flex-[1.5] px-3 sm:px-5";
    return "flex-1 px-2 sm:px-3";
  };

  // 🌌 Transición visual al cambiar de tab
  useEffect(() => {
    if (!tabContentRef.current) return;
    const el = tabContentRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, filter: "blur(8px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }
    );
  }, [activeTab]);

  // 📱 Desvanecimiento progresivo del texto descriptivo en mobile
  useEffect(() => {
    const desc = descRef.current;
    if (!desc) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 20;
      const fadeEnd = 180;
      const opacity = Math.max(
        0,
        Math.min(1, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart))
      );
      desc.style.opacity = opacity.toString();
    };

    if (window.innerWidth < 640) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Tabs
      defaultValue="human_risks"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      {/* Tabs header */}
      <TabsList className="flex w-full justify-between items-center gap-2 sm:gap-3 mb-6 bg-white/5 backdrop-blur-xl p-1 rounded-lg border border-white/20">
        <TabsTrigger
          value="human_risks"
          className={`${tabBase} ${getWidthClass("human_risks")}`}
        >
          Human Risks
        </TabsTrigger>

        <TabsTrigger
          value="plants"
          className={`${tabBase} ${getWidthClass("plants")}`}
        >
          Plants & Microbes
        </TabsTrigger>

        <TabsTrigger
          value="research"
          className={`${tabBase} ${getWidthClass("research")}`}
        >
          Research
        </TabsTrigger>
      </TabsList>

      {/* Tabs content */}
      <div ref={tabContentRef}>
        <TabsContent value="human_risks" className="animate-fade-in">
          <div ref={descRef} className="mb-6">
            <h2 className="font-technor font-semibold text-2xl md:text-3xl lg:text-4xl mb-2 text-white">
              Human Risks
            </h2>
            <p className="font-supreme text-white/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl">
              Here, you can find information about the different risks astronauts
              face during missions — from radiation exposure, bone density loss,
              and immune system weakening to behavioral and cognitive challenges.
            </p>
          </div>

          {renderSection("", data?.human_risks, "human_risks", "risk")}
        </TabsContent>

        <TabsContent value="plants" className="animate-fade-in">
          <div ref={descRef} className="mb-6">
            <h2 className="font-technor font-semibold text-2xl md:text-3xl lg:text-4xl mb-2 text-white">
              Plants & Microbes
            </h2>
            <p className="font-supreme text-white/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl">
              Here, you can explore how plants and microorganisms adapt to the
              extreme conditions of space — including microgravity, radiation, and
              limited light cycles that shape their growth and interaction.
            </p>
          </div>

          {renderSection("", data?.plant_and_microbe_factors, "plants", "plant")}
        </TabsContent>

        <TabsContent value="research" className="animate-fade-in">
          <div ref={descRef} className="mb-6">
            <h2 className="font-technor font-semibold text-2xl md:text-3xl lg:text-4xl mb-2 text-white">
              Research Opportunities
            </h2>
            <p className="font-supreme text-white/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl">
              Here, you can discover NASA’s ongoing and upcoming research focused
              on biological experiments in orbit — from tissue regeneration and
              gene expression to long-term adaptation in microgravity.
            </p>
          </div>

          {renderSection("", data?.research_opportunities, "research", "research")}
        </TabsContent>
      </div>
    </Tabs>
  );
}
