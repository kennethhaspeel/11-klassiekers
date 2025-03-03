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
  const result = await db.wedstrijd.findUnique({
    where: {
      id: Number(wedstrijdid),
    },
  });
  return result;
}

export async function GetUitslagByWedstrijdIdQuery(wedstrijdid: number) {
  const result = await db.uitslag.findMany({
    where: {
      wedstrijdid: Number(wedstrijdid),
    },
  });
  return result;
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
  try {
    for (const rij of data.uitslag) {
      console.log(rij);
      const renner = await GetRennerByIdQuery(rij.naam);
      if (renner) {
        await db.$executeRaw`insert into public.uitslagen(rennerid,wedstrijdid,punten)values(${Number(
          renner!.id
        )},${Number(data.wedstrijdid)},${Number(rij.positie)})`;
      } else {
        console.log(rij.naam);
      }
    }

    await db.$executeRaw`UPDATE public.wedstrijden SET afgesloten = TRUE WHERE id=${Number(data.wedstrijdid)}`;

    // revalidatePath(`/Admin/VerwerkWedstrijd/${data.wedstrijdid}`);
    // revalidatePath("/Deelnemer/WedstrijdenOverzicht");
  } catch (exception: unknown) {
    console.log(exception as string);
  }
}

export async function DeleteResultatenVanWedstrijdQuery(wedstrijdid: number) {
  await db.$executeRaw`DELETE FROM public.uitslagen WHERE wedstrijdid = ${wedstrijdid}`;
  revalidatePath(`/Admin/VerwerkWedstrijd/${wedstrijdid}`);
}

interface ISetWedstrijdUrl {
  wedstrijdid: number;
  url: string;
}
export async function SetWedstrijdUrl({ wedstrijdid, url }: ISetWedstrijdUrl) {
  await db.wedstrijd.update({
    where: {
      id: Number(wedstrijdid),
    },
    data: {
      url: url,
    },
  });
}

interface IUpdateWedstrijdStatus {
  wedstrijdid: number;
  afgesloten: boolean;
}
export async function UpdateWedstrijdStatus({wedstrijdid,afgesloten}:IUpdateWedstrijdStatus){
  if(afgesloten){
    await db.$executeRaw`UPDATE public.wedstrijden SET afgesloten = TRUE WHERE id=${Number(wedstrijdid)}`;
  } else {
    await db.$executeRaw`UPDATE public.wedstrijden SET afgesloten = FALSE WHERE id=${Number(wedstrijdid)}`;
  }
}