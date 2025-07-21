import { getLeaveRequests } from '@/apis/leaveRequests.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import { useQuery } from '@tanstack/react-query';

export const useGetLeaveRequestsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LEAVE_REQUESTS],
    queryFn: getLeaveRequests,
  });
};
