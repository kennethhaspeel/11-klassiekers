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
import { Input } from "@/components/ui/input";
import { Renner, Selectie, Team } from "@prisma/client";
import Image from "next/image";

import { useActionState, useEffect } from "react";
import { ToevoegenAanSelectieAction } from "../../../../prisma/actions/SelectieActions";
import { Loader2 } from "lucide-react";

type RennerMetTeam = Renner & { team: Team };
type SelectieMetRenner = Selectie & { renner: Renner & { team: Team } };
interface Props {
  renner: RennerMetTeam;
  metFoto: boolean;
  setRenners: React.Dispatch<React.SetStateAction<SelectieMetRenner[]>>;
  renners: SelectieMetRenner[];
  periode: number;
  deelnemerid: string;
}

const ToevoegenAanSelectieCard = ({
  renner,
  metFoto,
  renners,
  deelnemerid,
  setRenners,
}: Props) => {
  const [data, action, isPending] = useActionState(
    ToevoegenAanSelectieAction,
    null
  );

  const ToevoegenAanRenners = (NieuweSelectie:Selectie) => {
    const r: SelectieMetRenner = {
      id:NieuweSelectie.id,
      rennerid: NieuweSelectie.rennerid,
      deelnemerid:NieuweSelectie.deelnemerid,
      datum_in: NieuweSelectie.datum_in,
      datum_uit: NieuweSelectie.datum_uit,
      renner: renner
    }
    const sel = [...renners, r];
    setRenners(sel)
    console.log(sel);
  };
  useEffect(() => {
    if (data?.data) {
      ToevoegenAanRenners(data.data)
    }
  }, [data?.data]);
  return (
    <>

      <Card className="w-[350px] mt-2">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex flex-col">
              <div className="flex justify-center items-center w-full mb-2">
                <Image
                  src={`https://flagpedia.net/data/flags/h80/${renner.vlag}.png`}
                  width={30}
                  height={30}
                  alt="vlag"
                />
              </div>
              <div>{renner.naam}</div>
            </div>
          </CardTitle>
          <CardDescription className="text-center">
            {renner.team.naam}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-center items-center w-full mb-2">
                  {metFoto ? (
                    <Image
                      src={`https://www.procyclingstats.com/${renner.foto}`}
                      width={100}
                      height={100}
                      alt="vlag"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-full text-center">
                  UCI ranking: {renner.uciranking}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <div>
            <form action={action}>
              <span hidden>
                <Input
                  type="text"
                  defaultValue={renner.id}
                  id="rennerid"
                  name="rennerid"
                />
                <Input
                  type="text"
                  defaultValue={deelnemerid}
                  id="deelnemerid"
                  name="deelnemerid"
                />
              </span>
              <Button
                type="submit"
                variant="outline"
                disabled={
                  renners.some((x) => x.rennerid === renner.id) || isPending
                }
                //onClick={() => setWaarschuwingTonen((prevState) => !prevState)}
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Toevoegen</span>
                )}
              </Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ToevoegenAanSelectieCard;
