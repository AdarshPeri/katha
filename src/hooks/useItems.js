import { useQuery } from "@tanstack/react-query";
import { getAllItems, getItems } from "../services/getItems";

export const useItems = ({ categoryTitle }) => {
  const {
    isLoading,
    data: items,
    error,
  } = useQuery({
    queryKey: [`${categoryTitle}`, "items", categoryTitle],
    queryFn: () => getItems({ categoryTitle }),
    retry: 3,
  });

  return { isLoading, error, items };
};

export const useGetAllItems = () => {
  const {
    isLoading,
    data: items,
    error,
  } = useQuery({
    queryKey: [`search`, "items"],
    queryFn: () => getAllItems(),
    retry: 3,
  });

  return { isLoading, error, items };
};
