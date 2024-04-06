import { createClient } from '@supabase/supabase-js';

//creates a Supabase client
export const supabase = createClient(process.env.EXPO_PUBLIC_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY);