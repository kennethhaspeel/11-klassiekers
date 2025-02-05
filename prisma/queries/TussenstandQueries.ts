"use server";

import { VerwerkTussenstandModel } from "../Models/VerwerkTussenStand";
import db from "../prisma";

export async function VerwerkTussenstandQuery(
  lijst: VerwerkTussenstandModel[]
) {
    // const x = await db.uitslag.create({
    //   data: {},
    // });
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
