import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-black w-full h-[100svh] flex flex-col gap-4 justify-center items-center">
      <div className="flex items-center gap-3">
        <LoaderIcon className="text-white w-6 h-6 animate-spin" />
        <h1 className="font-technor font-semibold text-white tracking-widest">
          JANS
        </h1>
      </div>
    </div>
  );
}
