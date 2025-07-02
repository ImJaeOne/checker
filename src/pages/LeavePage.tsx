import { useGetLeaveTypesQuery } from '@/hooks/useLeaveTypesQuery';

const LeavePage = () => {
  const { data } = useGetLeaveTypesQuery();
  console.log(data);
  return <div>LeavePage</div>;
};

export default LeavePage;
