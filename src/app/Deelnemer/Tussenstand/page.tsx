import React from "react";
import { GetTussenstandAction } from "../../../../prisma/actions/TussenstandActions";
import { DeelnemerMetTussenstand } from "../../../../prisma/queries/TussenstandQueries";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import GeenToegang from "@/components/GeenToegang";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GetWedstrijden } from "../../../../prisma/queries/WedstrijdenQueries";
import { DatumVoorbij } from "@/components/DatumFuncties";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AccordionContent } from "@/components/ui/accordion";
import WedstrijdDetail from "./WedstrijdDetail";

type deelnemerUitslag = {
  deelnemerid: string;
  ploegnaam: string;
  punten: number;
};
const TussenstandOverzicht = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();
  if (!auth) {
    return <GeenToegang />;
  }
  const lijst = await GetWedstrijden();
  if (!DatumVoorbij(lijst[0].datum)) {
    return (
      <div className="w-full flex flex-col">
        <Alert className="bg-red-600">
          <AlertTitle className="text-xl font-bold">
            Nog geen tussenstand
          </AlertTitle>
          <AlertDescription>
            De eerste wedstrijd is nog niet verreden
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  //console.log(lijst)
  const data: DeelnemerMetTussenstand = await GetTussenstandAction();
  //console.log(data);
  const deelnemeruitslag: deelnemerUitslag[] = data.map((d) => ({
    deelnemerid: d.id,
    ploegnaam: d.ploegnaam,
    punten: d.Tussenstand.reduce((sum, item) => sum + item.punten, 0),
  }));

  return (
    <>
      <div className="w-full flex flex-col  md:m-4 md:p-4">
        <div className="w-full">
          <h2>Overzicht Tussenstand</h2>
        </div>
        <div className="w-full md:w-1/2 border">
          <Accordion type="single" className="w-full">
            {deelnemeruitslag
              .sort((a, b) => {
                return a.punten - b.punten;
              })
              .map((d) => (
                <AccordionItem
                  key={d.deelnemerid}
                  value={d.deelnemerid}
                  className="w-full my-2"
                >
                  <AccordionHeader>
                    <AccordionTrigger className="w-full bg-slate-700 p-3">
                      <div className="w-full flex flex-row">
                        <div className="w-3/5 md:w-2/5 text-left">
                          {d.ploegnaam}
                        </div>
                        <div className="w-1/5 text-right">{d.punten}</div>
                      </div>
                    </AccordionTrigger>
                  </AccordionHeader>

                  <AccordionContent>
                    <>
                      {lijst
                        .filter((x) => x.afgesloten == true)
                        .map((wedstrijd) => (
                          <div
                            key={wedstrijd.id}
                            className="flex w-full justify-between align-items-center"
                          >
                            <div className="font-bold md:text-xl align-center flex-1 pt-2">
                              {wedstrijd.naam}
                            </div>
                            <div className=" text-right md:pt-2 md:px-3 flex-none mx-1 pt-2">
                              {d.punten} punten
                            </div>
                            <div className="text-center flex-none">
                              <WedstrijdDetail
                                ploegnaam={d.ploegnaam}
                                wedstrijd={wedstrijd.naam}
                                data={data
                                  .find((x) => x.id == d.deelnemerid)
                                  ?.Tussenstand.sort(
                                    (a, b) => a.punten - b.punten
                                  )}
                              />
                            </div>
                          </div>
                        ))}
                    </>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default TussenstandOverzicht;
