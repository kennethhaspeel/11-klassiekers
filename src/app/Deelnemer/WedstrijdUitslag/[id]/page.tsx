import {  Uitslag } from "@prisma/client";
import { GetUitslagByWedstrijdidAction } from "../../../../../prisma/actions/UitslagActions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GeenToegang from "@/components/GeenToegang";
import { GetRennersPerUitslag } from "../../../../../prisma/queries/WedstrijdenQueries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type Params = Promise<{ id: number }>;

type uitslagModel = ({
  renner: {
      id: number;
      naam: string;
      foto: string;
      vlag: string;
      nationaliteit: string;
      url: string;
      uciranking: number;
      teamid: number;
  }} & {
    id: number;
    rennerid: number;
    wedstrijdid: number;
    positie: number;
})[]

const WedstrijdUitslag = async ({ params }: { params: Params }) => {
  const { isAuthenticated } = getKindeServerSession();

  const auth = await isAuthenticated();
  if (!auth) {
    return <GeenToegang />;
  }

  const { id } = await params;

  const getWedstrijd : Promise<Uitslag[] |null |undefined> = GetUitslagByWedstrijdidAction(id)
  const getResultaat: Promise<uitslagModel |null |undefined> = GetRennersPerUitslag(id)

  const [wedstrijd,uitslag] = await Promise.all([getWedstrijd,getResultaat])


  return (
    <>
      <div className="flex flex-col w-full">
        {wedstrijd ? (
          <>
            <div className="w-full flex">
              {/* <div className="text-2xl mx-auto p-4">{wedstrijd.naam}</div> */}
            </div>
            <div className="flex w-1/2 mx-auto align-items-center">
              {uitslag ? (
                <Table className=" dark:bg-black/70">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">
                        Positie
                      </TableHead>
                      <TableHead>
                        Naam
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uitslag.map((rij) => (
                    <TableRow key={rij.id}>
                      <TableCell className="text-center">{rij.positie} </TableCell>
                      <TableCell>{rij.renner.naam}</TableCell></TableRow>
                  ))}
                  </TableBody>
                </Table>

              ) : (
                <h2 className="text-2xl">Geen uitslag gevonden</h2>
              )}
            </div>
          </>
        ) : (
          <p>Wedstrijd niet gevonden</p>
        )}
      </div>
    </>
  );
};

export default WedstrijdUitslag;
