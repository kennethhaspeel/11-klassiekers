"use server";

import { Prisma } from "@prisma/client";
import { VerwerkTussenstandModel } from "../Models/VerwerkTussenStand";
import db from "../prisma";

export async function VerwerkTussenstandQuery(
  lijst: VerwerkTussenstandModel[]
) {
  try {
    const result = await db.tussenstand.createMany({
      data: lijst,
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.stack);
      return error.stack;
    }
  }
}

export type DeelnemerMetTussenstand = Prisma.PromiseReturnType<typeof GetTussenstandQuery>
export async function GetTussenstandQuery(){
  const result = await db.deelnemer.findMany({
    include:{
      Tussenstand: {
        include:{
          renner:true
        }
      }
    }
  })
  return result
}

export type TussenstandMetDeelnemer= Prisma.PromiseReturnType<typeof GetTussenstandenMetPloegQuery>
export async function GetTussenstandenMetPloegQuery(){
  const result = await db.tussenstand.findMany({
include:{
  renner:true,
  deelnemer:true
}
  })
  return result
}