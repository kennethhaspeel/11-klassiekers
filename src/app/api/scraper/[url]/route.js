import { NextResponse } from "next/server";
import * as cheerio from "cheerio"

export async function GET(req,{params}) {
 const {url} = await params;

  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const d = $("table.results:first tbody tr");
  let lijst = []
  d.each((index, element) => {
    const rnk = $(element).find("td:nth-child(1)").text().trim();
    if (rnk != "DNF" && Number(rnk) < 51) {
      const attribuut = $(element).attr("data-team");
      if (attribuut) {
        const tdRider = $(element).find("td:nth-child(5) a").text().trim();
        lijst.push({
            positie: Number(rnk),
            naam: tdRider
        })
      }
    }
  });
  return NextResponse.json(lijst, { status: 200 })

}

