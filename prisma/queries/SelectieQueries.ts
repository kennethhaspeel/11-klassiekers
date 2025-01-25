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

export async function DeleteFromSelectie(selectieid: number) {
  const result = db.selectie.delete({
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
