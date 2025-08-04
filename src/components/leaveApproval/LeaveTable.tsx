import { useState } from 'react';
import { useGetLeaveRequestsQuery } from '@/hooks/useLeaveRequestsQuery';
import { Table } from '@/components/ui/table';
import { useUserStore } from '@/store/user.store';
import {
  useApproveLeaveRequest,
  useRejectLeaveRequest,
} from '@/hooks/useLeaveRequestMutations';
import LeaveTableHeader from '@/components/leaveApproval/LeaveTableHeader';
import LeaveTableBody from '@/components/leaveApproval/LeaveTableBody';
import LeaveActionButtons from '@/components/leaveApproval/LeaveActionButtons';
import TableLoadingMessage from '@/components/leaveApproval/TableLoadingMessage';
import TableErrorMessage from '@/components/leaveApproval/tableErrorMessage';

const LeaveList = () => {
  const user = useUserStore((state) => state.user);
  const { data: leaveList, isPending, isError } = useGetLeaveRequestsQuery();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { mutate: approveLeaveRequest, isPending: isApprovePending } =
    useApproveLeaveRequest();
  const { mutate: rejectLeaveRequest, isPending: isRejectPending } =
    useRejectLeaveRequest();

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      setSelectedIds(leaveList ? leaveList.map((leave) => leave.id) : []);
    } else {
      setSelectedIds([]);
    }
  };

  const handleApproveLeaveRequest = () => {
    if (selectedIds.length === 0) {
      alert('승인할 항목을 선택해주세요.');
      return;
    }

    approveLeaveRequest(
      {
        requestId: selectedIds,
        approverId: user.id,
      },
      {
        onSuccess: () => {
          alert('승인 완료');
          setSelectedIds([]);
        },
        onError: (error) => {
          console.error('승인 실패:', error);
          alert('승인 처리 중 오류가 발생했습니다.');
        },
      },
    );
  };

  const handleRejectLeaveRequest = (
    rejectReason: string,
    onSuccess: () => void,
  ) => {
    rejectLeaveRequest(
      {
        requestId: selectedIds,
        approverId: user.id,
        reason: rejectReason,
      },
      {
        onSuccess: () => {
          alert('반려 완료');
          setSelectedIds([]);
          onSuccess();
        },
        onError: (error) => {
          console.error('반려 실패:', error);
          alert('반려 처리 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return (
    <>
      {isPending && <TableLoadingMessage />}
      {isError && <TableErrorMessage />}

      {!isPending && !isError && (
        <Table>
          <LeaveTableHeader
            leaveList={leaveList}
            selectedIds={selectedIds}
            onAllCheck={handleAllCheck}
          />
          <LeaveTableBody
            leaveList={leaveList}
            selectedIds={selectedIds}
            onCheckboxChange={handleCheckboxChange}
          />
        </Table>
      )}
      <LeaveActionButtons
        selectedIds={selectedIds}
        onApprove={handleApproveLeaveRequest}
        onReject={handleRejectLeaveRequest}
        isApproving={isApprovePending}
        isRejecting={isRejectPending}
      />
    </>
  );
};

export default LeaveList;
