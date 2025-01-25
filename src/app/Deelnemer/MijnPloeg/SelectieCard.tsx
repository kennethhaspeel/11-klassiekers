"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Renner, Selectie, Team } from "@prisma/client";
import { startTransition, useState } from "react";
import { VerwijderUitSelectieAction } from "../../../../prisma/actions/SelectieActions";
import { useActionState } from "react";

type SelectieMetRenner = Selectie & { renner: Renner & { team: Team } };
interface Props {
  selectieid: number;
  rennerid: number;
  naam: string;
  afbeelding: string;
  uciranking: number;
  teamnaam: string;
  vlag: string;
  metFoto: boolean;
  setRenners: React.Dispatch<React.SetStateAction<SelectieMetRenner[]>>;
  renners: SelectieMetRenner[];
  periode: number;
}

const SelectieCard = ({
  rennerid,
  selectieid,
  naam,
  afbeelding,
  uciranking,
  teamnaam,
  vlag,
  metFoto,
  setRenners,
  renners,
  periode,
}: Props) => {
  const [waarschuwingTonen, setWaarschuwingTonen] = useState(false);

  const [error, action, isPending] = useActionState(
    VerwijderUitSelectieAction,
    null
  );

  const VerwijderRenner = async (rennerid: number) => {
    console.log(periode);
    let lijst = renners;
    lijst = lijst.filter((x) => x.rennerid == rennerid);
    setRenners(lijst);
    // verwijder renner uit database
    startTransition(() => {
      action({ selectieid: selectieid, periode: periode });
    });

    //await UpdateDatabase(selectieid);
  };
  return (
    <>
      <div>{error && <p>{error}</p>}</div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex flex-col">
              <div className="flex justify-center items-center w-full mb-2">
                <Image
                  src={`https://flagpedia.net/data/flags/h80/${vlag}.png`}
                  width={30}
                  height={30}
                  alt="vlag"
                />
              </div>
              <div>{naam}</div>
            </div>
          </CardTitle>
          <CardDescription className="text-center">{teamnaam}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-center items-center w-full mb-2">
                  {metFoto ? (
                    <Image
                      src={`https://www.procyclingstats.com/${afbeelding}`}
                      width={100}
                      height={100}
                      alt="vlag"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-full text-center">
                  UCI ranking: {uciranking}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          {waarschuwingTonen ? (
            <div className="flex flex-col bg-gray-500/50 w-full p-2 rounded-xl">
              <div className="text-center w-full my-1">Bent u zeker ?</div>
              <div>{isPending ? <p>laden</p> : <p>niet laden</p>}</div>
              <div className="w-full flex flex-row justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setWaarschuwingTonen((prevState) => !prevState)
                  }
                >
                  Annuleer
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => VerwijderRenner(rennerid)}
                >
                  Ik ben zeker
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button
                variant="outline"
                onClick={() => setWaarschuwingTonen((prevState) => !prevState)}
              >
                Verwijder
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default SelectieCard;
