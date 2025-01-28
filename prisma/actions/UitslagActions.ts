"use server";

import { PostUitslagWedstrijdQuery } from "../queries/WedstrijdenQueries";

interface BewaarUitslagInterface {
    wedstrijdid:number;
    uitslag: {
        positie:number;
        naam:string
    }[]
}
export async function PostUitslagWedstrijdAction(previousState:unknown,{wedstrijdid,uitslag}:BewaarUitslagInterface){
const result = await PostUitslagWedstrijdQuery({
    wedstrijdid:wedstrijdid,
    uitslag:uitslag
})
return result
}