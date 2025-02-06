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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  RennerDetail,
  SelectieMetRenner,
} from "../../prisma/Models/SelectieMetRenners";
import { Deelnemer } from "@prisma/client";
import { useState } from "react";
import {
  ToevoegenSelectieAction,
  VerwijderSelectieAction,
} from "../../prisma/actions/SelectieActions";
import SpinnersBlok from "./spinners";

interface Props {
  renner: SelectieMetRenner;
  rennerdetail: RennerDetail;
  renners: SelectieMetRenner[];
  setRenners: React.Dispatch<React.SetStateAction<SelectieMetRenner[]>>;
  periode: number;
  deelnemer: Deelnemer;
  metFoto: boolean;
  selectieOverzicht: boolean;
}
const RennerCard = ({
  renner,
  rennerdetail,
  renners,
  setRenners,
  periode,
  metFoto,
  selectieOverzicht,
  deelnemer,
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isBezig, setIsBezig] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isTransferUit = renners.some(
    (x) => x.renner.id == rennerdetail.id && x.datum_uit != null
  );
  const inSelectie = renners.some(
    (x) => x.renner.id == rennerdetail.id && x.datum_uit == null
  );

  const VerwijderUitSelectie = async () => {
    setIsBezig(true);
    const result =await VerwijderSelectieAction({
      selectieid: renner.id,
      periode: periode,
      deelnemerid: deelnemer.id,
    });

    if (result.data) {
      setRenners(result.data as unknown as SelectieMetRenner[]);
    }
    if (result.error) {
      setError(result.error as string);
    }
    setIsBezig(false);
  };
  const ToevoegenSelectie = async () => {
    setIsBezig(true);
    const result = await ToevoegenSelectieAction({
      deelnemerid: deelnemer.id,
      rennerid: rennerdetail.id,
    });
    if (result.data) {
      setRenners(result.data as unknown as SelectieMetRenner[]);
    }
    if (result.error) {
      setError(result.error as string);
    }
    setIsBezig(false);
  };
  return (
    <>
      <Card className="w-[350px] mt-2">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex flex-col">
              <div className="flex justify-center items-center w-full mb-2">
                <Image
                  src={`https://flagpedia.net/data/flags/h80/${rennerdetail.vlag}.png`}
                  width={30}
                  height={30}
                  alt="vlag"
                  style={{height:'auto',width:'auto'}}
                />
              </div>
              <div>{rennerdetail.naam}</div>
            </div>
          </CardTitle>
          <CardDescription className="text-center">
            {rennerdetail.team.naam}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-center items-center w-full mb-2">
                  {metFoto ? (
                    <Image
                      src={`https://www.procyclingstats.com/${rennerdetail.foto}`}
                      width={100}
                      height={100}
                      alt="foto"
                      style={{height:'auto',width:'auto'}}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-full text-center">
                  UCI ranking: {rennerdetail.uciranking}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          {error ? (
            <p>Fout bij bewaren</p>
          ) : (
            <span>
              {isBezig || isBezig ? (
                <SpinnersBlok />
              ) : (
                <span>
                  {selectieOverzicht ? (
                    periode === 3 ? (
                      <div>
                        <Button onClick={() => setDialogOpen(true)}>
                          Transfer Uit
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button onClick={VerwijderUitSelectie}>
                          Verwijder
                        </Button>
                      </div>
                    )
                  ) : inSelectie ? (
                    <div>
                      <Button disabled={true}>Reeds in selectie</Button>
                    </div>
                  ) : isTransferUit ? (
                    <div>
                      <Button disabled={true}>Is getransfereerd</Button>
                    </div>
                  ) : (
                    <div>
                      <Button onClick={ToevoegenSelectie}>Toevoegen</Button>
                    </div>
                  )}
                </span>
              )}
            </span>
          )}
        </CardFooter>
      </Card>

      <Dialog open={dialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bent u zeker?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <p>
              Hierme transfereert u&nbsp;
              <span className="font-bold text-cyan-400">
                {rennerdetail.naam}
              </span>{" "}
              uit uw ploeg. Deze kunt u later niet meer terug selecteren
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Annuleer
            </Button>
            <Button
              className="bg-red-600"
              onClick={() => {
                setDialogOpen(false);
                VerwijderUitSelectie();
              }}
            >
              Ik ben zeker
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RennerCard;
