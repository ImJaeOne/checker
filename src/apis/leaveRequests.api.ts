import type {
  LeaveRequestDTO,
  LeaveRequestFormValue,
} from '@/types/DTO/leaveRequests.dto';
import { supabase } from '@/utils/supabase';

/**
 * 새로운 휴가 신청을 데이터베이스에 추가합니다.
 *
 * @param leave_requests - 휴가 신청 폼에서 입력된 데이터
 * @param leave_requests.leave_type_id - 휴가 유형 ID (연차, 병가 등)
 * @param leave_requests.start_date - 휴가 시작일
 * @param leave_requests.end_date - 휴가 종료일 (반차의 경우 선택사항)
 * @param leave_requests.half_day_type - 반차 유형 ('morning' | 'afternoon', 선택사항)
 * @param leave_requests.reason - 휴가 사유
 *
 * @returns 생성된 휴가 신청의 완전한 정보를 포함한 LeaveRequestDTO 객체
 *
 * @throws {Error} 데이터베이스 삽입 실패 시 Supabase 에러를 던집니다
 */
export const addLeaveRequests = async (
  leave_requests: LeaveRequestFormValue,
): Promise<LeaveRequestDTO> => {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert(leave_requests)
    .select()
    .single();

  if (error) throw error;
  return data;
};
