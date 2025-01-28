"use server";

import { PostUitslagWedstrijdQuery } from "../queries/WedstrijdenQueries";

export async function PostUitslagWedstrijdAction(previousState:unknown,formdata:FormData){
const result = await PostUitslagWedstrijdQuery({
    wedstrijdid:Number(formdata.get("wedstrijdid")),
    uitslag:JSON.parse(formdata.get("uitslag") as string)
})
return result
}