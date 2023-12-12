import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchSearchPlatforms = (q: string) => {
  const encoded = encodeURIComponent(q);
  return axios
    .get(`/api/search-platforms?q=${encoded}`)
    .then((response) => response.data);
};

export function useSearchPlatforms(q: string) {
  return useQuery({
    queryKey: ["search-platforms", q],
    queryFn: () => fetchSearchPlatforms(q),
    enabled: q?.length > 0,
  });
}
