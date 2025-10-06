"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { NavBar } from "@/components/ui/navbar";
import { DestinySelector } from "@/components/morpheus/destinyselector";
import PixelImage from "@/components/ui/pixelimage";
import morpheusData from "@/lib/morpheusdata";
import { MorpheusCard } from "@/components/morpheus/morpheuscard";
import { ArrowLeft } from "lucide-react";
import { MiniPlanet } from "@/components/morpheus/miniplanet";
import { MorpheusTabs } from "@/components/morpheus/morpheustabs";
import { MorpheusCarousel } from "@/components/morpheus/morpheuscarousel";
import { EnvironmentInfo } from "@/components/morpheus/environmentinfo";

export default function MorpheusPage() {
  const [destination, setDestination] = useState("moon");
  const [previousDestination, setPreviousDestination] = useState(null);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedSection, setExpandedSection] = useState({});
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);

  const getCollectionByType = (type) => {
    if (type === "risk") return data?.human_risks;
    if (type === "plant") return data?.plant_and_microbe_factors;
    if (type === "research") return data?.research_opportunities;
    return [];
  };

  const handleSelectFromCarousel = (item) => setSelectedItem(item);

  const bgImages = {
    moon: "https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/morpheus-moon.png",
    mars: "https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/morpheus-mars.png",
  };

  // primera carga automática
  useEffect(() => {
    const initialData = morpheusData.find((d) => d.target === "moon");
    if (initialData) setData(initialData);
    setPreviousDestination("moon");
    setTimeout(() => setLoading(false), 800); // breve animación de entrada
  }, []);

  // background transitions
  useEffect(() => {
    if (!previousDestination) return;
    const container = containerRef.current;
    const newImage = container.querySelector(`[data-bg="${destination}"]`);
    const oldImage = container.querySelector(
      `[data-bg="${previousDestination}"]`
    );
    if (!newImage || !oldImage) return;

    gsap.set(newImage, { opacity: 0, zIndex: 2 });
    gsap.set(oldImage, { opacity: 1, zIndex: 1 });

    gsap
      .timeline()
      .to(newImage, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0)
      .to(
        oldImage,
        {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => setPreviousDestination(destination),
        },
        0
      );

    setData(morpheusData.find((d) => d.target === destination));
    setLoading(false);
  }, [destination]);

  useEffect(() => {
    if (!previousDestination) setPreviousDestination(destination);
  }, [destination, previousDestination]);

  const handleBack = () => setSelectedItem(null);

  // unified section rendering (for all types)
  const renderSection = (title, items, key, type) => {
    if (!items?.length) return null;
    const showAll = expandedSection[key];
    const visibleItems = showAll ? items : items.slice(0, 5);

    return (
      <section className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-technor font-semibold text-xl text-white">
            {title}
          </h2>
          {items.length > 5 && (
            <>
              {/* Botón superior — siempre visible (desktop y mobile) */}
              <button
                className="relative group overflow-hidden text-xs sm:text-sm font-supreme tracking-wide text-white/80 hover:text-white 
                 px-4 py-2 border border-white/40 hover:border-white/60 rounded-md 
                 transition-all duration-300 backdrop-blur-md bg-white/5 hover:bg-white/10 
                 hidden sm:inline-flex"
                onClick={() =>
                  setExpandedSection({ ...expandedSection, [key]: !showAll })
                }
              >
                <span className="relative z-10 flex items-center gap-2">
                  {showAll ? "Show less" : "Show more"}
                  <span
                    className={`transition-transform duration-300 ${
                      showAll ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Botón inferior — solo visible en mobile */}
              <div className="flex justify-center mt-6 sm:hidden">
                <button
                  className="relative group overflow-hidden text-sm font-supreme tracking-wide text-white/80 hover:text-white 
                   px-6 py-2 border border-white/40 hover:border-white/60 rounded-md 
                   transition-all duration-300 backdrop-blur-md bg-white/5 hover:bg-white/10 
                   shadow-sm shadow-black/20"
                  onClick={() =>
                    setExpandedSection({ ...expandedSection, [key]: !showAll })
                  }
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {showAll ? "Show less" : "Show more"}
                    <span
                      className={`transition-transform duration-300 ${
                        showAll ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </>
          )}
        </div>

        <div
          id={`${key}-container`}
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:_balance] w-full"
        >
          {visibleItems.map((item, i) => {
            const isResearch = type === "research";

            return (
              <div
                key={i}
                className="break-inside-avoid mb-4 cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={
                  !isResearch
                    ? () => setSelectedItem({ ...item, type })
                    : undefined
                }
              >
                <MorpheusCard item={item} type={type} />
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-svw h-svh overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          key={destination}
          data-bg={destination}
          className="absolute inset-0"
        >
          <PixelImage src={bgImages[destination]} alt={destination} />
        </div>
        {previousDestination && previousDestination !== destination && (
          <div
            key={previousDestination}
            data-bg={previousDestination}
            className="absolute inset-0"
          >
            <PixelImage
              src={bgImages[previousDestination]}
              alt={previousDestination}
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <NavBar />

        {/* Contenedor adaptable */}
        <div className="pt-20 px-4 md:px-6 w-full h-full flex flex-col lg:flex-row overflow-hidden gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-[clamp(220px,20vw,320px)] flex-shrink-0 lg:h-full lg:pr-6 flex flex-col justify-start lg:justify-between border-b lg:border-b-0 lg:border-r border-white/30 pb-4 lg:pb-0">
            <div className="flex flex-row items-center justify-between lg:flex-col lg:items-stretch">
              <div
                id="selectorPlanetContainer"
                className="h-20 lg:w-full lg:h-fit lg:pb-4 flex flex-row p-3 lg:p-0 gap-3 lg:gap-0 lg:flex-col justify-start items-center bg-white/10 border border-white/30 rounded-lg backdrop-blur-[10px]"
              >
                <div
                  id="planetModelContainer"
                  className="w-16 h-16 md:h-20 md:w-full lg:w-full lg:h-64 flex items-center justify-center overflow-hidden"
                >
                  <MiniPlanet
                    planet={destination === "moon" ? "moon" : "mars"}
                  />
                </div>

                <div className="h-fit lg:-mt-10 flex flex-col justify-center lg:items-center">
                  <DestinySelector
                    value={destination}
                    onChange={setDestination}
                    small
                  />
                  <p className="text-white/60 text-sm -mt-3 lg:-mt-2 font-supreme tracking-wide">
                    Destination
                  </p>
                </div>
              </div>

              {/* Environment collapsibles */}
              <div
                id="enviromentInfoContainer"
                className="lg:w-full max-w-sm mx-0 lg:mx-0"
              >
                <EnvironmentInfo environment={data?.environment} />
              </div>
            </div>
          </aside>

          {/* Content */}
          <main
            className="flex-1 h-full overflow-y-auto px-2 md:px-6"
            style={{ scrollbarGutter: "stable" }}
          >
            {!selectedItem ? (
              <MorpheusTabs data={data} renderSection={renderSection} />
            ) : (
              <div className="animate-fade-in min-h-full flex flex-col relative">
                {/* Contenido scrolleable */}
                <div className="flex-1 overflow-y-auto pb-28 sm:pb-36">
                  <div className="mb-6 px-2 sm:px-4">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 mb-4 font-technor font-semibold text-white hover:text-white transition"
                    >
                      <ArrowLeft size={18} /> Back
                    </button>

                    <h2 className="font-technor font-semibold text-2xl sm:text-3xl lg:text-4xl mb-3 text-white">
                      {selectedItem.type === "risk" && (
                        <>
                          Human Risks:{" "}
                          <span className="text-white">
                            /{selectedItem.category}
                          </span>
                        </>
                      )}
                      {selectedItem.type === "plant" && (
                        <>
                          Plant & Microbes:{" "}
                          <span className="text-white">
                            /{selectedItem.category}
                          </span>
                        </>
                      )}
                      {selectedItem.type === "research" && (
                        <>
                          Research: <span className="text-white">/Focus</span>
                        </>
                      )}
                    </h2>

                    {/* contenido dinámico actual */}
                    {selectedItem.type === "risk" && (
                      <>
                        <p className="text-white/80 mb-4 font-supreme leading-relaxed max-w-5xl">
                          {selectedItem.mechanism}
                        </p>
                        <p className="text-white/90 mb-6 font-supreme leading-relaxed max-w-5xl">
                          {selectedItem.observed_effects}
                        </p>
                        {selectedItem.countermeasures?.length > 0 && (
                          <div>
                            <h3 className="font-technor font-semibold text-lg text-white mb-2">
                              Learn Countermeasures
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-white/80 text-base font-supreme">
                              {selectedItem.countermeasures.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {selectedItem.type === "plant" && (
                      <>
                        <p className="text-white/80 mb-6 font-supreme leading-relaxed max-w-5xl">
                          {selectedItem.impact}
                        </p>
                        <div>
                          <h3 className="font-technor text-lg text-white mb-2">
                            Solutions
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-white/80 text-sm font-supreme">
                            {selectedItem.solutions?.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}

                    {selectedItem.type === "research" && (
                      <p className="text-white/90 font-supreme leading-relaxed max-w-4xl">
                        {selectedItem}
                      </p>
                    )}
                  </div>

                  {/* 🧭 Carousel dentro del flujo, no flotante */}
                  <div className="mt-8 bg-white/10 backdrop-blur-2xl border-t border-white/20 rounded-t-xl py-4 px-3 sm:px-6">
                    <MorpheusCarousel
                      items={(() => {
                        const collection =
                          getCollectionByType(selectedItem.type) || [];
                        const filtered = collection.filter(
                          (i) => i !== selectedItem
                        );
                        const shuffled = filtered.sort(
                          () => 0.5 - Math.random()
                        );
                        return shuffled
                          .slice(0, 5)
                          .map((i) => ({ ...i, type: selectedItem.type }));
                      })()}
                      onSelect={handleSelectFromCarousel}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
