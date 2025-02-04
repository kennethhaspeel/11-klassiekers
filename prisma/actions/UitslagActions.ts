"use server";

import {
  DeleteResultatenVanWedstrijdQuery,
  GetUitslagByWedstrijdIdQuery,
  PostUitslagWedstrijdQuery,
} from "../queries/WedstrijdenQueries";

interface SaveUitslagModel {
  wedstrijdid: number;
  resultaat: {
    positie: number;
    naam: string;
  }[];
}
export async function SaveUitslagWedstrijdAction({
  wedstrijdid,
  resultaat,
}: SaveUitslagModel) {
  try {
    await PostUitslagWedstrijdQuery({
      wedstrijdid: wedstrijdid,
      uitslag: resultaat,
    });
    return { data: "ok", error: null };
  } catch (error: unknown) {
    return { data: null, error: error as string };
  }
}
export async function PostUitslagWedstrijdAction(formdata: FormData) {
  try {
    await PostUitslagWedstrijdQuery({
      wedstrijdid: Number(formdata.get("wedstrijdid")),
      uitslag: JSON.parse(formdata.get("uitslag") as string),
    });
    return {
      success: true,
      message: "Alles Bewaard",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.stack,
      };
    }
  }
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
  const result = await GetUitslagByWedstrijdIdQuery(wedstrijdid);
  return result;
}
