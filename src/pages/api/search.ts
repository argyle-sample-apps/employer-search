import type { NextApiRequest, NextApiResponse } from "next";
import { capitalizeFirstLetter, getAuthOpts } from "utils";
import { LinkItem } from "models/item";
import { API_BASE_URL } from "utils/const";
import { fuse, hasMatchIn } from "utils/search";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = req.query.q as string;
  const url = `${API_BASE_URL}/employer-search?&limit=8&q=${q}`;

  return fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      const items = data.results ?? [];
      const supported = items
        // any kind of logic for filtering or disabling
        // specific LinkItems can be implemented here

        // .filter((result: LinkItem) => {
        //   const excludedIds = ["target", "walmart_store_club"];
        //   const isExcluded = excludedIds.includes(result.id);
        //   if (!isExcluded) {
        //     return result;
        //   }
        // })
        .map((result: LinkItem) => ({
          ...result,
          is_supported: true,
        }));

      const fromQuery = {
        id: q,
        name: capitalizeFirstLetter(q) as string,
        is_supported: false,
        is_input: true,
      };

      let results = supported;

      // fallback
      if (!results?.length) {
        results = fuse.search(q).map((result) => ({
          ...result.item,
          is_supported: false,
        }));
      }
      const existsInLinkItems = hasMatchIn(results, fromQuery);

      if (!existsInLinkItems && fromQuery.name !== null) {
        results.push(fromQuery);
      }

      res.json(results);
    })
    .catch((error) => {
      console.error(error);
    });
}
