"use server";
import axios from "axios";

export default async function fetchData(url) {
  console.log("api bereikt");
  console.log(url);
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
