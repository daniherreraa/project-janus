"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MorpheusCard } from "./morpheuscard";

export const MorpheusCarousel = ({ items = [], onSelect }) => {
  const scrollRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setHasOverflow(scrollWidth > clientWidth + 5);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [items]);

  if (!items.length) return null;

  const title =
    items[0]?.type === "risk"
      ? "Human Risks"
      : items[0]?.type === "plant"
      ? "Plant & Microbes"
      : "Research";

  return (
    <div className="relative w-full">
      {/* encabezado tipo tabs */}
      <div className="flex items-center justify-between mb-3 px-2">

        <h3 className="font-technor font-semibold text-base sm:text-lg text-white/90 bg-white/10 border border-white/20 backdrop-blur-md rounded-md px-3 py-1">
          More {title}
        </h3>
        {hasOverflow && (
          <div className="flex gap-2">
            {/*button design example */}
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-md border border-white/20 bg-white/10 hover:bg-white/30 transition backdrop-blur-md"
            >
              <ChevronLeft className="text-white" size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-md border border-white/20 bg-white/10 hover:bg-white/30 transition backdrop-blur-md"
            >
              <ChevronRight className="text-white" size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Contenedor scrollable */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-2 sm:px-4 py-2 scrollbar-hide scroll-smooth"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-[240px] sm:min-w-[260px] max-w-[260px] flex-shrink-0 cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <MorpheusCard item={item} type={item.type} compact />
          </div>
        ))}
      </div>
    </div>
  );
};
