"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Info } from "lucide-react";
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

  const toggle = (key) => {
    setOpenItem(openItem === key ? null : key);
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
          className="border border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-md"
        >
          <button
            onClick={() => toggle(key)}
            className="w-full flex justify-between items-center px-3 py-2 text-left text-white font-technor font-semibold tracking-wide hover:bg-white/10 transition"
          >
            <span>{label}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openItem === key ? "rotate-180" : ""
              }`}
            />
          </button>

          {openItem === key && (
            <div className="px-3 pt-3 pb-3 text-white/80 font-supreme text-sm leading-relaxed animate-fade-in">
              {environment[key] ? environment[key] : "No data available."}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // 🌍 Desktop/tablet view → collapsibles visibles
  if (!isMobile) return collapsibles;

  // 📱 Mobile view → solo botón que abre diálogo
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-2 flex items-center gap-2 px-3 py-2 rounded-md border border-white/30 bg-white/10 hover:bg-white/20 text-white font-technor text-sm tracking-wide backdrop-blur-md transition">
          <Info size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-black/80 border border-white/20 text-white backdrop-blur-2xl max-w-sm rounded-xl">
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
