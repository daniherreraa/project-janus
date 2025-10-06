"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import janusIcon from "@/public/jans.svg";

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Janus-Core", href: "/janus-core" },
    { name: "Morpheus", href: "/morpheus" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-30 border-b border-white/25 
                 bg-white/5  text-white
                 flex items-center justify-between px-6 py-4"
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={janusIcon}
            alt="Janus Icon"
            className="w-8 h-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
          />
          <span className="hidden sm:block font-technor text-sm tracking-widest text-white/80">
            PROJECT JANUS
          </span>
        </Link>
      </div>

      {/* Links - Desktop */}
      <div className="hidden md:flex items-center gap-6 font-supreme text-sm tracking-wide">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/70 hover:text-white transition-all duration-300 hover:translate-y-[-1px]"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex items-center justify-center border border-white/30 
                   rounded-md bg-white/10 hover:bg-white/20 
                   backdrop-blur-xl p-2 text-white transition-all duration-300"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="absolute top-full left-0 w-full border-t border-white/25 
                     bg-black/5 backdrop-blur-2xl text-white flex flex-col items-center py-6 
                     md:hidden animate-fadeIn"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-technor font-semibold text-sm py-2 text-white/100 hover:text-white transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-6 text-xs text-white/40 font-supreme tracking-wide">
            © 2025 Project Janus — Astro UTB
          </div>
        </div>
      )}
    </nav>
  );
};
