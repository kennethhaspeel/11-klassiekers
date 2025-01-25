"use server";

import db from "../prisma";

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
  });

  return result;
}

export async function ToevoegenAanSelectie(deelnemerid:string,rennerid:number){
  console.log(`Saving member with deelnemerid ${deelnemerid} and rennerid ${rennerid}`)
  const datum = new Date()
  const data = {
    deelnemerid: deelnemerid,
    rennerid:rennerid,
    datum_in: new Date(datum.toISOString().split("T")[0])
  }
  console.log(data)
  const result = await db.selectie.create({
    data:data
  })
  console.log(`Resultaat van bewaren: ${result.id}`)
  return result
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
      datum_uit: new Date()
    }
  });
  return result;
}

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
// type SelectieMetRenners = ThenArg<ReturnType<typeof GetSelectieByUserId>>;

// export async function GetSelectieRenners(id: string) {
//   const lijst: SelectieMetRenners = await GetSelectieByUserId(id);
//   return lijst;
// }
