"use client ";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import { Renner, Selectie, Team } from "@prisma/client";
import { ZoekRennerAction } from "../../prisma/actions/RennerActions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import ToevoegenAanSelectieCard from "@/app/Deelnemer/MijnPloeg/ToevoegenAanSelectieCard";

type SelectieMetRenner = Selectie & { renner: Renner & { team: Team } };

interface Props {
  metFoto: boolean;
  setRenners: React.Dispatch<React.SetStateAction<SelectieMetRenner[]>>;
  renners: SelectieMetRenner[];
  periode: number;
  deelnemerid: string;
}
const ZoekRenner = ({
  metFoto,
  setRenners,
  renners,
  periode,
  deelnemerid,
}: Props) => {
  const [zoekTekst, setZoekTekst] = useState<string | undefined>(undefined);
  //const[zoekResultaat,setZoekResultaat] = useState<ZoekResultaat[]|null>(null)
  const [data, action, isPending] = useActionState(ZoekRennerAction, null);

  return (
    <>
      <div className="w-full">
        {renners.filter((x) => x.datum_uit != null) ? (
          <>
            <div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <form className="flex flex-row w-full gap-3" action={action}>
                  <Input
                    type="text"
                    name="zoekterm"
                    placeholder="(deel van) naam renner"
                    onChange={(e) => setZoekTekst(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    type="submit"
                    disabled={
                      isPending ||
                      (zoekTekst != undefined && zoekTekst.length < 4)
                    }
                  >
                    <Search />
                    &nbsp;Zoek
                  </Button>

                  <span>
                    {isPending && <Loader2 className="animate-spin" />}
                  </span>
                </form>
              </div>
            </div>
            <div className="w-full mt-2 flex flex-row gap-2">
              {data && data.data ? (
                <>
                  <div className="flex flex-col w-full">
                    <div className="flex mt-2 text-xl">Zoekresultaten</div>
                    <div className="w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mx-auto justify-between">
                        {data.data.map((renner) => (
                          <ToevoegenAanSelectieCard
                            key={renner.id}
                            renner={renner}
                            metFoto={metFoto}
                            periode={periode}
                            renners={renners}
                            setRenners={setRenners}
                            deelnemerid={deelnemerid}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-2">
                  <p>
                    U kunt zoeken op de naam van de renner of een deel van de
                    naam. Om lange lijsten te voorkomen, graag minimum een
                    viertal karakters
                  </p>
                  <p>
                    &quot;out aert&quot; zou dus (onder andere) Wout Van Aert
                    als resultaat moeten hebben
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Alert>
              <AlertTitle>
                <span className="text-2xl">Selectie volledig</span>
              </AlertTitle>
              <AlertDescription>
                U hebt reeds {renners.length} renner(s) in selectie
              </AlertDescription>
            </Alert>
          </>
        )}
      </div>
    </>
  );
};

export default ZoekRenner;
