import { createQuery } from "react-query-kit";
import { client } from "../common/client";

export const useYearQuery = createQuery({
  primaryKey: "tahun",
  queryFn: ({ queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`);
  },
});
