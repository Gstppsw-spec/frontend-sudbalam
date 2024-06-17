import { createInfiniteQuery } from "react-query-kit";
import { client } from "../common/client";

export const usePaymentQuery = createInfiniteQuery({
  primaryKey: "dataterima",
  queryFn: ({ queryKey: [primaryKey], pageParam = 1 }) => {
    return client.get(`${primaryKey}`);
  },
});

