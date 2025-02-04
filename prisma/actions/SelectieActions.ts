"use server";

import {
  DeleteFromSelectie,
  GetAlleSelectiesQuery,
  GetSelectieByUserId,
  ToevoegenAanSelectie,
  TransferUitSelectie,
} from "../queries/SelectieQueries";

interface VerwijderProps {
  selectieid: number;
  periode: number;
  deelnemerid: string;
}

export async function VerwijderSelectieAction({
  selectieid,
  periode,
  deelnemerid,
}: VerwijderProps) {
  try {
    if (periode === 1) {
      await DeleteFromSelectie(selectieid);
    } else {
      await TransferUitSelectie(selectieid);
    }
    const selecties = await GetSelectieByUserId(deelnemerid);
    return { data: selecties, error: null };
  } catch (error: unknown) {
    return { data: null, error: error };
  }
}
interface ToevoegenProps {
  deelnemerid: string;
  rennerid: number;
}

export async function ToevoegenSelectieAction({
  deelnemerid,
  rennerid,
}: ToevoegenProps) {
  try {
    await ToevoegenAanSelectie({
      deelnemerid: deelnemerid,
      rennerid: rennerid,
    });
    const selecties = await GetSelectieByUserId(deelnemerid);
    return { data: selecties, error: null };
  } catch (error: unknown) {
    console.log(typeof error);
    return { data: null, error: error };
  }
}

export async function GetAlleSelectiesActions() {
  const selecties = await GetAlleSelectiesQuery();
  return selecties;
}



export async function ToevoegenAanSelectieAction(
  previousState: unknown,
  formData: FormData
) {
  try {
    const deelnemerid: string = formData.get("deelnemerid") as string;
    const rennerid: number = formData.get("rennerid") as unknown as number;

    console.log(deelnemerid);
    console.log(rennerid);
    const result = await ToevoegenAanSelectie({
      deelnemerid: deelnemerid,
      rennerid: rennerid,
    });
    //revalidatePath("/Deelnemer/MijnPloeg");
    return { data: result, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return { data: null, error: "fout bij zoeken" };
  }
}
