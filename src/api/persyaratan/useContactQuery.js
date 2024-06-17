import { createQuery } from "react-query-kit";
import { client } from "../common/client";

export const useContactQuery = createQuery({
  primaryKey: "tim",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return client.get(`${primaryKey}`);
  },
});

export const useKecamatanQuery = createQuery({
  primaryKey: "kecamatan",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return client.get(`${primaryKey}`);
  },
});
