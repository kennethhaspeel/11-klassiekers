import React from "react";
import { GetUitslagByWedstrijdidAction } from "../../../../../prisma/actions/UitslagActions";
import { Renner, Selectie, Wedstrijd } from "@prisma/client";
import { GetAlleSelectiesActions } from "../../../../../prisma/actions/SelectieActions";

type SelectieModel = Selectie & { renner: Renner };
type Params = Promise<{ wedstrijdid: number }>;

const VerwerkTussenstand = async ({ params }: { params: Params }) => {
  const { wedstrijdid } = await params;
  console.log(wedstrijdid);

  const getWedstrijd: Promise<Wedstrijd | null | undefined> =
    GetUitslagByWedstrijdidAction(wedstrijdid);
  const getSelecties: Promise<SelectieModel[] | null | undefined> =
    GetAlleSelectiesActions();

  const [wedstrijd, selecties] = await Promise.all([
    getWedstrijd,
    getSelecties,
  ]);
  console.log(wedstrijd);
  console.log(selecties);

  return <div>page</div>;
};

export default VerwerkTussenstand;
