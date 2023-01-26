import { config } from 'dotenv'; config();
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

// export const { data } = supabaseAdmin
//   .from('images')
//   .select('*')
//   .order('id');