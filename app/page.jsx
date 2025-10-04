import Image from "next/image";
import janusItems from "../public/imgs/janus-items.svg"
import { NavBar } from "@/components/ui/navbar";


export default function Home() {
  return (
    <div>
      <section className="relative w-[100svw] h-[100svh] overflow-hidden">
        <Image
          src="https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/main.png"
          alt="Main image"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="relative z-10 flex w-full h-full">
          <NavBar />
          <div id="heroTitlesContainer" className="w-fit flex flex-col text-white shrink-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-row items-center gap-x-2">
              <div className="font-technor font-semibold text-[4rem] leading-0">PROJECT</div>
              <div>
                <Image
                  src={janusItems}
                  alt="janusItems"
                  priority
                />
              </div>
            </div>
            <div id="Janus" className="flex flex-row -translate-x-11 items-center gap-2 mt-1">
              <p className="font-supreme max-w-72 leading-4 shrink-0 text-justify">Let me help you to get ready for our journey. Everything your need is here. Learn. Prepare. Innovate.</p>
              <div>
                <h1 className="test font-technor font-semibold text-[4rem] leading-0">JANUS</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
