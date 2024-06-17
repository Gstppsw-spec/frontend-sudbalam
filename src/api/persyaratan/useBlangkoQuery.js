import { createQuery } from "react-query-kit";
import { client } from "../common/client";

export const useBlangkoQuery = createQuery({
  primaryKey: "blangko",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return client.get(`${primaryKey}`);
  },
});
