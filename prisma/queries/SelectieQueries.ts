"use server";

import { Wedstrijd } from "@prisma/client";
import db from "../prisma";
import { GetWedstrijden } from "./WedstrijdenQueries";
import { CheckPeriode } from "@/components/DatumFuncties";
import { Prisma } from "@prisma/client";
import { SaveLogging } from "./LoggingQueries";
import { PostUserFinancieelQuery } from "./FinancieelQueries";

async function GetRennerNaam(id: number) {
  const renner = await db.renner.findUnique({
    where: {
      id: Number(id),
    },
  });
  return renner?.naam;
}
async function GetSelectie(selectieid: number) {
  const sel = await db.selectie.findFirst({
    where: {
      id: selectieid,
    },
    include: {
      deelnemer: true,
      renner: true,
    },
  });
  return sel;
}
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
    orderBy: {
      renner: {
        naam: "asc",
      },
    },
  });
  // console.log(id)
  // console.log(result)
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
      datum_uit: null,
    },
    include: {
      renner: true,
    },
  });

  return result;
}

export type DeelnemersMetSelectie = Prisma.PromiseReturnType<
  typeof GetUserMetSelectiesQuery
>;
export async function GetUserMetSelectiesQuery() {
  const result = await db.deelnemer.findMany({
    include: {
      Selectie: {
        where: {
          datum_uit: null,
        },
        include: {
          renner: true,
        },
      },
    },
  });
  return result;
}

interface ToevoegenAanSelectieInterface {
  deelnemerid: string;
  rennerid: number;
  periode: number;
}
export async function ToevoegenAanSelectie({
  deelnemerid,
  rennerid,
  periode,
}: ToevoegenAanSelectieInterface) {
  console.log(
    `Start saving query with deelnemerid ${deelnemerid} and rennerid ${rennerid} and date ${new Date()}`
  );

  const result = await db.selectie.create({
    data: {
      deelnemerid: deelnemerid,
      rennerid: Number(rennerid),
      datum_in: new Date(),
      transfer_in: periode == 1 ? false : true,
    },
  });

  if (periode == 1) {
    SaveLogging({
      deelnemerid: deelnemerid,
      onderwerp: "selectie",
      boodschap: `Renner ${await GetRennerNaam(
        rennerid
      )} toegevoegd aan selectie`,
    });
  } else {
    await PostUserFinancieelQuery({
      deelnemerid: deelnemerid,
      bedrag: "2",
      betaalwijze: "transfer",
    });
    SaveLogging({
      deelnemerid: deelnemerid,
      onderwerp: "selectie",
      boodschap: `Inkomende transfer: ${await GetRennerNaam(rennerid)}`,
    });
  }
  console.log(`Saving ended with id ${result.id}`);
  return result;
}

export async function DeleteFromSelectie(selectieid: number) {
    const sel = await GetSelectie(selectieid);
  const result = await db.selectie.delete({
    where: {
      id: selectieid,
    },
  });

  SaveLogging({
    deelnemerid: sel!.deelnemerid,
    onderwerp: "selectie",
    boodschap: `Renner ${sel?.renner.naam} toegevoegd aan selectie`,
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
  const sel = await GetSelectie(selectieid);
  SaveLogging({
    deelnemerid: sel!.deelnemerid,
    onderwerp: "selectie",
    boodschap: `Uitgaande transfer: ${sel?.renner.naam}`,
  });

  return result;
}

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
// type SelectieMetRenners = ThenArg<ReturnType<typeof GetSelectieByUserId>>;

// export async function GetSelectieRenners(id: string) {
//   const lijst: SelectieMetRenners = await GetSelectieByUserId(id);
//   return lijst;
// }
