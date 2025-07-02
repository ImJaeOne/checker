import { supabase } from '@/utils/supabase';
import type { UserSignUpDTO } from '@/types/DTO/user.dto';

export const signUp = async (data: UserSignUpDTO) => {
  const { email, password, name, phone, department_id, position_id } = data;
  const { data: result, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        department_id,
        position_id,
      },
    },
  });

  if (error) return { data: null, error: error.message };
  return { data: result, error: null };
};
