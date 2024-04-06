import { useQuery } from '@tanstack/react-query';
import { getAllSubCategories } from '../services/categoriesAPI';

export const useSubCategory = () => {
  const {
    isLoading,
    data: subCategories,
    error,
  } = useQuery({
    queryKey: ['sub-categories'],
    queryFn: () => getAllSubCategories(),
    retry: 3,
  });

  return { isLoading, error, subCategories };
};
