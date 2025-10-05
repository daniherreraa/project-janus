"use client";

import { useMemo } from "react";
import { MorpheusCard } from "@/components/morpheus/morpheuscard";

const TITLES = {
  risk: "More Human Risks",
  plant: "More Plants & Microbes",
  research: "More Research",
};

export function MorpheusCarousel({ items = [], type, current, onSelect }) {
  // dedup: evita mostrar la misma carta seleccionada
  const list = useMemo(() => {
    const keyOf = (it) => {
      if (!it) return "";
      if (type === "research") {
        return typeof it === "string" ? it : it?.id ?? it?.title ?? JSON.stringify(it);
      }
      return it?.category ?? it?.title ?? JSON.stringify(it);
    };
    const currentKey = keyOf(current);
    return (items || []).filter((it) => keyOf(it) !== currentKey);
  }, [items, type, current]);

  if (!list.length) return null;

  return (
    <section className="mt-12 mb-6">
      <h3 className="font-technor font-semibold text-base text-white mb-4">
        {TITLES[type] ?? "More"}
      </h3>

      <div className="relative w-full">
        {/* Carrusel horizontal con altura uniforme en todas las cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {list.map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[320px] h-fit snap-start cursor-pointer"
              onClick={() => onSelect({ ...item, type })}
            >
              {/* Indicador amarillo (solo para Human Risks) */}
              {type === "risk" && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-[#EA932F] rounded-sm shadow" />
              )}

              {/* Card con altura forzada uniforme */}
              <div className="h-fit">
                <MorpheusCard item={item} type={type} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
