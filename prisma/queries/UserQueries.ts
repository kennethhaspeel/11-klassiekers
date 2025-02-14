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
    data: {
      id:deelnemer.id,
      naam:deelnemer.naam,
      voornaam:deelnemer.voornaam,
      email:deelnemer.email,
      telefoon:deelnemer.telefoon,
      ploegnaam:deelnemer.ploegnaam,
      metFoto:deelnemer.metFoto,
      bevestigd:true,
      createdAt:deelnemer.createdAt,
      updatedAt:deelnemer.updatedAt,
      SchiftingUur: Number(deelnemer.SchiftingUur),
      SchiftingMinuten:Number(deelnemer.SchiftingMinuten),
      SchiftingSeconden:Number(deelnemer.SchiftingSeconden)
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

export async function UpdatePushData(deelnemerid:string,data:string){
  await db.deelnemer.update({
    where:{
      id:deelnemerid
    },
    data:{
      PushData:data
    }
  })
}

export async function GetUserPushData(deelnemerid:string){
  const result = await db.deelnemer.findFirst({
    where:{
      id:deelnemerid
    }
  })
  console.log(result?.PushData)
  return result?.PushData
}