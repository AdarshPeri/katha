import supabase from './supabase';

export const getAllCategories = async () => {
  const { data: category, error } = await supabase
    .from('category')
    .select('*')
    .eq('isEnabled', true);
  if (error) {
    throw new Error('Failed to load categories!');
  }
  return category;
};

const getSpecialImage = async (imageUrl) => {};

export const getSubCategories = async (categoryTitle) => {
  console.log(categoryTitle)
  const { data: subCategories, error } = await supabase
    .from('sub-categories')
    .select('*')
    .eq('isEnabled', true)
    .eq('parentCategory', categoryTitle);

  if (error) {
    throw new Error('Failed to load sub-categories!');
  }
  return subCategories;
};
