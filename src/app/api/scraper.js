import cheerio from 'cheerio';

export default async function handler (req, res)  {
  // Fetch the HTML content of the web page to be scraped
  const response = await fetch('https://www.procyclingstats.com/race/milano-sanremo/2024/result');
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
  })

  // Return the scraped data as a JSON response
  res.status(200).json({ test:"gelukt" });
};
