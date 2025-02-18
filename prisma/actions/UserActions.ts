"use server";

import { Deelnemer } from "@prisma/client";
import { InsertDeelnemer, UpdateMetFoto } from "../queries/UserQueries";
import { z } from "zod";
import { GetUserMetSelectiesQuery } from "../queries/SelectieQueries";
import { SaveLogging } from "../queries/LoggingQueries";

const NieuweDeelnemerSchema = z.object({
  kindeid: z.string().min(1),
  naam: z.string().min(1, "Geef een korte omschrijving van de missie"),
  voornaam: z.string().min(1, "Geef een korte omschrijving van de missie"),
  email: z.string().min(1, "Geef een korte omschrijving van de missie"),
  telefoon: z.string().min(1, "Geef een telefoonnummer in"),
  ploegnaam: z.string().min(1, "Geef een ploegnaam in"),
  schiftingUur: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z
    .number({ required_error: "gelieve uren in te vullen" })
    .min(0, "Een tijd kan niet negatief zijn")
    .lt(24, "Uren kunnen niet meer dan 24 zijn")
    .int(),
  ),
  schiftingMinuten: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number({ required_error: "gelieve minuten in te vullen" })
    .min(0, "Een tijd kan niet negatief zijn")
    .lt(60, "Minuten kunnen niet meer dan 59 zijn")
    .int(),
  ),
    schiftingSeconden: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z
      .number({ message: "gelieve seconden in te vullen" })
      .min(0, "Een tijd kan niet negatief zijn")
      .lt(60, "Seonden kunnen niet meer dan 59 zijn")
      .int()
  ),
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
    metFoto: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    bevestigd: false,
    SchiftingUur: form.get("schiftingUur") as unknown as number,
    SchiftingMinuten: form.get("schiftingMinuten") as unknown as number,
    SchiftingSeconden: form.get("schiftingSeconden") as unknown as number,
  };
  console.log(d);
  await InsertDeelnemer(d);
   SaveLogging({deelnemerid:d.id,onderwerp:'identity',boodschap:`${d.voornaam} ${d.naam} aangevuld met ploegnaam ${d.ploegnaam}`})
  return { allSaved: true };
}

interface updateMetFotoInterface {
  deelnemerid: string;
  metFoto: boolean;
}
export async function updateMetFotoAction(
  previousState: unknown,
  { deelnemerid, metFoto }: updateMetFotoInterface
) {
  try {
    await UpdateMetFoto(deelnemerid, metFoto);
    
   SaveLogging({deelnemerid:deelnemerid,onderwerp:'identity',boodschap:`aanpassing MetFoto: ${metFoto}`})
  } catch (error: unknown) {
    console.log(typeof error);
    return "fout bij bewaren";
  }
}

export async function GetUserMetSelectiesAction() {
  const data = await GetUserMetSelectiesQuery();
  return data;
}
