
import Image from "next/image";

export const metadata = {
  title: "Pagina niet gevonden",
};

export default function NotFound() {
  return (
    <div className="flex flex-col w-full lg:max-w-7xl mx-auto  h-dvh">
      <div className="flex-grow justify-center text-center mx-auto p-3">
        <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Route niet gevonden</h2>
          <Image
            className="m-0 rounded-xl"
            src="/images/notfound.png"
            width={500}
            height={500}
            sizes="500px"
            alt="Pagina niet gevonden"
            priority={true}
            title="Pagina niet gevonden"
          />
        </div>
        
      </div>
    </div>
  );
}
