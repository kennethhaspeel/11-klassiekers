import { GetUitslagByWedstrijdidAction } from "../../../../../prisma/actions/UitslagActions";
import { Uitslag } from "@prisma/client";

import { GetUserMetSelectiesAction } from "../../../../../prisma/actions/UserActions";
import { DeelnemersMetSelectie } from "../../../../../prisma/queries/SelectieQueries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle } from "@/components/ui/alert";

type Params = Promise<{ wedstrijdid: number }>;

const VerwerkTussenstand = async ({ params }: { params: Params }) => {
  const { wedstrijdid } = await params;

  const getUitslag: Promise<Uitslag[] | null | undefined> =
    GetUitslagByWedstrijdidAction(wedstrijdid);
  const getSelecties: Promise<DeelnemersMetSelectie> =
    GetUserMetSelectiesAction();

  const [uitslag, selecties] = await Promise.all([getUitslag, getSelecties]);

  return (
    <>
      {selecties
        ? selecties.map((deelnemer) => (
            <div key={`div_${deelnemer.id}`} className="w-full flex flex-col">
              <div className="flex flex-col w-full"  key={deelnemer.id} >
                <Alert className=" bg-green-400 text-black">
                  <AlertTitle>{deelnemer.ploegnaam}</AlertTitle>
                </Alert>
                <Table key={deelnemer.id} className="bg-gray-500">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Renner</TableHead>
                      <TableHead className="text-white">Punten</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deelnemer.Selectie.map((sel) => (
                      <TableRow key={sel.id}>
                        <TableCell className="text-white">{sel.renner.naam}</TableCell>
                        <TableCell className="text-white">
                          {uitslag?.find((x) => x.rennerid == sel.rennerid)
                            ?.positie || 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))
        : ""}
    </>
  );
};

export default VerwerkTussenstand;
