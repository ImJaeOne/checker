import { supabase } from '@/utils/supabase';
import { DB } from '@/constants/db.constant';
import type { LeaveTypesDTO } from '@/types/DTO/leaveType.dto';

export const getLeaveTypes = async (): Promise<LeaveTypesDTO> => {
  const { data, error } = await supabase.from(DB.LEAVE_TYPES).select('*');
  if (error) throw new Error(error.message);
  return data;
};
