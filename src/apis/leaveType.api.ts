import { supabase } from '@/utils/supabase';
import type { LeaveTypeDTO } from '@/types/DTO/leaveType.dto';
import { DB } from '@/constants/db.constant';

export const getLeaveTypes = async (): Promise<LeaveTypeDTO[]> => {
  const { data, error } = await supabase.from(DB.LEAVE_TYPES).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
