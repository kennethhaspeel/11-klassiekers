"use server";

import { Deelnemer } from "@prisma/client";
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
    data: deelnemer,
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
