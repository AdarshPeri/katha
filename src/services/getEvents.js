import supabase from './supabase';

export const getEvents = async () => {
  const { data: items, error } = await supabase
    .from('events')
    .select('*')
    .eq('isEnabled', true)

  if (error) {
    throw new Error('Failed to load events!');
  }
  return items;
};
