"use server";

import db from "../prisma";
import { GetRennerByIdQuery } from "./RennerQueries";

export async function GetWedstrijden() {
  const result = await db.wedstrijd.findMany({
    orderBy: {
      datum: "asc",
    },
  });
  return result;
}
interface BewaarUitslagInterface {
  wedstrijdid: number;
  uitslag: {
    positie: number;
    naam: string;
  }[];
}
export async function PostUitslagWedstrijdQuery(data: BewaarUitslagInterface) {
  for (const rij of data.uitslag) {
    const renner = await GetRennerByIdQuery(rij.naam);
    if(renner){
            await db.$executeRaw`insert into public.uitslagen(rennerid,wedstrijdid,positie)values(${Number(
      renner!.id
    )},${Number(data.wedstrijdid)},${Number(rij.positie)})`;
    } else {
        console.log(rij.naam)
    }

  }
  await db.$executeRaw`UPDATE public.wedstrijden set afgesloten = TRUE where id=${data.wedstrijdid}`
  return true;
}
