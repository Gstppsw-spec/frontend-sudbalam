import { createQuery } from "react-query-kit";
import { client } from "../common/client";

export const useDashboardQuery = createQuery({
  primaryKey: "dashboard",
  queryFn: ({ queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`);
  },
});
