"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { NavBar } from "@/components/ui/navbar";
import { DestinySelector } from "@/components/morpheus/destinyselector";
import PixelImage from "@/components/ui/pixelimage";
import morpheusData from "@/lib/morpheusdata";
import { MorpheusCard } from "@/components/morpheus/morpheuscard";

export default function MorpheusPage() {
  const [destination, setDestination] = useState("moon");
  const [previousDestination, setPreviousDestination] = useState(null);
  const containerRef = useRef(null);
  const [data, setData] = useState([]);

  const bgImages = {
    moon: "https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/morpheus-moon.png",
    mars: "https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/morpheus-mars.png",
  };

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

    const tl = gsap.timeline();
    tl.to(newImage, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0).to(
      oldImage,
      {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => setPreviousDestination(destination),
      },
      0
    );

    setData(morpheusData.find((d) => d.target === destination));
  }, [destination]);

  // Inicializa el anterior solo al principio
  useEffect(() => {
    if (!previousDestination) setPreviousDestination(destination);
  }, [destination, previousDestination]);

  return (
    <div ref={containerRef} className="relative w-svw h-svh overflow-hidden">
      <div className="absolute inset-0">
        {/* Imagen actual */}
        <div
          key={destination}
          data-bg={destination}
          className="absolute inset-0"
        >
          <PixelImage src={bgImages[destination]} alt={destination} />
        </div>

        {/* Imagen anterior mientras se desvanece */}
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

      {/* Overlay oscuro para contraste */}
      <div className="absolute inset-0 z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <NavBar />
        <div className="pt-28 px-3 w-full h-full overflow-y-auto">
          {/* Header and background */}
          <div className="border-b border-white/40 pb-6 h-[30%]">
            <div className="flex justify-between items-center">
              <div className="w-full flex md:flex-col flex-row items-center">
                <div className="w-1/2 md:w-full">
                  <p className="font-supreme text-white -mb-3">
                    That's right. We are heading to:
                  </p>
                  <DestinySelector
                    value={destination}
                    onChange={setDestination}
                  />
                </div>
                <div className="w-1/2 md:w-full flex gap-4 text-white">
                  <div>Gravity</div>
                  <div>Atmosphere</div>
                  <div>Radiation</div>
                </div>
              </div>
              <div id="planetModelContainer">
                <div className="w-14 h-14 bg-white"></div>
              </div>
            </div>

            <div className="w-full flex flex-row justify-between mt-3 opacity-80">
              <p className="w-96 text-white font-supreme">
                In this panel, you will find all the details to consider for our
                mission to {destination}.
              </p>
              <p className="w-36 text-end text-white font-supreme">
                Where did we get this information?
              </p>
            </div>
          </div>

          {/* Secciones inferiores */}
          <div id="morpheus-explorer" className="flex flex-row w-full h-[70%]">
            <div className="flex flex-col gap-3 py-3 w-1/5 h-full border-r border-white/60">
              <div className="w-fit px-3 text-center bg-white/30 font-technor font-semibold text-white">
                Human Risk
              </div>
              <div className="w-fit px-3 text-center font-technor font-semibold text-white">
                Food & plants
              </div>
              <div className="w-fit px-3 text-center font-technor font-semibold text-white">
                Infrastructure
              </div>
            </div>

            <div className="flex w-4/5 h-full overflow-y-hidden">
              <div className="text-white">
                <div className="w-full h-full p-3 overflow-y-auto">
                  <div
                    id="cardsContainer"
                    className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"
                  >
                    {data?.human_risks?.map((risk, index) => (
                      <div key={index} className="break-inside-avoid mb-4">
                        <MorpheusCard risk={risk} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
