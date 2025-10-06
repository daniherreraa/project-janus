import Image from "next/image";
import janusItems from "../public/imgs/janus-items.svg";
import Link from "next/link";
import janusIcon from "@/public/jans.svg";
import PixelImage from "@/components/ui/pixelimage";
import { getBlurDataURL } from "@/lib/getBlurDataURL";
import { LandingSidebar } from "@/components/landing/landingsidebar";
import { HoverCard } from "@/components/landing/hovercard";
import { SolariBoard } from "@/components/landing/solariborad";

export default async function Home() {
  const imageUrl =
    "https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/main.png";
  const blurDataURL = await getBlurDataURL(imageUrl);

  const test = "";

  return (
    <div className="relative w-[100svw] h-[100svh] overflow-hidden">
      {/* Fondo absoluto en toda la app */}
      <div className="fixed inset-0 -z-10">
        <PixelImage src={imageUrl} alt="Main image" blurDataURL={blurDataURL} />
      </div>

      {/* Aside fijo solo en desktop */}
      <aside className="hidden lg:flex lg:justify-center lg:items-start lg:py-16 fixed left-0 top-0 h-full w-[14rem] z-20 border-r border-white/25">
        <Image src={janusIcon} className="w-14 h-auto" alt="Janus Icon" />
      </aside>

      {/* Sidebar (drawer) para md y mobile */}
      <LandingSidebar className="lg:hidden" />

      {/* Contenido scrollable (se desplaza, el aside no) */}
      <main className="relative h-full overflow-y-auto ml-0 lg:ml-[14rem]">
        {/* HERO */}
        <section className="relative min-h-fit w-full">
          {/* Títulos con mezcla difference sobre el fondo */}
          <div className="inset-0 w-full h-full flex flex-col justify-between mix-blend-difference text-white z-10 pt-24 px-4 pb-8 ld:px-20 lg:pt-28 lg:pb-10 border-b border-white">
            <h1 className="font-technor font-semibold text-4xl lg:text-7xl">
              The Space Biology <br /> Knowledge Engine for everyone
            </h1>
            <p className="font-supreme mt-12 lg:max-w-[45rem]">
              The Project Janus is designed to help you learn all you need to
              know about biological experiment in space, and all the challenge
              that nasa have to deal with, when we want to plan missions to
              space.
            </p>
          </div>
        </section>

        {/* Secciones futuras del landing… */}
        <section className="relative h-fit w-full px-4 lg:px-14 py-6 lg:py-10 border-b border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[60svh]">
            <HoverCard
              title="Janus – Core"
              description="Access datasets, experiments and biological insights that fuel your research."
              imageBW="https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/janus-core-bw.png"
              imageColor="https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/janus-core.png"
              href="/janus-core"
            />
            <HoverCard
              title="Morpheus"
              description="Explore risk factors, plant behavior, and space biology through our immersive lab."
              imageBW="https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/morpheus-moon-bw.png"
              imageColor="https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/morpheus-moon.png"
              href="/morpheus"
            />
          </div>
        </section>

        <section className="relative h-fit w-full flex flex-col px-4 py-6 lg:px-14 lg:py-10 border-b border-white/30 mix-blend-difference">
          <div className="flex flex-col">
            <h4 className="font-technor font-semibold text-white/80">
              The Engine Behind Janus
            </h4>
            <h5 className="font-technor font-semibold text-base text-white lg:max-w-[45%] mt-3">
              At the core of our platform lies Janus-Core, a search engine that
              simplifies NASA’s vast bioscience archive...
            </h5>
          </div>
          <SolariBoard />
          <p className="font-supreme text-white/90 mt-12 lg:max-w-[45rem]">
            Powered by AI-driven semantic search, Janus-Core crosslinks NASA
            repositories to reveal patterns across decades of space biology.
          </p>
        </section>

        <section className="relative h-fit w-full flex flex-col px-4 py-6 lg:px-14 lg:py-10 border-b border-white/30 mix-blend-difference">
          <div className="flex flex-col">
            <h4 className="font-technor font-semibold text-white/80">
              From Data To Decisions
            </h4>
            <h5 className="font-technor font-semibold text-base text-white lg:max-w-[45%] mt-3">
              Morpheus bridges curiosity and preparation. While Janus-Core helps
              you find the science, Morpheus helps you understand it.
            </h5>
          </div>
          <p className="font-supreme text-white/90 mt-12 lg:max-w-[45rem]">
            Powered by AI-driven semantic search, Janus-Core crosslinks NASA
            repositories to reveal patterns across decades of space biology.
          </p>
        </section>
        {/* Footer */}
        <footer className="h-[10svh] lg:h-[20svh] flex items-center justify-center text-white font-supreme text-sm tracking-wide border-t border-white/20">
          <p>
            Made with <span className="text-red-400">♥</span> by{" "}
            <span className="font-technor">Astro UTB</span> in Cartagena,
            Colombia
          </p>
        </footer>
      </main>
    </div>
  );
}
