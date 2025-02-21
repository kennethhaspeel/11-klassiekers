"use server";

import db from "../prisma";

interface IUserFinancieel {
  deelnemerid: string;
  bedrag: string;
  betaalwijze: string;
}
export async function PostUserFinancieelQuery({
  deelnemerid,
  bedrag,
  betaalwijze,
}: IUserFinancieel) {
  console.log(deelnemerid, bedrag, betaalwijze);
  try {
    const result = await db.financieel.create({
      data: {
        deelnemerid: deelnemerid,
        bedrag: 0 - Number(bedrag),
        betaalwijze: betaalwijze,
      },
    });
    return { success: true, data: result, fout: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.stack);
      return { success: false, data: null, fout: error.stack };
    }
    return { success: false, data: null, fout: "fout bij bewaren" };
  }
}
