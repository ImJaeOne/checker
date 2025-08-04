import LeaveTable from '@/components/leaveApproval/LeaveTable';

const LeaveApprovalPage = () => {
  return (
    <section>
      <h2 className="sr-only">연차 승인</h2>
      <section>
        <h3>상세 검색</h3>
      </section>
      <section>
        <h3 className="sr-only">연차 신청 목록</h3>
        <LeaveTable />
      </section>
    </section>
  );
};

export default LeaveApprovalPage;
