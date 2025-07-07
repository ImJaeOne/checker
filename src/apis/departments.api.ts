import { supabase } from '@/utils/supabase';
import { DB } from '@/constants/db.constant';
import type { DepartmentsDTO } from '@/types/DTO/departments.dto';

export const getDepartments = async (): Promise<DepartmentsDTO> => {
  const { data, error } = await supabase.from(DB.DEPARTMENTS).select('*');

  if (error) throw new Error(error.message);
  return data;
};
