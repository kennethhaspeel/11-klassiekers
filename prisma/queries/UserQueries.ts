"use server";

import { Deelnemer } from "@prisma/client";
import db from "../prisma";

export async function GetUserById(KindeId: string) {
  const result = await db.deelnemer.findUnique({
    where: {
      id: KindeId,
    },
  });
  return result;
}

export async function InsertDeelnemer(deelnemer: Deelnemer) {
  const result = await db.deelnemer.create({
    data: deelnemer,
  });
  return result;
}
