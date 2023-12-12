import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUser = () => {
  return axios.post(`/api/user`).then((response) => response.data);
};

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
}
