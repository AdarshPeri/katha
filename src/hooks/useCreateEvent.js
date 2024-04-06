import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent as createEventApi } from '../services/createEvent';
import toast from 'react-hot-toast';

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createEvent } = useMutation({
    mutationFn: createEventApi,
    onSuccess: () => {
      toast.success('New event created successfully!');
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createEvent };
};
