"use client";
import React, { useState } from "react";
import { SelectieMetRenner } from "../../../../prisma/Models/SelectieMetRenners";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Deelnemer } from "@prisma/client";
import RennerCard from "@/components/RennerCard";
import SetMetFoto from "@/components/SetMetFoto";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ArrowDownUp } from "lucide-react";
import ZoekRenner from "./ZoekRenner";

interface Props {
  rennersLijst: SelectieMetRenner[];
  periode: number;
  deelnemer: Deelnemer;
}
const MaakSelectiePagina = ({ rennersLijst, periode, deelnemer }: Props) => {
  const [renners, setRenners] = useState<SelectieMetRenner[]>(rennersLijst);
  const [metFoto, setMetFoto] = useState<boolean>(deelnemer.metFoto);
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full  flex flex-row gap-4 my-2">
          <div>
            <Badge className="mx-2">
              {renners.filter((x) => x.datum_uit == null).length} renners
            </Badge>
          </div>
          <div>
            <Badge>
              {3 - renners.filter((x) => x.datum_uit != null).length} transfers
              over
            </Badge>
          </div>

          <div>|</div>

          <div>
            <SetMetFoto
              setMetFoto={setMetFoto}
              metFoto={metFoto}
              deelnemerid={deelnemer.id}
            />
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full  flex flex-col">
          <AccordionItem value="selectie">
            <AccordionTrigger className="w-full">
              <Alert className="w-full">
                <AlertDescription className="flex flex-row gap-2 w-full">
                  <div>Huidige Selectie</div>

                  <div className="ms-5 justify-self-end">
                    <ArrowDownUp size={28} />
                  </div>
                </AlertDescription>
              </Alert>
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {renners
                  .filter((x) => x.datum_uit == null)
                  .map((renner) => (
                    <RennerCard
                      key={renner.id}
                      rennerdetail={renner.renner}
                      renner={renner}
                      renners={renners}
                      setRenners={setRenners}
                      periode={periode}
                      deelnemer={deelnemer}
                      metFoto={metFoto}
                      selectieOverzicht={true}
                    />
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-2">
          <Separator />
        </div>
        <div className="my-2">
          <Alert>
            <AlertDescription className="flex flex-row gap-2">
              <div>Zoek Renner</div>
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-full">
          <ZoekRenner renners={renners} setRenners={setRenners} periode={periode} deelnemer={deelnemer} metFoto={metFoto} deelnemerid={deelnemer.id} />
        </div>
      </div>
    </>
  );
};

export default MaakSelectiePagina;
