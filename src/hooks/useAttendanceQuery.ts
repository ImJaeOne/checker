import { getAttendance } from '@/apis/attendances.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import { useQuery } from '@tanstack/react-query';

export const useGetAttendanceQuery = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ATTENDANCE, userId],
    queryFn: () => getAttendance(userId),
    enabled: !!userId,
  });
};
