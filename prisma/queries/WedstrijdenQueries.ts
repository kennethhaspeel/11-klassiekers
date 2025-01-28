"use server"


import db from "../prisma"
import { GetRennerByIdQuery } from "./RennerQueries"

export async function GetWedstrijden(){
    const result = await db.wedstrijd.findMany({
        orderBy:{
            datum:'asc'
        }
    })
    return result
}
interface BewaarUitslagInterface {
    wedstrijdid:number;
    uitslag: {
        positie:number;
        naam:string
    }[]
}
export async function PostUitslagWedstrijdQuery(data:BewaarUitslagInterface){
    for(const rij of data.uitslag){
        const renner = await GetRennerByIdQuery(rij.naam)
        console.log(renner)
    }
return true
}