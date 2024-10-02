import { useSuspenseQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import itemsFetch from "../utils";

export const useFetchItems = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await itemsFetch.get("/");
      return data;
    },
  });

  return { isPending, isError, data, error };
};

export const useCreateItems = () => {};
export const useEditItems = () => {};
export const useDeleteItems = () => {};
