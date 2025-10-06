"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export const MiniPlanet = ({ planet = "mars" }) => {
  const globeRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [isReady, setIsReady] = useState(false);

  const textures = {
    mars: "/planets/2k_mars.jpg",
    moon: "/planets/2k_moon.jpg",
    back: "/planets/2k_stars_milky_way.jpg",
  };

  // 🔍 Detecta el tamaño real del contenedor y actualiza el canvas
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.max(rect.width, 100);
      const height = Math.max(rect.height, 100);
      
      setDimensions({ width, height });
      
      if (globeRef.current && globeRef.current.renderer()) {
        globeRef.current.camera().aspect = width / height;
        globeRef.current.camera().updateProjectionMatrix();
        globeRef.current.renderer().setSize(width, height);
      }
    };

    // ✅ Observa cualquier cambio de tamaño del contenedor
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    // Ejecuta inmediatamente en el montaje
    updateSize();

    return () => observer.disconnect();
  }, []);

  // 🎡 Configurar rotación y controles cuando el globo esté listo
  useEffect(() => {
    if (!isReady || !globeRef.current) return;
    const globe = globeRef.current;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 2;
    globe.controls().enableZoom = false;
    globe.controls().enablePan = false;
  }, [isReady]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={textures[planet]}
        showAtmosphere={false}
        animateIn={true}
        onGlobeReady={() => setIsReady(true)}
      />
    </div>
  );
};