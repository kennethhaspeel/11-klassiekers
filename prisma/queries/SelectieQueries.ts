"use server";

import { Wedstrijd } from "@prisma/client";
import db from "../prisma";
import { GetWedstrijden } from "./WedstrijdenQueries";
import { CheckPeriode } from "@/components/DatumFuncties";

export async function GetSelectieByUserId(id: string) {
  const result = await db.selectie.findMany({
    where: {
      deelnemerid: id,
    },
    include: {
      renner: {
        include: {
          team: true,
        },
      },
    },
    orderBy:{
      renner:{
        naam:'asc'
      }
    }
  });

  return result;
}

export async function GetPeriodeAction() {
  const result: Wedstrijd[] = await GetWedstrijden();
  const periode = CheckPeriode(result);
  return periode;
}

export async function GetAlleSelectiesQuery() {
  const result = await db.selectie.findMany({
    where: {
      datum_uit: { not: null },
    },
    include: {
      renner: true,
    },
  });

  return result;
}

interface ToevoegenAanSelectieInterface {
  deelnemerid: string;
  rennerid: number;
}
export async function ToevoegenAanSelectie({
  deelnemerid,
  rennerid,
}: ToevoegenAanSelectieInterface) {
  console.log(
    `Start saving query with deelnemerid ${deelnemerid} and rennerid ${rennerid} and date ${new Date()}`
  );
  const result = await db.selectie.create({
    data: {
      deelnemerid: deelnemerid,
      rennerid: Number(rennerid),
      datum_in: new Date(),
    },
  });
  console.log(`Saving ended with id ${result.id}`);
  return result;
}

export async function DeleteFromSelectie(selectieid: number) {
  const result = await db.selectie.delete({
    where: {
      id: selectieid,
    },
  });
  return result;
}

export async function TransferUitSelectie(selectieid: number) {
  const result = db.selectie.update({
    where: {
      id: selectieid,
    },
    data: {
      datum_uit: new Date(),
    },
  });
  return result;
}

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
// type SelectieMetRenners = ThenArg<ReturnType<typeof GetSelectieByUserId>>;

// export async function GetSelectieRenners(id: string) {
//   const lijst: SelectieMetRenners = await GetSelectieByUserId(id);
//   return lijst;
// }
