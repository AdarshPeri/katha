import supabase, { supabaseUrl } from './supabase';

export const createItem = async (newItem) => {
  const imageName = `${Math.random()}=${newItem.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/items/${imageName}`;

  let query = supabase.from('items');

  const { data: subCateg1, error: error1 } = await supabase
    .from('sub-categories')
    .select('*')
    .eq('isEnabled', true)
    .eq('title', newItem.pairsWith1);

  const { data: subCateg2, error: error2 } = await supabase
    .from('sub-categories')
    .select('*')
    .eq('isEnabled', true)
    .eq('title', newItem.pairsWith2);

  const subCategoryData = [subCateg1[0], subCateg2[0]];

  delete newItem.pairsWith1;
  delete newItem.pairsWith2;

  newItem.pairsWith = subCategoryData;

  query = query.insert([{ ...newItem, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error || error1 || error2) {
    throw new Error('Failed to create a new item!');
  }

  const { error: storageError } = await supabase.storage
    .from('items')
    .upload(imageName, newItem.image);

  // Delete cabin if image failed to upload
  if (storageError) {
    await supabase.from('items').delete().eq('id', data.id);
    throw new Error('Failed to upload item image, reverted item creation!');
  }

  return data;
};
