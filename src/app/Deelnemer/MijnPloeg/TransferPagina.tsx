"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Renner, Selectie, Team } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ArrowDownUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SetMetFoto from "@/components/SetMetFoto";

import ZoekRenner from "@/components/ZoekRenner";
import TransferUitCard from "./TransferUitCard";
type SelectieMetRenner = Selectie & { renner: Renner & { team: Team } };
interface Props {
  ploegnaam: string;
  selecties: SelectieMetRenner[];
  periode: number;
  inclFoto: boolean;
  deelnemerid: string;
}

const TransferPagina = ({
  ploegnaam,
  selecties,
  periode,
  inclFoto,
  deelnemerid,
}: Props) => {
  const [renners, setRenners] = useState<SelectieMetRenner[]>(selecties);
  const [metFoto, setMetFoto] = useState<boolean>(inclFoto);
  const [aantalTransfers, setAantalTransfers] = useState<number>(3);

  useEffect(() => {
    setAantalTransfers(3 - renners.filter((x) => x.datum_uit != null).length);
  }, [renners]);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="p-2 flex flex-row align-middle">
          <div>
            <h2 className="text-2xl">Selectie &quot;{ploegnaam}&quot;</h2>
          </div>
          <div className="ms-4">
            <SetMetFoto
              setMetFoto={setMetFoto}
              metFoto={metFoto}
              deelnemerid={deelnemerid}
            />
          </div>
        </div>
        <div className="flex flex-col w-full p-2 mx-4">
          <div className="mt-4">
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="selectie">
                  <AccordionTrigger>
                    <Alert>
                      <AlertTitle>
                        <div className="flex flex-row w-full">
                          <div>Huidige selectie</div>
                          <div className="ms-3">
                            <Badge>{renners.length} renner(s)</Badge>
                          </div>
                          <div className="ms-3">
                            <Badge>
                              {aantalTransfers} transfer(s) resterend
                            </Badge>
                          </div>
                          <div className="ms-5">
                            <ArrowDownUp size={28} />
                          </div>
                        </div>
                      </AlertTitle>
                    </Alert>
                  </AccordionTrigger>
                  <AccordionContent>
                    <>
                      <div className="flex w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mx-auto justify-between">
                          {renners ? (
                            renners?.map((selectie) => (
                              <TransferUitCard
                                key={selectie.id}
                                selectieid={selectie.id}
                                rennerid={selectie.rennerid}
                                // datum_in={selectie.datum_in}
                                // datum_uit={selectie.datum_uit}
                                naam={selectie.renner.naam}
                                afbeelding={selectie.renner.foto}
                                uciranking={selectie.renner.uciranking}
                                teamnaam={selectie.renner.team.naam}
                                vlag={selectie.renner.vlag}
                                metFoto={metFoto}
                                setRenners={setRenners}
                                renners={renners}
                                periode={periode}
                              />
                            ))
                          ) : (
                            <p>Nog geen renners geselecteerd</p>
                          )}
                        </div>
                      </div>
                    </>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-xl">Zoek renner</h2>
              </div>
              <div>
                {aantalTransfers === 0 ? (
                  <Alert className="bg-red-600 mt-4 w-1/2">
                    <AlertTitle className="text-xl">Geen Transfers</AlertTitle>
                    <AlertDescription>
                      U hebt geen tranfers meer over
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    {renners.filter((x) => x.datum_uit == null).length ===
                    10 ? (
                      <Alert className="bg-orange-600 mt-4 w-1/2">
                        <AlertTitle className="text-xl">
                          Geen Transfers
                        </AlertTitle>
                        <AlertDescription>
                          U hebt momenteel het maximum aantal renners in uw
                          selectie
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div>
                      <ZoekRenner
                        metFoto={metFoto}
                        renners={renners}
                        setRenners={setRenners}
                        periode={periode}
                        deelnemerid={deelnemerid}
                      />
                    </div>
                    )}
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferPagina;
