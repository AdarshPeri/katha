import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubCategory as createSubCategoryApi } from '../services/createSubCateg';
import toast from 'react-hot-toast';

export const useCreateSub = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createSubCateg } = useMutation({
    mutationFn: createSubCategoryApi,
    onSuccess: () => {
      toast.success('New sub category created successfully!');
      queryClient.invalidateQueries({
        queryKey: ['sub-categories'],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createSubCateg };
};
