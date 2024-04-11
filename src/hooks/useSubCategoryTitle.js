import { useQuery } from '@tanstack/react-query';
import { getSubCategory } from '../services/categoriesAPI';

export const useSubCategoryByTitle = ({subTitle}) => {
  const {
    isLoading,
    data: subCategory,
    error,
  } = useQuery({
    queryKey: ['sub-categories', subTitle],
    queryFn: () => getSubCategory(subTitle),
    retry: 3,
  });

  return { isLoading, error, subCategory };
};
