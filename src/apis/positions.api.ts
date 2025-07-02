import { supabase } from '@/utils/supabase';
import { DB } from '@/constants/db.constant';

export const getPositions = async () => {
  const { data, error } = await supabase.from(DB.POSITIONS).select('*');
  if (error) throw new Error(error.message);
  return data;
};
