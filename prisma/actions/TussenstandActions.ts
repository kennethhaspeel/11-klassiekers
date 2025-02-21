import { Uitslag } from "@prisma/client";
import { DeelnemersMetSelectie } from "../queries/SelectieQueries";
import { GetUitslagByWedstrijdidAction } from "./UitslagActions";
import { GetUserMetSelectiesAction } from "./UserActions";
import { VerwerkTussenstandModel } from "../Models/VerwerkTussenStand";
import {
  GetTussenstandQuery,
  VerwerkTussenstandQuery,
} from "../queries/TussenstandQueries";

export async function VerwerkTussenstandAction(wedstrijdid: number) {
  try {
    const getUitslag: Promise<Uitslag[] | null | undefined> =
      GetUitslagByWedstrijdidAction(wedstrijdid);
    const getSelecties: Promise<DeelnemersMetSelectie> =
      GetUserMetSelectiesAction();
    const [uitslag, selecties] = await Promise.all([getUitslag, getSelecties]);
    const lijst: VerwerkTussenstandModel[] = [];
    selecties.map((u) => {
      u.Selectie.filter(x=>x.datum_uit == null).map((deel) => {
        const p =
          uitslag?.find((x) => x.rennerid == deel.rennerid)?.punten || 100;
        const punt = {
          deelnemerid: deel.deelnemerid,
          rennerid: deel.rennerid,
          punten: p,
          wedstrijdid: Number(wedstrijdid),
        };
        lijst.push(punt);
      });
    });
    console.log(lijst);
    const result = await VerwerkTussenstandQuery(lijst);
    return {
      success: true,
      message: result as unknown as string,
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

export async function GetTussenstandAction() {

    const uitslag = await GetTussenstandQuery();
    return uitslag
}
