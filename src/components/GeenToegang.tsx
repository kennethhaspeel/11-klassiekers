import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Image from "next/image";

const GeenToegang = () => {
  return (
    <>
      <div className="w-full flex flex-col p-5">
        <div>
          <Alert className="bg-red-800 text-white">
            <AlertTitle className="text-center text-2xl">Geen Toegang</AlertTitle>
            <AlertDescription className="text-center">
              U hebt geen toegang tot deze pagina
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-full flex justify-center m-5 items-center">
          <Image
            className="m-0 rounded-xl"
            src="/images/no_access.jpg"
            width={600}
            height={600}
            sizes="500px"
            alt="Pagina niet gevonden"
            priority={true}
            title="Pagina niet gevonden"
          />
        </div>
      </div>
    </>
  );
};

export default GeenToegang;
