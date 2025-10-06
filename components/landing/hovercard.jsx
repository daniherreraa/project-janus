"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

export const HoverCard = ({ title, description, imageColor, imageBW, href }) => {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const canvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const colorImg = useRef(null);
  const bwImg = useRef(null);

  const scrambleText = (el, duration = 800) => {
    if (!el) return;
    const original = el.dataset.text || el.textContent;
    el.dataset.text = original;
    let elapsed = 0;
    const fps = 30;
    const totalFrames = duration / (1000 / fps);
    const interval = setInterval(() => {
      el.textContent = original
        .split("")
        .map((ch) =>
          Math.random() < 0.3
            ? letters[Math.floor(Math.random() * letters.length)]
            : ch
        )
        .join("");
      if (++elapsed > totalFrames) {
        el.textContent = original;
        clearInterval(interval);
      }
    }, 1000 / fps);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!tempCanvasRef.current) {
      tempCanvasRef.current = document.createElement("canvas");
    }
    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext("2d");

    colorImg.current = new window.Image();
    bwImg.current = new window.Image();
    colorImg.current.crossOrigin = "anonymous";
    bwImg.current.crossOrigin = "anonymous";
    colorImg.current.src = imageColor;
    bwImg.current.src = imageBW;

    const render = (img, pxFactor = 100, grayscale = false) => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      const size = pxFactor * 0.006;
      const smallW = Math.ceil(width * size);
      const smallH = Math.ceil(height * size);
      tempCanvas.width = smallW;
      tempCanvas.height = smallH;
      tempCtx.imageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      tempCtx.drawImage(img, 0, 0, smallW, smallH);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, 0, 0, width, height);

      if (grayscale) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    };

    // 🧠 Transición progresiva del pixelado
    const animatePixelTransition = (fromFactor, toFactor, toColor = false) => {
      const steps = [fromFactor];
      const totalSteps = 6;
      const stepSize = (toFactor - fromFactor) / totalSteps;

      for (let i = 1; i <= totalSteps; i++) {
        steps.push(fromFactor + stepSize * i);
      }

      let i = 0;
      const animateStep = () => {
        if (i < steps.length) {
          render(
            toColor ? colorImg.current : bwImg.current,
            steps[i],
            !toColor
          );
          i++;
          setTimeout(animateStep, 100);
        }
      };
      animateStep();
    };

    // Estado inicial
    bwImg.current.onload = () => render(bwImg.current, 20, true);

    const card = cardRef.current;

    const handleEnter = () => {
      scrambleText(titleRef.current);
      scrambleText(descRef.current);
      animatePixelTransition(20, 100, true);
    };

    const handleLeave = () => {
      scrambleText(titleRef.current);
      scrambleText(descRef.current);
      animatePixelTransition(100, 20, false);
    };

    // ✅ Responsive: hover en desktop, tap en mobile
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouch) {
      let active = false;
      const handleTap = () => {
        if (active) handleLeave();
        else handleEnter();
        active = !active;
      };
      card.addEventListener("click", handleTap);
      return () => card.removeEventListener("click", handleTap);
    } else {
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
      return () => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      };
    }
  }, [imageColor, imageBW]);

  return (
    <a
      href={href}
      ref={cardRef}
      className="group relative overflow-hidden bg-white/5 backdrop-blur-md cursor-pointer border-white/20 hover:border-white/30 transition-transform duration-500"
    >
      {/* Canvas dinámico pixelado */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* capa translúcida + texto */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 mix-blend-difference text-white">
        <h2
          ref={titleRef}
          className="font-technor text-3xl md:text-4xl font-semibold mb-3"
        >
          {title}
        </h2>
        <p ref={descRef} className="font-supreme text-sm md:text-base max-w-md">
          {description}
        </p>
      </div>

      {/* overlay visual */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4px_4px]" />
    </a>
  );
};
