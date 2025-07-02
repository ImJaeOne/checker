import { getLeaveTypes } from '@/apis/leaveTypes.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import { useQuery } from '@tanstack/react-query';

export const useGetLeaveTypesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LEAVE_TYPES],
    queryFn: getLeaveTypes,
  });
};
