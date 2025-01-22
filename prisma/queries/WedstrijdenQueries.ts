"use server"

import { Wedstrijd } from "@prisma/client"
import db from "../prisma"

export async function GetWedstrijden(){
    const result = await db.wedstrijd.findMany({
        orderBy:{
            datum:'asc'
        }
    })
    return result
}