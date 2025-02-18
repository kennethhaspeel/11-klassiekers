"use server"

import db from "../prisma";

interface ISaveLogging {
    deelnemerid: string;
    onderwerp:string;
    boodschap:string;
}
export async function SaveLogging({deelnemerid,onderwerp,boodschap}:ISaveLogging){
    const result = await db.log.create({
        data:{
            deelnemerid: deelnemerid,
            onderwerp:onderwerp,
            boodschap:boodschap
        }
    })
    console.log(result)
}