"use server";

import { ZoekRennersQuery } from "../queries/RennerQueries";


export async function ZoekRennerAction(previousState:unknown, formData: FormData) {
  try {
    const result = await ZoekRennersQuery(formData.get("zoekterm") as string);
    console.log(result)
    return { data: result, error: null };
  } catch (error: unknown) {
    console.log(typeof error);
    return { data: null, error: "fout bij zoeken" };
  }
}


