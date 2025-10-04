import { DestinySelector } from "@/components/morpheus/destinyselector";
import Image from "next/image";

export default function MorpheusLayout({ children }) {
  return (
    <div className="bg-gray-800 w-svw h-svh">
      {children}
      <div className="pt-28 px-3 w-full h-full">
        <div className="border-b border-white/40 pb-6">
          <div>
            {/* Info contianer */}
            <div
              id="destinyInfoContainer"
              className="flex justify-between items-center"
            >
              <div className="w-full flex md:flex-col flex-row items-center">
                <div id="destinySelectorContainer" className="w-full lg:w-1/2">
                  <p className="font-supreme text-white -mb-3">
                    That's right. We are heading to:
                  </p>
                  <DestinySelector />
                </div>
                <div className="w-full lg:w-1/2 flex gap-4 text-white">
                  <div>Gravity</div>
                  <div>Atmosphere</div>
                  <div>Radiation</div>
                </div>
              </div>
              <div id="planetModelContainer">
                <div className="w-14 h-14 bg-white"></div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between mt-3 opacity-80">
            <p className="w-96 text-white font-supreme">
              In this panel, you will find all the details to consider for our
              mission to Mars.{" "}
            </p>
            <p className="w-36 text-end text-white font-supreme">
              Where did we get this information?
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-3 py-3 w-1/5 h-full border-r border-white/60">
            <div className="w-fit px-3 text-center bg-white/30 font-technor font-semibold text-white">Human Risk</div>
            <div className="w-fit px-3 text-center font-technor font-semibold text-white">Food & plants</div>
            <div className="w-fit px-3 text-center font-technor font-semibold text-white">Infraestructure</div>
          </div>
          <div className="flex w-4/5 p-3">
          </div>
        </div>
      </div>
    </div>
  );
}
