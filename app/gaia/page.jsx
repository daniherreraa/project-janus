import Image from "next/image";

const page = () => {
  return (
    <div>
      <section className="relative w-[100svw] h-[100svh] overflow-hidden">
        <Image
          src="https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/gaia-background.png"
          alt="Gaia Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="relative z-10 w-svw h-svh"></div>
      </section>
    </div>
  );
};

export default page;
