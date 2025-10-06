"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Info } from "lucide-react";
import gsap from "gsap";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const EnvironmentInfo = ({ environment = {} }) => {
  const [openItem, setOpenItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const contentRefs = useRef({});

  const toggle = (key) => {
    const newKey = openItem === key ? null : key;
    setOpenItem(newKey);

    // Animación suave del colapsable
    Object.keys(contentRefs.current).forEach((k) => {
      const el = contentRefs.current[k];
      if (!el) return;

      if (k === newKey) {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  };

  const items = [
    { key: "gravity", label: "Gravity" },
    { key: "atmosphere", label: "Atmosphere" },
    { key: "radiation", label: "Radiation" },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const collapsibles = (
    <div className="space-y-3 mt-4">
      {items.map(({ key, label }) => (
        <div
          key={key}
          className={`border border-white/25 rounded-lg overflow-hidden bg-white/10 backdrop-blur-md transition-all duration-300 ${
            openItem === key ? "border-white/40" : "border-white/20"
          }`}
        >
          <button
            onClick={() => toggle(key)}
            className="w-full flex justify-between items-center px-3 py-2 text-left 
                       text-white font-technor font-semibold tracking-wide 
                       hover:bg-white/15 transition-all duration-300"
          >
            <span>{label}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-500 ${
                openItem === key
                  ? "rotate-180 text-white"
                  : "rotate-0 text-white/70"
              }`}
            />
          </button>

          {/* Contenido colapsable animado */}
          <div
            ref={(el) => (contentRefs.current[key] = el)}
            className="overflow-hidden h-0 opacity-0"
          >
            <div className="px-3 pt-2 pb-3 text-white/85 font-supreme text-sm leading-relaxed border-t border-white/10">
              {environment[key] ? environment[key] : "No data available."}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // 💻 Desktop/tablet → collapsibles visibles directamente
  if (!isMobile) return collapsibles;

  // 📱 Mobile → botón que abre modal estilizado
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-md 
                     border border-white/25 bg-white/10 hover:bg-white/20 
                     text-white font-technor text-sm tracking-wide 
                     backdrop-blur-md transition-all duration-300"
        >
          <Info size={16} className="text-white/90" />
          <span>Environment</span>
        </button>
      </DialogTrigger>

      <DialogContent
        className="bg-white/[0.08] backdrop-blur-2xl border border-white/25 text-white 
                   max-w-sm rounded-xl p-4 transition-all duration-300"
      >
        <DialogHeader>
          <DialogTitle className="font-technor font-semibold text-white text-lg tracking-wide">
            Environment Details
          </DialogTitle>
        </DialogHeader>
        {collapsibles}
      </DialogContent>
    </Dialog>
  );
};
