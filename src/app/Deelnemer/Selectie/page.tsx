import GeenToegang from "@/components/GeenToegang";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GetPeriodeAction, GetSelectieByUserId } from "../../../../prisma/queries/SelectieQueries";
import { SelectieMetRenner } from "../../../../prisma/Models/SelectieMetRenners";
import MaakSelectiePagina from "./MaakSelectiePagina";
import { Deelnemer } from "@prisma/client";
import { GetUserById } from "../../../../prisma/queries/UserQueries";


const PloegSamenstellen = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();
  if (!auth) {
    return <GeenToegang />;
  }
  // periode 1 = eerste selectie
  // periode 2 = wedstrijddag
  // periode 3 = tussen wedstrijden
  const periode = await GetPeriodeAction();
  if (periode == 2) return <p>Geen transfers mogelijk op een wedstrijddag</p>;

  const user = await getUser();

  const GetDeelnemer:Promise<Deelnemer> = GetUserById(user.id)
  const GetRenners:Promise<SelectieMetRenner[]> = GetSelectieByUserId(user.id)
  const [renners,deelnemer] = await Promise.all([GetRenners,GetDeelnemer])

  return <MaakSelectiePagina rennersLijst={renners} periode={periode} deelnemer={deelnemer}/>

};

export default PloegSamenstellen;


//   const getWedstrijd : Promise<Wedstrijd |null |undefined> = GetUitslagByWedstrijdidAction(id)
//   const getResultaat: Promise<uitslagModel |null |undefined> = GetRennersPerUitslag(id)