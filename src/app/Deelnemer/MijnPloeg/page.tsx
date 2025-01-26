import GeenToegang from "@/components/GeenToegang";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

import { CheckPeriode } from "@/components/DatumFuncties";
import { GetWedstrijden } from "../../../../prisma/queries/WedstrijdenQueries";
import BasisSelectie from "./BasisSelectie";
import { GetUserById } from "../../../../prisma/queries/UserQueries";
import { GetSelectieByUserId } from "../../../../prisma/queries/SelectieQueries";
import { Renner, Selectie, Team } from "@prisma/client";
import TransferPagina from "./TransferPagina";

type SelectieMetRenner = Selectie & { renner: Renner & { team: Team } };
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
  const selecties: SelectieMetRenner[] = await GetSelectieByUserId(user.id);

  if (!deelnemer) {
    return <p>Fout bij laden van pagina</p>;
  }
  console.log(periode);
  switch (periode) {
    case 1:
      return (
        <BasisSelectie
          ploegnaam={deelnemer.ploegnaam}
          deelnemerid={deelnemer.id}
          inclFoto={deelnemer.metFoto}
          selecties={selecties}
          periode={periode}
        />
      );
    case 3:
      return (
        <TransferPagina
          ploegnaam={deelnemer.ploegnaam}
          deelnemerid={deelnemer.id}
          inclFoto={deelnemer.metFoto}
          selecties={selecties}
          periode={periode}
        />
      );
    default:
      return <p>Geen aanpassing aan selectie mogelijk op wedstrijddag</p>;
  }
};

export default MaakSelectie;
