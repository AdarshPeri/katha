import { useQuery } from '@tanstack/react-query';
import { getSubCategories } from '../services/categoriesAPI';

export const useSubCategories = ({categoryTitle}) => {
  const {
    isLoading,
    data: subCategories,
    error,
  } = useQuery({
    queryKey: ['sub-categories', categoryTitle],
    queryFn: () => getSubCategories(categoryTitle),
    retry: 3,
  });

  return { isLoading, error, subCategories };
};
