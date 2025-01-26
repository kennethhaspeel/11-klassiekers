import cheerio from "cheerio";

export async function fetchPCS(url) {
  try {
    const response = await fetch(url);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const d = $("table.results:first tbody tr");
    d.each((index, element) => {
      const rnk = $(element).find("td:nth-child(1)").text().trim();
      if (rnk != "DNF" && Number(rnk) < 51) {
        const attribuut = $(element).attr("data-team");
        if (attribuut) {
          const tdRider = $(element).find("td:nth-child(5) a").text().trim();
          console.log(`${rnk} : ${tdRider}`);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
