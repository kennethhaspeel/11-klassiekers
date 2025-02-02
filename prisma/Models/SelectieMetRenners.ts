import { Renner, Selectie, Team } from "@prisma/client";

export type SelectieMetRenner =Selectie & { renner: Renner & { team: Team } }

export type RennerDetail = Renner & { team: Team } 