import React from "react";

import { GetDeelnemersFinancieel, UsersMetFinancieel } from "../../../../prisma/queries/UserQueries";
import Overzicht from "./Overzicht";

const OverzichtDeelnemers = async () => {
  const data: UsersMetFinancieel = await GetDeelnemersFinancieel();
  return (
    <>
      <Overzicht users={data} />
    </>
  );
};

export default OverzichtDeelnemers;
