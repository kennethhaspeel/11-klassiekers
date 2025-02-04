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
type uitslagoverzicht = {
  deelnemerid: string;
  rennerid: number;
  punten: number;
  wedstrijdid:number;
};
const VerwerkTussenstand = async ({ params }: { params: Params }) => {
  const { wedstrijdid } = await params;

  const getUitslag: Promise<Uitslag[] | null | undefined> =
    GetUitslagByWedstrijdidAction(wedstrijdid);
  const getSelecties: Promise<DeelnemersMetSelectie> =
    GetUserMetSelectiesAction();

  const [uitslag, selecties] = await Promise.all([getUitslag, getSelecties]);
  
  function BerekenPunten() {
    const lijst:uitslagoverzicht[] = [];
    selecties.map((u) => {
      u.Selectie.map((deel) => {
        const p = uitslag?.find((x) => x.rennerid == deel.rennerid)?.positie || 100
        const punt: uitslagoverzicht = {
          deelnemerid: deel.deelnemerid,
          rennerid: deel.rennerid,
          punten: p,
          wedstrijdid: Number(wedstrijdid)
        };
        lijst.push(punt);
      });
    });
    console.log(lijst)
  }
  BerekenPunten()
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <Alert className=" bg-cyan-700 text-black">
            <AlertTitle className="font-bold text-2xl">
              Verwerken uitslag
            </AlertTitle>
          </Alert>
        </div>
        <div className="flex flex-col ms-3 me-3">
          {selecties
            ? selecties.map((deelnemer) => (
                <div
                  key={`div_${deelnemer.id}`}
                  className="w-full flex flex-col"
                >
                  <div className="flex flex-col w-full" key={deelnemer.id}>
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
                        {deelnemer.Selectie.filter(
                          (x) => x.datum_uit == null
                        ).map((sel) => (
                          <TableRow key={sel.id}>
                            <TableCell className="text-white">
                              {sel.renner.naam}
                            </TableCell>
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
        </div>
      </div>
    </>
  );
};

export default VerwerkTussenstand;
