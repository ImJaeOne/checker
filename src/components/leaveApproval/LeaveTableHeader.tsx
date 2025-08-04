import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import type { LeaveApprovals } from '@/types/DTO/leaveRequests.dto';

type LeaveTableHeaderProps = {
  leaveList: LeaveApprovals | undefined;
  selectedIds: number[];
  onAllCheck: (checked: boolean) => void;
};

const LeaveTableHeader = ({
  leaveList,
  selectedIds,
  onAllCheck,
}: LeaveTableHeaderProps) => {
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
    { key: 'processedBy', label: '결재자' },
    { key: 'processedAt', label: '결재 일시' },
    { key: 'rejectionReason', label: '반려 사유' },
  ];

  return (
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
                onCheckedChange={onAllCheck}
              />
            ) : (
              column.label
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default LeaveTableHeader;
