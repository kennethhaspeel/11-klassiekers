"use server";

import { Deelnemer, Prisma } from "@prisma/client";
import db from "../prisma";

export async function GetUserById(KindeId: string) {
  const result = await db.deelnemer.findUnique({
    where: {
      id: KindeId,
    },
  });
  return result!;
}

export async function InsertDeelnemer(deelnemer: Deelnemer) {
  const result = await db.deelnemer.create({
    data: {
      id: deelnemer.id,
      naam: deelnemer.naam,
      voornaam: deelnemer.voornaam,
      email: deelnemer.email,
      telefoon: deelnemer.telefoon,
      ploegnaam: deelnemer.ploegnaam,
      metFoto: deelnemer.metFoto,
      bevestigd: true,
      createdAt: deelnemer.createdAt,
      updatedAt: deelnemer.updatedAt,
      SchiftingUur: Number(deelnemer.SchiftingUur),
      SchiftingMinuten: Number(deelnemer.SchiftingMinuten),
      SchiftingSeconden: Number(deelnemer.SchiftingSeconden),
    },
  });
  return result;
}

export async function UpdateMetFoto(deelnemerid: string, metFoto: boolean) {
  const result = await db.deelnemer.update({
    where: {
      id: deelnemerid,
    },
    data: {
      metFoto: metFoto,
    },
  });
  return result;
}

export async function CreatePushData(
  deelnemerid: string,
  endpoint: string,
  p256: string,
  auth: string
) {
  await db.pushData.create({
    data: {
      deelnemerid: deelnemerid,
      endpoint: endpoint,
      p256: p256,
      auth: auth,
    },
  });
}
export async function DeletePushData(
  deelnemerid: string,
  endpoint: string,
  p256: string,
  auth: string
) {
  await db.pushData.deleteMany({
    where: {
      deelnemerid: deelnemerid,
      endpoint: endpoint,
      p256: p256,
      auth: auth,
    },
  });
}

export async function GetAllPushData() {
  const result = await db.pushData.findMany();
  return result;
}

export type UserFinancieel = Prisma.PromiseReturnType<
  typeof GetDeelnemerFinancieel
>;

export async function GetDeelnemerFinancieel(deelnemerid: string) {
  try {
    const result = await db.deelnemer.findFirst({
      where: {
        id: deelnemerid,
      },
      include: {
        Selectie: true,
        Financieel: true,
      },
    });
    return result;
  } catch (error: unknown) {
    console.log(typeof error);
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export type UsersMetFinancieel = Prisma.PromiseReturnType<
  typeof GetDeelnemersFinancieel
>;

export async function GetDeelnemersFinancieel() {
  try {
    const result = await db.deelnemer.findMany({
      include: {
        Selectie: true,
        Financieel: true,
      },
    });
    //console.log(result)
    return result.sort((a,b)=>a.naam.localeCompare(b.naam) || a.voornaam.localeCompare(b.voornaam));
  } catch (error: unknown) {
    console.log(typeof error);
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
