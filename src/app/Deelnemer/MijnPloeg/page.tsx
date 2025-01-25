import GeenToegang from "@/components/GeenToegang";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

import { CheckPeriode } from "@/components/DatumFuncties";
import { GetWedstrijden } from "../../../../prisma/queries/WedstrijdenQueries";
import BasisSelectie from "./BasisSelectie";
import { GetUserById } from "../../../../prisma/queries/UserQueries";
import { GetSelectieByUserId } from "../../../../prisma/queries/SelectieQueries";
import { Renner, Selectie, Team } from "@prisma/client";

type SelectieMetRenner = Selectie & {renner: Renner & {team:Team}}
const MaakSelectie = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();
  if (!auth) {
    return <GeenToegang />;
  }
  const lijst = await GetWedstrijden();
  // periode 1 = eerste selectie
  // periode 2 = wedstrijddag
  // periode 3 = tussen wedstrijden
  const periode = CheckPeriode(lijst);


  const user = await getUser();
  const deelnemer = await GetUserById(user.id);
  const selecties:SelectieMetRenner[] = await GetSelectieByUserId(user.id)

  if(!deelnemer){return <p>Fout bij laden van pagina</p>}

  switch (periode) {
    case 1:
      return <BasisSelectie ploegnaam={deelnemer.ploegnaam} selecties={selecties} periode={periode}/>;
      break;

    default:
      break;
  }
  return <div>MaakSelectie</div>;
};

export default MaakSelectie;
