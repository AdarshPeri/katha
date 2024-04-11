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

export const getSubCategories = async (categoryTitle) => {
  const { data: subCategories, error } = await supabase
    .from('sub-categories')
    .select('*')
    .eq('isEnabled', true)
    .eq('category', categoryTitle);

  if (error) {
    throw new Error('Failed to load sub-categories!');
  }
  return subCategories;
};

export const getAllSubCategories = async () => {
  const { data: subCategories, error } = await supabase
    .from('sub-categories')
    .select('*')
    .eq('isEnabled', true);

  if (error) {
    throw new Error('Failed to load sub-categories!');
  }
  return subCategories;
};

export const getSubCategory = async (subTitle) => {
  let { data: subCategories, error } = await supabase
    .from('sub-categories')
    .select('*')
    .eq('isEnabled', true)
    .eq('title', subTitle);

  if (error) {
    throw new Error('Failed to load sub-categories!');
  }
  return subCategories?.length ? subCategories[0] : null;
};
