import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type LeaveActionButtonsProps = {
  selectedIds: number[];
  onApprove: () => void;
  onReject: (rejectReason: string, onSuccess: () => void) => void;
  isApproving: boolean;
  isRejecting: boolean;
};

const LeaveActionButtons = ({
  selectedIds,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: LeaveActionButtonsProps) => {
  const [rejectReason, setRejectReason] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveClick = () => {
    if (selectedIds.length === 0) {
      alert('승인할 항목을 선택해주세요.');
      return;
    }
    onApprove();
  };

  const handleRejectClick = () => {
    if (selectedIds.length === 0) {
      alert('반려할 항목을 선택해주세요.');
      return;
    }
    setIsDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      alert('반려 사유를 입력해주세요.');
      return;
    }

    onReject(rejectReason, () => {
      setRejectReason('');
      setIsDialogOpen(false);
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setRejectReason('');
  };

  return (
    <div className="flex gap-2">
      <Button type="button" onClick={handleApproveClick} disabled={isApproving}>
        {isApproving ? '승인 중...' : '승인'}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <Button onClick={handleRejectClick}>반려</Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>반려 사유 작성</DialogTitle>
            <DialogDescription>반려 사유를 작성해 주세요.</DialogDescription>
          </DialogHeader>
          <div>
            <Textarea
              placeholder="반려 사유를 입력해주세요..."
              onChange={(e) => setRejectReason(e.target.value)}
              value={rejectReason}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDialogClose}
              disabled={isRejecting}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleRejectConfirm}
              disabled={isRejecting}
            >
              {isRejecting ? '처리 중...' : '확인'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveActionButtons;
