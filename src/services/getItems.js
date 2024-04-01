import supabase from './supabase';

export const getItems = async ({ categoryTitle }) => {
  const { data: items, error } = await supabase
    .from('items')
    .select('*')
    .eq('isEnabled', true)
    .eq('category', categoryTitle);

  if (error) {
    throw new Error('Failed to load sub-categories!');
  }
  return items;
};
