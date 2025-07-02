import AdminAttendanceFilter from '@/components/dashboard/AdminAttendanceFilter';
import AdminAttendanceList from '@/components/dashboard/AdminAttendanceList';

const AdminAttendanceTable = () => {
  return (
    <section>
      <h2>출퇴근 기록</h2>
      <AdminAttendanceFilter />
      <AdminAttendanceList />
    </section>
  );
};

export default AdminAttendanceTable;
