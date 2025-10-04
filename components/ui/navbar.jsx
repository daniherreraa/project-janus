import Image from "next/image";
import Link from "next/link";
import janusIcon from "@/public/jans.svg"

export const NavBar = () => {
  return (
    <nav className="absolute flex flex-row w-full h-fit items-center p-6">
      <div id="brandContainer">
        <Link href={'/'}>
          <Image src={janusIcon} className="w-8 h-auto" alt="Janus Icon" />
        </Link>
      </div>
      <div
        id="navLinksContainer"
        className="flex flex-row text-white font-technor ml-6 gap-3"
      >
        {["Janus-core", "Morpheus", "Gaia"].map((w, i) => (
          <Link
            href={`/${w.toLowerCase()}`}
            className="font-technor font-semibold px-3 hover:bg-white/50 cursor-pointer"
            key={i}
          >
            {w}
          </Link>
        ))}
      </div>
    </nav>
  );
};
