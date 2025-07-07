import { getUser } from '@/apis/user.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import type { UserId } from '@/types/DTO/user.dto';
import { useQuery } from '@tanstack/react-query';

export const useGetUserQuery = (id: UserId) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER, id],
    queryFn: () => getUser(id),
  });
};
