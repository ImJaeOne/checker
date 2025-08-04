import type {
  LeaveApprovals,
  LeaveRequestDTO,
  LeaveRequestFormValue,
} from '@/types/DTO/leaveRequests.dto';
import { supabase } from '@/utils/supabase';

/**
 * 새로운 휴가 신청을 데이터베이스에 추가합니다.
 *
 * @param data - 휴가 신청 폼에서 입력된 데이터
 * @param data.leave_type_id - 휴가 유형 ID (연차, 병가 등)
 * @param data.start_date - 휴가 시작일
 * @param data.end_date - 휴가 종료일 (반차의 경우 선택사항)
 * @param data.half_day_type - 반차 유형 ('morning' | 'afternoon', 선택사항)
 * @param data.reason - 휴가 사유
 *
 * @returns 생성된 휴가 신청의 완전한 정보를 포함한 LeaveRequestDTO 객체
 *
 * @throws {Error} 데이터베이스 삽입 실패 시 Supabase 에러를 던집니다
 */
export const postLeaveRequests = async (
  data: LeaveRequestFormValue,
): Promise<LeaveRequestDTO> => {
  const { data: leaveRequestData, error } = await supabase
    .from('leave_requests')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return leaveRequestData;
};

/**
 * 모든 휴가 신청 목록을 조회합니다.
 * 휴가 신청과 관련된 상세 정보들을 포함하여 반환합니다.
 *
 * @returns 휴가 신청 목록과 관련 정보를 포함한 LeaveApprovals 배열
 * - 휴가 신청 기본 정보 (신청일, 상태 등)
 * - leave_type_id: 휴가 유형 정보 (ID, 이름)
 * - users: 신청자 정보 (ID, 이름, 부서명, 직급명)
 * - approver: 승인자 정보 (ID, 이름)
 *
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러를 던집니다
 */
export const getLeaveRequests = async (): Promise<LeaveApprovals> => {
  const { data: leaveRequestData, error } = await supabase.from(
    'leave_requests',
  ).select(`
      *, 
      leave_type_id(id, name), 
      users!leave_requests_user_id_fkey1(
        id, 
        name, 
        departments(name), 
        positions(name)
      ),
      approver:users!leave_requests_processed_by_fkey(
        id, 
        name
      )
    `);

  if (error) throw error;
  return leaveRequestData;
};

/**
 * 하나 이상의 휴가 신청 상태를 업데이트합니다.
 * 상태는 'approved' 또는 'rejected' 중 하나로 설정되며, 승인자 ID와 승인 시간을 함께 기록합니다.
 *
 * @param requestId - 상태를 업데이트할 휴가 신청 ID 또는 그 배열
 * @param status - 설정할 휴가 신청 상태 ('approved' | 'rejected')
 * @param approverId - 승인자 ID (승인자의 고유 식별자), 선택값
 *
 * @returns 업데이트된 휴가 신청 정보 배열 (LeaveRequestDTO[])
 * - id, status, approved_by, approved_at 등 휴가 신청 관련 필드 포함
 *
 * @throws {Error} 데이터베이스 업데이트 실패 시 Supabase 에러를 던집니다
 */
export const patchLeaveRequestStatus = async (
  requestId: number | number[],
  status: 'approved' | 'rejected',
  approverId?: string,
  rejectReason?: string,
): Promise<LeaveRequestDTO[]> => {
  const ids = Array.isArray(requestId) ? requestId : [requestId];

  const { data, error } = await supabase
    .from('leave_requests')
    .update({
      status,
      processed_by: approverId,
      processed_at: new Date().toISOString(),
      rejection_reason: rejectReason,
    })
    .in('id', ids)
    .select();

  if (error) throw error;
  return data;
};
