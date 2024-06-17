import { createQuery } from "react-query-kit";
import { client } from "../common/client";

export const usePengumumanQuery = createQuery({
  primaryKey: "pengumuman",
  queryFn: ({ queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`);
  },
});
