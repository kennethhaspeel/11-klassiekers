"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { UserPen } from "lucide-react";
import { useState } from "react";

const RegistratieComponent = () => {
  const [veilig, setVeilig] = useState<string | null>(null);
  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <div className="flex flex-col w-full">
          <p className="w-full text-center">
            Er is gekozen voor een systeem zonder paswoord. U hebt dus enkel een
            emailadres nodig om te registeren
          </p>
          <p className="w-full text-center">
            Na registratie en bij het inloggen, krijg je op dit email adres een
            code gestuurd die je dan moet invullen
          </p>
        </div>
        <div className="flex flex-col w-full pt-2">
          <p className="w-full text-center">
            Inschrijving voor deze pronostiek kost 15 euro. Iedere transfer kost
            2 euro
          </p>
        </div>
        <hr />
        <div>
          <div className="flex items-center justify-center mt-4">
            {Number(veilig) === 1755 ? (
              <Button asChild variant="outline" size="lg">
                <RegisterLink>
                  <UserPen />
                  Registreer
                </RegisterLink>
              </Button>
            ) : (
              <>
                <div>
                  <div>
                    <p>
                      Om automatisch registraties te voorkomen, voorzien we een
                      veiligheidsvraag
                    </p>
                  </div>
                  <div>
                    <p>
                      Sedert welk jaartal bestaat het Kapittel? Alle informatie
                      kunt u vinden op kapittel<span className="font-bold text-xl ">1755</span>.be
                    </p>
                  </div>
                  <div className="w-full items-center justify-center mt-3">
                    <div className="w-1/2 md:w-1/4 mx-auto">
                      <Input
                        className="bg-gray-300 border border-black"
                        placeholder="vul jaartal in"
                        onChange={(e)=>{setVeilig(e.target.value)}}
                      ></Input>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistratieComponent;
