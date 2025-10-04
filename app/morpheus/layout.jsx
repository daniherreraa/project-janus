import { DestinySelector } from "@/components/morpheus/destinyselector";
import Image from "next/image";

export default function MorpheusLayout({ children }) {
  return (
    <div className="bg-gray-800 w-svw h-svh">
      <DestinySelector />
      {children}
    </div>
  );
}
