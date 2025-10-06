"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    // animación que sigue el mouse
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", moveCursor);

    // detectar hover en las HoverCards
    const hoverTargets = document.querySelectorAll(".hover-target");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => setHovering(true));
      el.addEventListener("mouseleave", () => setHovering(false));
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", () => setHovering(true));
        el.removeEventListener("mouseleave", () => setHovering(false));
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
    >
      <div
        className={`flex items-center justify-center rounded-full mix-blend-difference text-white
          transition-all duration-300 ${
            hovering
              ? "w-28 h-28 bg-white/10 border border-white/50 backdrop-blur-xl"
              : "w-6 h-6 border border-white/70"
          }`}
      >
        {hovering && (
          <div className="flex items-center gap-2 text-[0.8rem] font-supreme">
            <span>Go to</span>
            <ArrowUpRight size={14} />
          </div>
        )}
      </div>
    </div>
  );
}
