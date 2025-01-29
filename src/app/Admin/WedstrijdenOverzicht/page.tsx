import GeenToegang from "@/components/GeenToegang";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { GetWedstrijden } from "../../../../prisma/queries/WedstrijdenQueries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DateToDDMMYYYY, DatumVoorbij } from "@/components/DatumFuncties";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const page = async () => {
  const { isAuthenticated } = getKindeServerSession();

  const auth = await isAuthenticated();
  if (!auth) {
    return <GeenToegang />;
  }
  const lijst = await GetWedstrijden();

  return (
    <>
      <div className="flex flex-col w-full">
        <h2 className="text-2xl m-4">Overzicht Wedstrijden</h2>
        <div className="w-full m-4">
          <Table className="bg-black/20 dark:bg-white/80 dark:text-black w-full lg:w-3/4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 text-black text-lg">
                  Datum
                </TableHead>
                <TableHead className="w-1/2 text-black text-lg">
                  Benaming
                </TableHead>
                <TableHead className="w-1/2 text-black text-lg text-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lijst?.map((wedstrijd) => (
                <TableRow key={wedstrijd.id}>
                  <TableCell>{DateToDDMMYYYY(wedstrijd.datum)}</TableCell>
                  <TableCell>{wedstrijd.naam}</TableCell>
                  <TableCell className="text-center">
                    {DatumVoorbij(wedstrijd.datum) ? (
                      wedstrijd.afgesloten ? (
                        <Button className="bg-green-500 text-white w-full" asChild>
                          <Link
                            href={`Deelnemer/WedstrijdUitslag/${wedstrijd.id}`}
                            className="flex justify-center items-center gap-2 ml-0"
                            title="Uitslag "
                          >
                            Uitslag
                          </Link>
                        </Button>
                      ) : (
                        <Button className="bg-green-600 w-full">
                          <Link
                            href={`/Admin/VerwerkWedstrijd/${wedstrijd.id}`}
                            className="flex justify-center items-center gap-2 ml-0"
                            title="Uitslag Verwerken"
                          >
                            Verwerk Uitslag
                          </Link>
                        </Button>
                      )
                    ) : (
                      <Button disabled variant="outline" className="w-full dark:text-white">
                        Nog niet gereden
                      </Button>
                    )}
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

export default page;
