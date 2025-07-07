import { supabase } from '@/utils/supabase';
import { DB } from '@/constants/db.constant';
import type { UserId, UserWithPositionDTO } from '@/types/DTO/user.dto';

export const getUser = async (id: UserId): Promise<UserWithPositionDTO> => {
  const { data, error } = await supabase
    .from(DB.USERS)
    .select('*, positions(id, name)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
