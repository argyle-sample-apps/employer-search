import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAuthOpts } from "utils";
import { API_BASE_URL } from "utils/const";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { headers } = getAuthOpts();

    const { data } = await axios.post(
      "users",
      {},
      {
        baseURL: API_BASE_URL,
        headers,
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
