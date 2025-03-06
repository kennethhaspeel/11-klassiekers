"use client";

import { useEffect, useState } from "react";
import { UsersMetFinancieel } from "../../../../prisma/queries/UserQueries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { PostUserFinancieelQuery } from "../../../../prisma/queries/FinancieelQueries";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  users: UsersMetFinancieel;
}
const Overzicht = ({ users }: Props) => {
  //console.log(users);
  const [deelnemers, setDeelnemers] = useState(users!);
  const [deelnemerid, setDeelnemerid] = useState<string | null>(null);
  const [toonModal, SetToonModal] = useState<boolean>(false);
  const [bedrag, setBedrag] = useState<string>("0");
  const [betaalwijze, setBetaalwijze] = useState<string>("overschrijving");
  const [loading, setLoading] = useState(false);

  const BetalingToevoegen = async () => {
    setLoading(true);
    const result = await PostUserFinancieelQuery({
      deelnemerid: deelnemerid!,
      bedrag: `-${bedrag}`,
      betaalwijze: betaalwijze,
    });
    if (result.success) {
      const deel = deelnemers.find((x) => x.id == deelnemerid);

      const deels = deelnemers.filter((x) => x !== deel);

      deel!.Financieel.push(result.data!);
      deels.push(deel!);
      setDeelnemers(
        deels.sort(
          (a, b) =>
            a.naam.localeCompare(b.naam) || a.voornaam.localeCompare(b.voornaam)
        )
      );
    }

    SetToonModal(false);
    setLoading(false);
    setDeelnemerid(null)
  };

  useEffect(() => {
    console.log(deelnemers);
  }, [deelnemers]);
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="text-2xl w-full">
          Overzicht Deelnemers&nbsp;<Badge>{deelnemers.length}</Badge>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead className="text-center">Transfers</TableHead>
                <TableHead className="text-center">Schuld</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deelnemers.map((deel) => (
                <TableRow key={deel.id}>
                  <TableCell>
                    {deel.naam} {deel.voornaam}
                  </TableCell>
                  <TableCell className="text-center">
                    {deel.Selectie.filter((x) => x.transfer_in  == true).length}
                  </TableCell>
                  <TableCell className="text-center">
                    {deel.Financieel.reduce((acc, obj) => {
                      return acc + obj.bedrag;
                    }, 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => {
                        setDeelnemerid(deel.id);
                        SetToonModal(true);
                      }}
                    >
                      Betaling
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={toonModal} onOpenChange={SetToonModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <VisuallyHidden asChild>
               <DialogDescription>Betaling ingeven</DialogDescription>
            </VisuallyHidden>
           
            <DialogTitle>Betaling Ingeven</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Bedrag
              </Label>
              <Input
                id="bedrag"
                type="number"
                defaultValue="0"
                className="col-span-3"
                onChange={(e) => {
                  setBedrag(e.target.value);
                }}
              />
            </div>
            <hr />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right align-top">
                Betaalwijze
              </Label>
              <div className="col-span-3">
                <RadioGroup
                  defaultValue="overschrijving"
                  onValueChange={(e) => {
                    setBetaalwijze(e);
                  }}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="overschrijving" id="r1" />
                    <Label htmlFor="r1">Overschrijving</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="r2" />
                    <Label htmlFor="r2">Cash</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={()=>SetToonModal(false)}>Annuleer</Button>
            </DialogClose>
            
            {loading ? (
              <Button type="button" disabled>
                <Loader2 className="animate-spin" />
                Bewaar
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  BetalingToevoegen();
                }}
              >
                Bewaar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Overzicht;
