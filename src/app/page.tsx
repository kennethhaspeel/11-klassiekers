
import Image from "next/image";

export const metadata = {
  title: "Home Page",
};
export default function Home() {
  return (

      <div className="flex-grow justify-center text-center mx-auto p-3">
        <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">De 11 Klassiekers</h2>
          <Image
            className="m-0 rounded-xl"
            src="/images/vintage1.jpg"
            width={700}
            height={700}
            sizes="700px"
            alt="Pagina niet gevonden"
            priority={true}
            title="Pagina niet gevonden"
          />
        </div>
        
      </div>


  );
}
