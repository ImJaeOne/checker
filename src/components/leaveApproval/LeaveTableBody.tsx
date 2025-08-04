import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  HALF_DAY_TYPE_LABELS,
  LEAVE_STATUSES_LABELS,
} from '@/constants/leave.constant';
import type { LeaveApprovals } from '@/types/DTO/leaveRequests.dto';
import { formatISOStringToYMDHMS } from '@/utils/date.util';

type LeaveTableBodyProps = {
  leaveList: LeaveApprovals | undefined;
  selectedIds: number[];
  onCheckboxChange: (id: number) => void;
};
const LeaveTableBody = ({
  leaveList,
  selectedIds,
  onCheckboxChange,
}: LeaveTableBodyProps) => {
  return (
    <TableBody>
      {leaveList?.map((leave, idx) => (
        <TableRow
          key={leave.id}
          className={
            selectedIds.includes(leave.id) ? 'bg-gray-50' : 'bg-gray-0'
          }
        >
          <TableCell>
            <Checkbox
              name="leaveSelect"
              id={`leave-checkbox-${leave.id}`}
              checked={selectedIds.includes(leave.id)}
              onCheckedChange={() => onCheckboxChange(leave.id)}
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
              : ''}
          </TableCell>
          <TableCell>{leave.total_days}</TableCell>
          <TableCell>{leave.reason}</TableCell>
          <TableCell>{LEAVE_STATUSES_LABELS[leave.status]}</TableCell>
          <TableCell>{formatISOStringToYMDHMS(leave.requested_at)}</TableCell>
          <TableCell>{leave.approver?.name}</TableCell>
          <TableCell>
            {leave.processed_at
              ? formatISOStringToYMDHMS(leave.processed_at)
              : ''}
          </TableCell>
          <TableCell>{leave.rejection_reason}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default LeaveTableBody;
