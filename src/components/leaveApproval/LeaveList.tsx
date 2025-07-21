import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  HALF_DAY_TYPE_LABELS,
  LEAVE_STATUSES_LABELS,
} from '@/constants/leave.constant';
import { useGetLeaveRequestsQuery } from '@/hooks/useLeaveRequests';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import type { LeaveRequestDTO } from '@/types/DTO/leaveRequests.dto';
import { updateLeaveRequestStatus } from '@/apis/leaveRequests.api';
import { useUserStore } from '@/store/user.store';

const LeaveList = () => {
  const user = useUserStore((state) => state.user);
  const { data: leaveList, isLoading } = useGetLeaveRequestsQuery();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

  const approveLeaveRequest = async (
    requestId: number | number[],
    approverId: string,
  ): Promise<LeaveRequestDTO | LeaveRequestDTO[]> => {
    return updateLeaveRequestStatus(requestId, 'approved', approverId);
  };

  // TODO 반려 누르면 모달창 열려서 반려 사유 작성하기..
  const rejectLeaveRequest = async (
    requestId: number | number[],
    approverId: string,
  ): Promise<LeaveRequestDTO | LeaveRequestDTO[]> => {
    return updateLeaveRequestStatus(requestId, 'rejected', approverId);
  };

  if (isLoading) return <div>로딩중</div>;

  const columns = [
    { key: 'select', label: '' },
    { key: 'id', label: 'No.' },
    { key: 'name', label: '성명' },
    { key: 'department', label: '부서' },
    { key: 'position', label: '직급' },
    { key: 'leaveType', label: '휴가 유형' },
    { key: 'startDate', label: '시작 일자' },
    { key: 'endDate', label: '종료 일자' },
    { key: 'halfDayType', label: '반차 유형' },
    { key: 'totalDays', label: '합계' },
    { key: 'reason', label: '사유' },
    { key: 'status', label: '진행 상태' },
    { key: 'requestedAt', label: '신청 일시' },
    { key: 'approvedBy', label: '승인 담당자' },
    { key: 'approvedAt', label: '승인 일시' },
    { key: 'rejectionReason', label: '반려 사유' },
  ];

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>
                {column.key === 'select' ? (
                  <Checkbox
                    checked={
                      leaveList &&
                      leaveList.length > 0 &&
                      selectedIds.length === leaveList.length
                    }
                    onCheckedChange={handleAllCheck}
                  />
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveList?.map((leave, idx) => (
            <TableRow key={leave.id}>
              <TableCell>
                <Checkbox
                  name="leaveSelect"
                  id={`leave-checkbox-${leave.id}`}
                  checked={selectedIds.includes(leave.id)}
                  onCheckedChange={() => handleCheckboxChange(leave.id)}
                />
              </TableCell>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{leave.users.name}</TableCell>
              <TableCell>{leave.users.departments.name}</TableCell>
              <TableCell>{leave.users.positions.name}</TableCell>
              <TableCell>{leave.leave_type_id.name}</TableCell>
              <TableCell>{leave.start_date}</TableCell>
              <TableCell>{leave.end_date}</TableCell>
              <TableCell>
                {leave.half_day_type
                  ? HALF_DAY_TYPE_LABELS[leave.half_day_type]
                  : '-'}
              </TableCell>
              <TableCell>{leave.total_days}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{LEAVE_STATUSES_LABELS[leave.status]}</TableCell>
              <TableCell>{leave.requested_at}</TableCell>
              <TableCell>{leave.approver?.name}</TableCell>
              <TableCell>{leave.approved_at}</TableCell>
              <TableCell>{leave.rejection_reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <div>
          <Button
            type="button"
            onClick={() => approveLeaveRequest(selectedIds, user.id)}
          >
            승인
          </Button>
          <Button
            type="button"
            onClick={() => rejectLeaveRequest(selectedIds, user.id)}
          >
            반려
          </Button>
        </div>
      </div>
    </>
  );
};

export default LeaveList;
