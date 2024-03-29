import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://vjvrivtovosplhovmvfs.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdnJpdnRvdm9zcGxob3ZtdmZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDQyOTM4NiwiZXhwIjoyMDI2MDA1Mzg2fQ.a66kom_TRjz5KsDQS2APQYrCNc2JyBB8D-ekdRmacuQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
