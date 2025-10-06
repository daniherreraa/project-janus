"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavBar } from "@/components/ui/navbar";
import { cn } from "@/lib/utils";

export function LandingSidebar({ className }) {
  return (
    <>
      {/* Botón flotante (md & down) */}
      <Sheet>
        <SheetTrigger
          className={cn(
            "fixed top-4 left-4 z-30 flex items-center gap-2",
            "rounded-md border border-white/30 bg-white/10 hover:bg-white/20",
            "backdrop-blur-xl px-3 py-2 text-white",
            "mix-blend-difference",
            className
          )}
        >
          <Menu size={18} />
          <span className="font-technor text-sm">Menu</span>
        </SheetTrigger>

        {/* Drawer lateral sobre la imagen (glass) */}
        <SheetContent
          side="left"
          className={cn(
            "w-[16rem] sm:w-[18rem] border-r border-white/30",
            "bg-white/10 backdrop-blur-2xl text-white"
          )}
        >
          <div className="pt-6">
            <NavBar />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
