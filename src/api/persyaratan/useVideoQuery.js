import { createQuery } from "react-query-kit";
import { client } from "../common/client";

export const useVideoQuery = createQuery({
  primaryKey: "video",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return client.get(`${primaryKey}`);
  },
});
