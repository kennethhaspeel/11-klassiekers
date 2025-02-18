"use client";

import { useState } from "react";
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

interface Props {
  users: UsersMetFinancieel;
}
const Overzicht = ({ users }: Props) => {
  //console.log(users);
  const [deelnemers, setDeelnemers] = useState(users!);

  const BetalingToevoegen = async (deelnemerid: string) => {

    const result = await PostUserFinancieelQuery({
      deelnemerid: deelnemerid,
      bedrag: "15",
      betaalwijze: "overschrijving",
    });
    if (result.success) {
      const deels = deelnemers;
      const deel = deels.findIndex((x) => x.id == deelnemerid);
      deels[deel].Financieel.push(result.data!);
      setDeelnemers(deels);
    }
  };
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
                {/* <TableHead>Transfers</TableHead> */}
                <TableHead>Schuld</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deelnemers.map((deel) => (
                <TableRow key={deel.id}>
                  <TableCell>
                    {deel.naam} {deel.voornaam}
                  </TableCell>
                  {/* <TableCell>
                    {deel.Selectie.filter((x) => x.datum_in == null).length}
                  </TableCell> */}
                  <TableCell>
                    {deel.Financieel.reduce((acc, obj) => {
                      return acc + obj.bedrag;
                    }, 0)}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => BetalingToevoegen(deel.id)}>
                      Betaling
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
         </Table> 
        </div>
      </div>
    </>
  );
};

export default Overzicht;
