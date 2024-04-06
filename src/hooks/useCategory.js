import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/categoriesAPI';

export const useCategory = () => {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    retry: 3
  });

  return { isLoading, error, categories };
};
