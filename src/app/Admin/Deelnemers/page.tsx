import React from "react";
import { GetUsersMetFinancieelAction } from "../../../../prisma/actions/UserActions";
import { UsersMetFinancieel } from "../../../../prisma/queries/UserQueries";
import Overzicht from "./Overzicht";

const OverzichtDeelnemers = async () => {
  const users: UsersMetFinancieel = await GetUsersMetFinancieelAction();
  return (
    <>
      <Overzicht users={users} />
    </>
  );
};

export default OverzichtDeelnemers;
