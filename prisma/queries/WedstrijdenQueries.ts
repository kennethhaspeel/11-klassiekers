"use server";

import { revalidatePath } from "next/cache";
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

export async function GetWedstrijdByIdQuery(wedstrijdid: number) {
  try {
    const result = await db.wedstrijd.findUnique({
      where: {
        id: Number(wedstrijdid),
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
}

export async function GetRennersPerUitslag(wedstrijdid: number) {
  try {
    const result = await db.uitslag.findMany({
      where: {
        wedstrijdid: Number(wedstrijdid),
      },
      include: {
        renner: true,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
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
    if (renner) {
      await db.$executeRaw`insert into public.uitslagen(rennerid,wedstrijdid,positie)values(${Number(
        renner!.id
      )},${Number(data.wedstrijdid)},${Number(rij.positie)})`;
    } else {
      console.log(rij.naam);
    }
  }
  await db.$executeRaw`UPDATE public.wedstrijden set afgesloten = TRUE where id=${data.wedstrijdid}`;
  revalidatePath(`/Admin/VerwerkWedstrijd/${data.wedstrijdid}`);
  revalidatePath("/Deelnemer/WedstrijdenOverzicht");
  return true;
}

export async function DeleteResultatenVanWedstrijdQuery(wedstrijdid: number) {
  await db.$executeRaw`DELETE FROM public.uitslagen WHERE wedstrijdid = ${wedstrijdid}`;
  revalidatePath(`/Admin/VerwerkWedstrijd/${wedstrijdid}`);
}
