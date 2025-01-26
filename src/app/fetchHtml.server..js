// pages/api/fetchHtml.js
"use server"
import axios from "axios";

export default async function fetch(req, res) {
  console.log('api bereikt')
  const { url } = req.query;
  console.log(url);
  try {
    const response = await axios.get(url);
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch HTML content" });
  }
}
