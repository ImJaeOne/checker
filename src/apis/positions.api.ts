import { supabase } from '@/utils/supabase';
import { DB } from '@/constants/db.constant';
import type { PositionsDTO } from '@/types/DTO/positions.dto';

export const getPositions = async (): Promise<PositionsDTO[]> => {
  const { data, error } = await supabase.from(DB.POSITIONS).select('*');
  if (error) throw new Error(error.message);
  return data;
};
