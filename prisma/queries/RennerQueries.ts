"use server"

import db from "../prisma";

export async function ZoekRennersQuery(zoekterm:string){
    const z = zoekterm.split(' ')
    const zoektermen = z.join(' & ')
    console.log(zoektermen)
    const result = await db.renner.findMany({
        where: {
            naam:{
                search:zoektermen,
                mode:'insensitive'
            }
        },
        include:{
            team:true
        },
        orderBy:{
            naam:'asc'
        }
    })
    return result
}

export async function GetRennerByIdQuery(naam:string){
    const result = await db.renner.findFirst({
        where:{
            naam: naam
        }
    })
    return result
}