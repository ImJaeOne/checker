import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { type UserWithPositionDTO } from '@/types/DTO/user.dto';
import { supabase } from '@/utils/supabase';
import { getUser } from '@/apis/user.api';

type UserStore = {
  user: UserWithPositionDTO;
  setUser: (user: UserWithPositionDTO) => void;
  resetUser: () => void;
};

const initialUser: UserWithPositionDTO = {
  id: '',
  email: '',
  name: '',
  phone: '',
  department_id: 1,
  position_id: 1,
  role: 'employee',
  hire_date: null,
  work_start_time: '',
  work_end_time: '',
  status: 'active',
  created_at: '',
  updated_at: '',
  positions: {
    id: 1,
    name: '',
    level: 1,
  },
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: initialUser,
        setUser: (user: UserWithPositionDTO) => set({ user }),
        resetUser: () => set({ user: initialUser }),
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({ user: state.user }),
      },
    ),
    { name: 'UserStore' },
  ),
);

export const initializeAuthListener = () => {
  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      try {
        const user = await getUser(session.user.id);
        if (user) {
          useUserStore.getState().setUser(user);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    } else {
      useUserStore.getState().resetUser();
    }
  });
};
