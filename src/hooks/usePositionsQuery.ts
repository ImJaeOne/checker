import { getPositions } from '@/apis/positions.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import { useQuery } from '@tanstack/react-query';

export const useGetPositionsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.POSITIONS],
    queryFn: getPositions,
  });
};
