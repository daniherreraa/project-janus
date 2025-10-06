"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function LandingSidebar({ className }) {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Janus Core", href: "/janus-core" },
    { name: "Morpheus", href: "/morpheus" },
  ];

  return (
    <>
      {/* Botón flotante (solo visible en md & down) */}
      <Sheet>
        <SheetTrigger
          className={cn(
            "fixed top-4 left-4 z-30 flex items-center gap-2",
            "rounded-md border border-white/30 bg-white/10 hover:bg-white/20",
            "backdrop-blur-xl px-3 py-2 text-white",
            "mix-blend-difference transition-all duration-300",
            className
          )}
        >
          <Menu size={18} />
          <span className="font-technor text-sm tracking-wide">MENU</span>
        </SheetTrigger>

        {/* Drawer lateral sobre la imagen (glass / blur) */}
        <SheetContent
          side="left"
          className={cn(
            "w-[16rem] sm:w-[18rem] border-r border-white/30",
            "bg-white/10 backdrop-blur-2xl text-white flex flex-col justify-between"
          )}
        >
          <div className="pt-10 px-4 flex flex-col gap-6">
            <h2 className="font-technor text-lg text-white/80 tracking-widest">
              NAVIGATION
            </h2>

            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  className={cn(
                    "font-supreme text-base transition-all duration-300",
                    "hover:text-white hover:translate-x-1",
                    active === link.href ? "text-white" : "text-white/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="px-4 pb-6 text-xs text-white/40 font-supreme tracking-wide">
            © 2025 Project Janus — AStro UTB
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
