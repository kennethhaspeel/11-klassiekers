"use server";


import {
  DeleteFromSelectie,
  ToevoegenAanSelectie,
  TransferUitSelectie,
} from "../queries/SelectieQueries";

interface VerwijderProps {
  selectieid: number;
  periode: number;
}

export async function VerwijderUitSelectieAction(
  previousState: unknown,
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

export async function ToevoegenAanSelectieAction(
  previousState: unknown,
  formData: FormData
) {
  try {
    const deelnemerid: string = formData.get("deelnemerid") as string;
    const rennerid: number = formData.get("rennerid") as unknown as number;

    console.log(deelnemerid)
    console.log(rennerid)
    const result = await ToevoegenAanSelectie(deelnemerid, rennerid);
    //revalidatePath('/Deelnemer/MijnPloeg')
    return { data: result, error: null };
  } catch (error: unknown) {
    console.log(error);
    return { data: null, error: "fout bij zoeken" };
  }
}
