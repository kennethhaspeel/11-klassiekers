import React from "react";

import { GetDeelnemersFinancieel, UsersMetFinancieel } from "../../../../prisma/queries/UserQueries";
import Overzicht from "./Overzicht";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GeenToegang from "@/components/GeenToegang";

const OverzichtDeelnemers = async () => {
  const { isAuthenticated, getPermissions } = getKindeServerSession();

  const auth = await isAuthenticated();
  const rechten = await getPermissions();
  if (!auth || (rechten && !rechten?.permissions.includes("admin")) ) {
    return <GeenToegang />;
  }
  const data: UsersMetFinancieel = await GetDeelnemersFinancieel();
  return (
    <>
      <Overzicht users={data} />
    </>
  );
};

export default OverzichtDeelnemers;
