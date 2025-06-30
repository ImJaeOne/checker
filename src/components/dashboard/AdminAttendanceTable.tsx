import AdminAttendanceFilter from '@/components/dashboard/AdminAttendanceFilter';
import AdminAttendanceList from '@/components/dashboard/AdminAttendanceList';

const AdminAttendanceTable = () => {
  return (
    <section>
      <h1>출퇴근 기록</h1>
      <AdminAttendanceFilter />
      <AdminAttendanceList />
    </section>
  );
};

export default AdminAttendanceTable;
