import supabase, { supabaseUrl } from './supabase';

export const createSubCategory = async (subCategory) => {
  const imageName = `${Math.random()}=${subCategory.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/items/${imageName}`;

  let query = supabase.from('sub-categories');

  query = query.insert([{ ...subCategory, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('Failed to create a new sub category!');
  }

  const { error: storageError } = await supabase.storage
    .from('items')
    .upload(imageName, subCategory.image);

  // Delete cabin if image failed to upload
  if (storageError) {
    await supabase.from('items').delete().eq('id', data.id);
    throw new Error('Failed to upload image, reverted creation!');
  }

  return data;
};
