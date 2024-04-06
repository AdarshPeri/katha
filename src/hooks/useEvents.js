import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../services/getEvents';

export const useEvents = () => {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents(),
    retry: 3,
  });

  return { isLoading, error, events };
};
