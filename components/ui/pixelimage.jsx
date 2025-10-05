"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PixelImage({ src, alt }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!tempCanvasRef.current) {
      tempCanvasRef.current = document.createElement("canvas");
    }
    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext("2d");

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    const render = (pxFactor = 1) => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;

      let drawW,
        drawH,
        offsetX = 0,
        offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawW = w;
        drawH = w / imgAspect;
        offsetY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgAspect;
        offsetX = (w - drawW) / 2;
      }

      const size = pxFactor * 0.01;
      const smallW = Math.ceil(drawW * size);
      const smallH = Math.ceil(drawH * size);

      tempCanvas.width = smallW;
      tempCanvas.height = smallH;

      tempCtx.imageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);

      tempCtx.drawImage(img, 0, 0, smallW, smallH);
      ctx.drawImage(
        tempCanvas,
        0,
        0,
        smallW,
        smallH,
        offsetX,
        offsetY,
        drawW,
        drawH
      );
    };

    img.onload = () => {
      render(1);

      const scrollTrigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top+=20% bottom",
        once: true,
        onEnter: () => {
          if (hasAnimatedRef.current) return;
          hasAnimatedRef.current = true;

          // 🎨 TAMAÑO DE PÍXELES (más valores = más smooth)
          // Valores más bajos = píxeles más grandes
          // Más pasos entre números = transición más suave
          const factors = [1, 2, 3, 5, 8, 12, 20, 35, 60, 100];

          let i = 0;
          const animate = () => {
            if (i < factors.length) {
              render(factors[i++]);

              // ⏱️ VELOCIDAD DE ANIMACIÓN (en milisegundos)
              // Número más alto = más lento/smooth
              setTimeout(animate, 80); // Todas las transiciones a 100ms

              // O usa diferentes velocidades:
              // setTimeout(animate, i === 1 ? 200 : 100);
            }
          };
          animate();
        },
      });

      return () => scrollTrigger.kill();
    };

    const onResize = () => {
      if (img.complete) render(100);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      hasAnimatedRef.current = false;
    };
  }, [src]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <NextImage
        src={src}
        alt={alt}
        fill
        priority
        quality={100}
        className="object-cover opacity-0 pointer-events-none select-none"
      />
    </div>
  );
}
