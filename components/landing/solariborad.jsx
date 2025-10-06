"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const SolariBoard = () => {
  const boardRef = useRef(null);
  const lockedIndexes = useRef(new Set());
  const [dimensions, setDimensions] = useState({ rows: 10, cols: 60 });

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

  const FLIP_SPEED = 0.02;

  // 🔹 Ajuste correcto de filas y columnas para cualquier pantalla
  useEffect(() => {
    const resizeHandler = () => {
      if (!boardRef.current) return;

      const width = boardRef.current.offsetWidth;
      const height = boardRef.current.offsetHeight || window.innerHeight * 0.3;

      // columnas proporcionales: más densas en pantallas grandes
      let cols;
      if (width < 500) cols = 30;
      else if (width < 900) cols = 45;
      else if (width < 1400) cols = 60;
      else if (width < 2000) cols = 80;
      else cols = 100;

      const rows = Math.max(8, Math.floor(cols / 6));
      setDimensions({ rows, cols });
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // ✨ efecto scramble
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

  // 🧠 Inicialización + animaciones
  useEffect(() => {
    const container = boardRef.current;
    if (!container) return;
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
      const { rows, cols } = dimensions;
      const keyword = keywords[Math.floor(Math.random() * keywords.length)];
      if (keyword.length >= cols) return;

      const startCol = Math.floor(Math.random() * (cols - keyword.length));
      const row = Math.floor(Math.random() * rows);
      const startIndex = row * cols + startCol;

      const locked = [];
      keyword.split("").forEach((_, i) => {
        const index = startIndex + i;
        locked.push(index);
        lockedIndexes.current.add(index);
      });

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

      setTimeout(() => {
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

    const keywordInterval = setInterval(() => {
      const newKeywords = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < newKeywords; i++) showKeyword();
    }, 2000);

    return () => {
      clearInterval(flipInterval);
      clearInterval(keywordInterval);
    };
  }, [dimensions]);

  const totalChars = dimensions.rows * dimensions.cols;

  return (
    <div
      ref={boardRef}
      className="grid w-full mt-10 gap-[1px] font-technor uppercase text-white/25 tracking-wider select-none"
      style={{
        gridTemplateColumns: `repeat(${dimensions.cols}, 1fr)`,
        fontSize: "clamp(0.75rem, 0.9vw, 1.2rem)",
        lineHeight: "1",
      }}
    >
      {Array.from({ length: totalChars }).map((_, i) => (
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
