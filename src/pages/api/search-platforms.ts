import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthOpts } from "utils";
import { API_BASE_URL } from "utils/const";

const fallback = {
  id: "fallback",
  name: "Can't find my payroll platform",
  is_supported: false,
  is_fallback: true,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = req.query.q as string;
  const baseUrl = `${API_BASE_URL}/employer-search?limit=5&kind=platform`;
  const url = q.length ? baseUrl + `&q=${q}` : baseUrl;

  return fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      const merged = [...data.results, fallback];

      res.json(merged);
    })
    .catch((error) => {
      console.error(error);
    });
}
