import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vjryuldgjkdepjikkdgb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcnl1bGRnamtkZXBqaWtrZGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NDg0MzMsImV4cCI6MjA0OTEyNDQzM30.DtcMpfvXBQ1-tar09qsZkVl_qLvI6yt3l_SWdHStTtc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
