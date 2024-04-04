import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://syqtfcaljarcgeywfeki.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cXRmY2FsamFyY2dleXdmZWtpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjIxODMzOSwiZXhwIjoyMDI3Nzk0MzM5fQ.3f2r9mE1gOUKETS1IGT60_dKKs8b2Gmm3ENMF2LBUAs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
