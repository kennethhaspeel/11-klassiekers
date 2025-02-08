"use client";

import { Deelnemer } from "@prisma/client";
import { SelectieMetRenner } from "../../../../prisma/Models/SelectieMetRenners";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { ZoekRennerAction } from "../../../../prisma/actions/RennerActions";
import { Button } from "@/components/ui/button";
import RennerCard from "@/components/RennerCard";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  renners: SelectieMetRenner[];
  setRenners: React.Dispatch<React.SetStateAction<SelectieMetRenner[]>>;
  periode: number;
  deelnemer: Deelnemer;
  metFoto: boolean;
  deelnemerid: string;
}

const ZoekRenner = ({
  renners,
  setRenners,
  periode,
  deelnemer,
  metFoto,
}: Props) => {
  const [zoekTekst, setZoekTekst] = useState<string | undefined>(undefined);
  const [data, action, isPending] = useActionState(ZoekRennerAction, null);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-col">
          {renners.filter((x) => x.datum_uit == null).length > 9 ? (
            <Alert className="bg-orange-600">
              <AlertDescription>
                U hebt 10 renners in uw selectie
              </AlertDescription>
            </Alert>
          ) : renners.filter((x) => x.transfer_in == true ).length == 3 ? (
            <Alert className="bg-orange-600">
              <AlertDescription>
                U hebt geen transfers meer
              </AlertDescription>
            </Alert>
          ) : (
            <div>
              <form action={action} className="flex flex-row">
                <Input
                  type="text"
                  name="zoekterm"
                  placeholder="(deel van) naam"
                  onChange={(e) => setZoekTekst(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={
                    isPending ||
                    (zoekTekst != undefined && zoekTekst.length < 4)
                  }
                >
                  Zoek
                </Button>
              </form>
            </div>
          )}
        </div>

        <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {data && data.data &&renners.filter((x) => x.datum_uit == null).length <10 ? (
            <>
              {data.data.map((renner) => (
                <RennerCard
                  key={renner.id}
                  rennerdetail={renner}
                  renner={renner as unknown as SelectieMetRenner}
                  renners={renners}
                  setRenners={setRenners}
                  periode={periode}
                  deelnemer={deelnemer}
                  metFoto={metFoto}
                  selectieOverzicht={false}
                />
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ZoekRenner;
