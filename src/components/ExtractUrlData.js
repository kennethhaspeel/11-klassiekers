"use server";
import axios from "axios";
export async function ExtractDataUrl(url) {
  try {
    const d = await axios
      .get(`${process.env.API_PATH}/api/scraper/${encodeURIComponent(url)}`)
      .then((response) => {
        return response.data;
      });
    return d;
  } catch (error) {
    console.log(error);
  }
}
