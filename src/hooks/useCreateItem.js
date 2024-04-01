import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem as createItemApi } from '../services/createItem';
import toast from 'react-hot-toast';

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createItem } = useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      toast.success('New item created successfully!');
      queryClient.invalidateQueries({
        queryKey: ['sub-categories'],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createItem };
};
