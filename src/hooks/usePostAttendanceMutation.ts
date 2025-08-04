import { postAttendance } from '@/apis/attendances.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import type { UserId } from '@/types/DTO/user.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostAttendanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: UserId) => postAttendance(userId),
    onSuccess: (result) => {
      if (result === 'check-in') {
        alert('출근이 완료되었습니다.');
      } else if (result === 'check-out') {
        alert('퇴근이 완료되었습니다.');
      }
    },
    onError: (error) => {
      console.error(error);
      alert('출근/퇴근 처리에 실패했습니다. 다시 시도해주세요.');
    },
    onSettled: (_result, _error, userId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ATTENDANCE, userId],
      });
    },
  });
};
