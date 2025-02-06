import React from "react";
import { GetTussenstandAction } from "../../../../prisma/actions/TussenstandActions";
import { DeelnemerMetTussenstand } from "../../../../prisma/queries/TussenstandQueries";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

type deelnemerUitslag = {
  deelnemerid: string;
  ploegnaam: string;
  punten: number;
};
const TussenstandOverzicht = async () => {
  const data:DeelnemerMetTussenstand = await GetTussenstandAction();
  const deelnemeruitslag: deelnemerUitslag[] = data.map((d) => ({
    deelnemerid: d.id,
    ploegnaam: d.ploegnaam,
    punten: d.Tussenstand.reduce((sum, item) => sum + item.punten, 0),
  }));
  console.log(deelnemeruitslag);
  return (
    <>
      <div className="w-full flex flex-col  m-4 p-4">
        <div className="w-full">
          <h2>Overzicht Tussenstand</h2>
        </div>
        <div className="w-full md:w-1/2 border">
          <Accordion type="single" className="w-full" collapsible>
            {deelnemeruitslag
              .sort((a, b) => {
                return a.punten - b.punten;
              })
              .map((d) => (
                <AccordionItem key={d.deelnemerid} value={d.deelnemerid} className="w-full">
                  <AccordionTrigger  className="w-full">
                    <div className="w-full flex flex-row">
                        <div className="w-4/5 md:w-2/5 text-left">{d.ploegnaam}</div>
                        <div className="w-1/5 text-right">{d.punten}</div>
                    </div>
                  </AccordionTrigger>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default TussenstandOverzicht;
