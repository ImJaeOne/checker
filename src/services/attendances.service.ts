import { DB } from '@/constants/db.constant';
import type { UserId } from '@/types/DTO/user.dto';
import { supabase } from '@/utils/supabase';

export const getUserWorkStartTime = async (userId: UserId): Promise<string> => {
  const { data, error } = await supabase
    .from(DB.USERS)
    .select('work_start_time')
    .eq('id', userId)
    .maybeSingle();
  if (error || !data) throw new Error('사용자 정보를 가져올 수 없습니다.');
  return data.work_start_time;
};

export const getTodayAttendanceRecord = async (
  userId: UserId,
  date: string,
) => {
  const { data, error } = await supabase
    .from(DB.ATTENDANCES)
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle();
  if (error) throw new Error('출근 기록 조회 실패');
  return data;
};

export const getTodayAttendanceWithUser = async (
  userId: UserId,
  date: string,
) => {
  const { data, error } = await supabase
    .from(DB.ATTENDANCES)
    .select(`*, users (work_start_time)`) // users 테이블의 work_start_time 조인
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle();
  if (error) throw new Error('출근/퇴근 및 사용자 정보 조회 실패');
  return data;
};

export const isLateAttendance = (currentTime: string, scheduledTime: string) =>
  currentTime > scheduledTime;

export const createAttendanceRecord = async (
  userId: UserId,
  date: string,
  time: string,
  status: string,
) => {
  return await supabase.from(DB.ATTENDANCES).insert({
    user_id: userId,
    date,
    check_in_time: time,
    status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
};

export const updateCheckOutTime = async (recordId: number, time: string) => {
  return await supabase
    .from(DB.ATTENDANCES)
    .update({
      check_out_time: time,
      updated_at: new Date().toISOString(),
    })
    .eq('id', recordId);
};
