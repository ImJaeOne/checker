import { patchLeaveRequestStatus } from '@/apis/leaveRequests.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApproveLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      approverId,
    }: {
      requestId: number | number[];
      approverId: string;
    }) => patchLeaveRequestStatus(requestId, 'approved', approverId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LEAVE_REQUESTS],
      });
    },
  });
};

export const useRejectLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      approverId,
      reason,
    }: {
      requestId: number | number[];
      approverId: string;
      reason: string;
    }) => patchLeaveRequestStatus(requestId, 'rejected', approverId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LEAVE_REQUESTS],
      });
    },
  });
};
