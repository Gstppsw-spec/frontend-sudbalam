import { createQuery } from "react-query-kit";
import { client } from "../common/client";

export const usePersyaratanQuery = createQuery({
  primaryKey: "persyaratan",
  queryFn: ({ queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`);
  },
});
