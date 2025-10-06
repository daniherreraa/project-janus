"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const KeywordsScroller = () => {
  const containerRef = useRef(null);
  const keywords = [
    "Microgravity",
    "Muscle Atrophy",
    "Photosynthesis",
    "Genomics",
    "Cell Growth",
    "Immune Response",
    "Radiation Exposure",
    "Metabolism",
    "Plant Growth",
    "Stress Adaptation",
    "Molecular Biology",
    "Spaceflight",
    "Neural Function",
    "Microbes",
    "DNA Repair",
    "Protein Expression",
    "Bioinformatics",
  ];

  useEffect(() => {
    const container = containerRef.current;
    const items = gsap.utils.toArray(".keyword");
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(items, {
      y: (i) => (i % 2 === 0 ? "-120%" : "120%"),
      rotationX: (i) => (i % 2 === 0 ? -25 : 25),
      opacity: 0,
      ease: "power2.inOut",
      duration: 0.6,
      stagger: {
        each: 0.15,
        from: "random",
      },
    })
      .to(items, {
        y: 0,
        rotationX: 0,
        opacity: 1,
        ease: "elastic.out(1, 0.4)",
        duration: 0.8,
        stagger: {
          each: 0.1,
          from: "random",
        },
      })
      .repeatDelay(1.4);

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-center w-full mt-6 overflow-hidden select-none"
    >
      {keywords.map((word, i) => (
        <span
          key={i}
          className="keyword font-technor text-2xl md:text-3xl text-white/60 uppercase tracking-widest"
        >
          {word}
        </span>
      ))}
    </div>
  );
};
