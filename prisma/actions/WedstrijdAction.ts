"use server";

import { GetWedstrijdByIdQuery } from "../queries/WedstrijdenQueries";

export async function GetWedstrijdByIdAction(wedstrijdid: number) {
  const result = await GetWedstrijdByIdQuery(wedstrijdid);
  return result;
}
