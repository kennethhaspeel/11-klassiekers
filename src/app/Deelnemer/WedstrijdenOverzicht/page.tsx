import GeenToegang from "@/components/GeenToegang";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React, { Fragment } from "react";
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
          <Table className="bg-black/20 dark:bg-white/80 dark:text-black w-full hidden md:block lg:w-3/4">
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
                        <Button className="bg-green-800 text-white" asChild>
                          <Link
                            href={`/Deelnemer/WedstrijdUitslag/${wedstrijd.id}`}
                            className="flex justify-center items-center gap-2 ml-0 bg-green-700 w-full"
                            title="Uitslag Verwerken"
                          >
                            Uitslag
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="dark:text-white w-full"
                        >
                          Nog niet verwerkt
                        </Button>
                      )
                    ) : (
                      <Button
                        disabled
                        variant="outline"
                        className="dark:text-white w-full"
                      >
                        Nog niet gereden
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="m-4 md:hidden">
          <Table className="me-2 pe-2">
            <TableBody>
              {lijst?.map((wedstrijd) => (
                <Fragment key={`fragment_${wedstrijd.id}`}>
                  <TableRow key={`wedstrijd_${wedstrijd.id}`}>
                    <TableCell key={`datum_${wedstrijd.id}`}>{DateToDDMMYYYY(wedstrijd.datum)}</TableCell>
                    <TableCell key={`benaming_${wedstrijd.id}`}>{wedstrijd.naam}</TableCell>
                  </TableRow>
                  <TableRow key={`status_${wedstrijd.id}`}>
                    <TableCell colSpan={2} className="border-b-gray-800 border-b-2">
                      {DatumVoorbij(wedstrijd.datum) ? (
                        wedstrijd.afgesloten ? (
                          <Button className="bg-green-800 text-white" asChild>
                            <Link
                              href={`/Deelnemer/WedstrijdUitslag/${wedstrijd.id}`}
                              className="flex justify-center items-center gap-2 ml-0 bg-green-700 w-full"
                              title="Uitslag Verwerken"
                            >
                              Uitslag
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            disabled
                            variant="outline"
                            className="dark:text-white w-full"
                          >
                            Nog niet verwerkt
                          </Button>
                        )
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="dark:text-white w-full"
                        >
                          Nog niet gereden
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default page;
