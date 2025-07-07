import { getDepartments } from '@/apis/departments.api';
import { QUERY_KEY } from '@/constants/queryKey.constant';
import { useQuery } from '@tanstack/react-query';

export const useGetDepartmentsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.DEPARTMENTS],
    queryFn: getDepartments,
  });
};
