import { createInfiniteQuery } from "react-query-kit";
import { client } from "../common/client";

export const useDoneQuery = createInfiniteQuery({
  primaryKey: "dataterima",
  queryFn: ({ queryKey: [primaryKey, {search, limit, page, year}], pageParam = 1 }) => {
    return client.get(`${primaryKey}?tahun=${year}`);
  },
});

  