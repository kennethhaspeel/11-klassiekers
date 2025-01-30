"use server";

import {
  DeleteResultatenVanWedstrijdQuery,
  GetWedstrijdByIdQuery,
  PostUitslagWedstrijdQuery,
} from "../queries/WedstrijdenQueries";

export async function PostUitslagWedstrijdAction(
  previousState: unknown,
  formdata: FormData
) {
  const result = await PostUitslagWedstrijdQuery({
    wedstrijdid: Number(formdata.get("wedstrijdid")),
    uitslag: JSON.parse(formdata.get("uitslag") as string),
  });
  return result;
}

export async function DeleteUitslagWedstrijdenAction(
  previousState: unknown,
  formdata: FormData
) {
  const result = await DeleteResultatenVanWedstrijdQuery(
    Number(formdata.get("wedstrijdid"))
  );
  return result;
}

export async function GetUitslagByWedstrijdidAction(wedstrijdid: number) {
  const result = await GetWedstrijdByIdQuery(wedstrijdid);
  return result;
}
