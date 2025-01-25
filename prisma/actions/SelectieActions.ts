"use server";

import {
  DeleteFromSelectie,
  TransferUitSelectie,
} from "../queries/SelectieQueries";

interface VerwijderProps {
  selectieid: number;
  periode: number;
}

export async function VerwijderUitSelectieAction(
  previousState:unknown,
  { selectieid, periode }: VerwijderProps
) {
  try {
    if (periode === 1) {
      await DeleteFromSelectie(selectieid);
    } else {
      await TransferUitSelectie(selectieid);
    }
  } catch (error: unknown) {
    console.log(typeof error);
    return "fout bij bewaren";
  }
}
