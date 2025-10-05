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
    back: "/planets/2k_stars_milky_way.jpg"
  };

  // Configurar autoRotate cuando el globe esté listo
  useEffect(() => {
    if (!isReady || typeof window === "undefined" || !globeRef.current) return;

    const globe = globeRef.current;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 2;
    globe.controls().enableZoom = false;
    globe.controls().enablePan = false;

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      globe.camera().aspect = width / height;
      globe.camera().updateProjectionMatrix();
      globe.renderer().setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isReady]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={textures[planet]}
        backgroundImagedUrl={textures['back']}
        showAtmosphere={false}
        animateIn={true}
        onGlobeReady={() => setIsReady(true)}
      />
    </div>
  );
};