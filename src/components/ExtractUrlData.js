"use server";

export async function ExtractDataUrl(url) {
  console.log(url)
  const data = await fetch('http://localhost:3000/api/scraper')
return data
}
