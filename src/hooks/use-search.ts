import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchSearch = (q: string) => {
  const encoded = encodeURIComponent(q);
  return axios
    .get(`/api/search?q=${encoded}`)
    .then((response) => response.data);
};

export function useSearch(q: string) {
  return useQuery({
    queryKey: ["search", q],
    queryFn: () => fetchSearch(q),
    enabled: q?.length > 0,
  });
}
