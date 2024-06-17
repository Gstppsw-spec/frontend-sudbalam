import { createInfiniteQuery, createQuery } from "react-query-kit";
import { client } from "../common/client";

export const useDoneQuery = createQuery({
  primaryKey: "dataterima",
  queryFn: ({ queryKey: [primaryKey, {year}]}) => {
    return client.get(`${primaryKey}?tahun=${year}`);
  },
});

  