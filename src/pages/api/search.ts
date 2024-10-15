import type { NextApiRequest, NextApiResponse } from "next";
import { capitalizeFirstLetter, getAuthOpts } from "utils";
import { LinkItem } from "models/item";
import { API_BASE_URL } from "utils/const";
import { fuse, hasMatchIn } from "utils/search";

function unique(items: LinkItem[]) {
  const map = new Map<string, LinkItem[]>();

  items.forEach((item) => {
    if (!map.has(item.name)) {
      map.set(item.name, [item]);
    } else {
      map.get(item.name)?.push(item);
    }
  });

  const groups = Array.from(map.values());
  const uniqueItems = groups.map((group) => {
    if (group.length > 1) {
      return group.find((item) => item.is_grouping) || group[0];
    }
    return group[0];
  });

  return uniqueItems;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = req.query.q as string;
  const url = `${API_BASE_URL}/items?&limit=10&include_missing_integration=false&q=${q}`;

  const fallback = fuse.search(q).map((result) => ({
    ...result.item,
    is_supported: false,
  }));

  return fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      const uniqueItems = unique(data.results);
      const supported = uniqueItems;
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

      const notSupported = fallback.filter((f) => !hasMatchIn(supported, f));
      const merged = [...supported, ...notSupported];
      const existsInLinkItems = hasMatchIn(merged, fromQuery);

      if (!existsInLinkItems && fromQuery.name !== null) {
        merged.push(fromQuery);
      }

      res.json(merged);
    })
    .catch((error) => {
      console.error(error);
    });
}
