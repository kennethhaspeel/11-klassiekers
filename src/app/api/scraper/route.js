import { NextResponse } from "next/server";
import * as cheerio from "cheerio"

export async function GET(req) {
  console.log(req);
  const response = await fetch(
    "https://www.procyclingstats.com/race/milano-sanremo/2024/result"
  );
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
            positie: rnk,
            naam: tdRider
        })
        console.log(`${rnk} : ${tdRider}`);
      }
    }
  });
  return NextResponse.json({ lijst })

}

