import { useQuery } from '@tanstack/react-query';
import { getItems } from '../services/getItems';

export const useItems = ({ categoryTitle }) => {
  const {
    isLoading,
    data: items,
    error,
  } = useQuery({
    queryKey: [`${categoryTitle}`, 'items', categoryTitle],
    queryFn: () => getItems({categoryTitle}),
    retry: false,
  });

  return { isLoading, error, items };
};
