import { supabase } from '@/utils/supabase';
import { DB } from '@/constants/db.constant';

export const getDepartments = async () => {
  const { data, error } = await supabase.from(DB.DEPARTMENTS).select('*');

  if (error) throw new Error(error.message);
  return data;
};
