"use server";

import { Deelnemer } from "@prisma/client";
import { InsertDeelnemer, UpdateMetFoto } from "../queries/UserQueries";
import { z } from "zod";

const NieuweDeelnemerSchema = z.object({
  kindeid: z.string().min(1),
  naam: z.string().min(1, "Geef een korte omschrijving van de missie"),
  voornaam: z.string().min(1, "Geef een korte omschrijving van de missie"),
  email: z.string().min(1, "Geef een korte omschrijving van de missie"),
  telefoon: z.string().min(1, "Geef een korte omschrijving van de missie"),
  ploegnaam: z.string().min(1, "Geef een korte omschrijving van de missie"),
});
export type NieuweDeelnemerSchemaType = z.infer<typeof NieuweDeelnemerSchema>;
export type NieuweDeelnemerSchemaErrorType = z.inferFlattenedErrors<
  typeof NieuweDeelnemerSchema
>;
export async function InsertDeelnemerAction(
  previousState: unknown,
  form: FormData
) {
  const data = Object.fromEntries(form);

  const checkSchema = NieuweDeelnemerSchema.safeParse(data);

  if (!checkSchema.success) {
    return { errors: checkSchema.error.formErrors };
  }

  const d: Deelnemer = {
    id: form.get("kindeid") as string,
    naam: form.get("naam") as string,
    voornaam: form.get("voornaam") as string,
    email: form.get("email") as string,
    telefoon: form.get("telefoon") as string,
    ploegnaam: form.get("ploegnaam") as string,
    metFoto:false,
    createdAt: new Date(),
    updatedAt: new Date(),
    bevestigd:false
  };

  await InsertDeelnemer(d);
  return { allSaved: true };
}

interface updateMetFotoInterface {
  deelnemerid:string;
  metFoto:boolean;
}
export async function updateMetFotoAction(previousState:unknown,{deelnemerid,metFoto}:updateMetFotoInterface){
  try {
    await UpdateMetFoto(deelnemerid,metFoto)
  }
  catch (error: unknown) {
    console.log(typeof error);
    return "fout bij bewaren";
  }
}
