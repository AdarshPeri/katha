import supabase, { supabaseUrl } from './supabase';

export const createEvent = async (newItem) => {
  const imageName1 = `${Math.random()}=${newItem.previewImage.name}`.replaceAll(
    '/',
    ''
  );

  const imageName2 = `${Math.random()}=${newItem.fullImage.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath1 = `${supabaseUrl}/storage/v1/object/public/items/${imageName1}`;
  const imagePath2 = `${supabaseUrl}/storage/v1/object/public/items/${imageName2}`;

  let query = supabase.from('events');

  query = query.insert([
    { ...newItem, fullImage: imagePath2, previewImage: imagePath1 },
  ]);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('Failed to create a new item!');
  }

  const { error: storageError1 } = await supabase.storage
    .from('items')
    .upload(imageName1, newItem.previewImage);

  const { error: storageError2 } = await supabase.storage
    .from('items')
    .upload(imageName2, newItem.fullImage);

  // Delete event if image failed to upload
  if (storageError1 || storageError2) {
    await supabase.from('events').delete().eq('id', data.id);
    throw new Error('Failed to upload event images, reverted event creation!');
  }

  return data;
};
