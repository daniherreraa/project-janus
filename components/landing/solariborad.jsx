"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const SolariBoard = () => {
  const boardRef = useRef(null);
  const lockedIndexes = useRef(new Set());
  const allChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890█▓▒░<>[]{}():;=+-*/\\|_•°@#";
  const keywords = [
    "MICROGRAVITY",
    "PLANT GROWTH",
    "RADIATION RESPONSE",
    "CELL DIFFERENTIATION",
    "GENOMIC ADAPTATION",
    "MUSCLE ATROPHY",
    "IMMUNE FUNCTION",
    "MICROBIAL BEHAVIOR",
    "TISSUE REGENERATION",
    "NEURAL PLASTICITY",
  ];

  const ROWS = 10;
  const COLS = 60;
  const FLIP_SPEED = 0.02;

  // ✨ efecto scramble sobre un conjunto de índices
  const scrambleChars = (chars, indexes, targetText, duration = 500) => {
    const steps = Math.floor(duration / 30);
    let current = 0;

    const interval = setInterval(() => {
      indexes.forEach((idx, i) => {
        const char = chars[idx];
        if (!char) return;
        if (current < steps - 2) {
          char.textContent =
            allChars[Math.floor(Math.random() * allChars.length)];
        } else {
          char.textContent = targetText[i] || " ";
        }
      });

      current++;
      if (current >= steps) clearInterval(interval);
    }, 30);
  };

  useEffect(() => {
    const container = boardRef.current;
    const chars = container.querySelectorAll(".char");

    const randomizeBoard = () => {
      chars.forEach((char, idx) => {
        if (lockedIndexes.current.has(idx)) return;
        char.textContent =
          allChars[Math.floor(Math.random() * allChars.length)];
      });
    };
    randomizeBoard();

    const showKeyword = () => {
      const keyword = keywords[Math.floor(Math.random() * keywords.length)];
      const startCol = Math.floor(Math.random() * (COLS - keyword.length));
      const row = Math.floor(Math.random() * ROWS);
      const startIndex = row * COLS + startCol;

      const locked = [];
      keyword.split("").forEach((_, i) => {
        const index = startIndex + i;
        locked.push(index);
        lockedIndexes.current.add(index);
      });

      // Scramble IN (aparición)
      scrambleChars(chars, locked, keyword.split(""), 500);
      locked.forEach((idx) => {
        const char = chars[idx];
        if (!char) return;
        char.classList.add("text-white");
        gsap.fromTo(
          char,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }
        );
      });

      // 🔒 Mantener palabra visible 6–8s
      setTimeout(() => {
        // Scramble OUT (desaparición)
        scrambleChars(chars, locked, locked.map(() => " "), 500);
        locked.forEach((idx) => {
          const char = chars[idx];
          if (!char) return;
          gsap.to(char, {
            opacity: 0,
            y: 5,
            duration: 0.3,
            onComplete: () => {
              char.textContent =
                allChars[Math.floor(Math.random() * allChars.length)];
              char.classList.remove("text-white");
              lockedIndexes.current.delete(idx);
              gsap.to(char, { opacity: 1, y: 0, duration: 0.25 });
            },
          });
        });
      }, 6000 + Math.random() * 2000);
    };

    // 🔁 movimiento constante de fondo
    const flipInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * chars.length);
      if (lockedIndexes.current.has(idx)) return;
      const randomChar = chars[idx];
      gsap.to(randomChar, {
        duration: FLIP_SPEED,
        opacity: 0.2,
        y: gsap.utils.random(-3, 3),
        onComplete: () => {
          randomChar.textContent =
            allChars[Math.floor(Math.random() * allChars.length)];
          gsap.to(randomChar, { opacity: 1, y: 0, duration: FLIP_SPEED });
        },
      });
    }, 10);

    // ⚡ varias palabras simultáneas
    const keywordInterval = setInterval(() => {
      const newKeywords = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < newKeywords; i++) showKeyword();
    }, 2000);

    return () => {
      clearInterval(flipInterval);
      clearInterval(keywordInterval);
    };
  }, []);

  return (
    <div
      ref={boardRef}
      className="grid grid-cols-[repeat(60,1fr)] gap-[1px] font-technor text-[1.2rem] md:text-[1.4rem] text-white/25 uppercase tracking-wider w-full mt-10 select-none"
    >
      {Array.from({ length: ROWS * COLS }).map((_, i) => (
        <span
          key={i}
          className="char block text-center font-semibold transition-all duration-100"
        >
          █
        </span>
      ))}
    </div>
  );
};
