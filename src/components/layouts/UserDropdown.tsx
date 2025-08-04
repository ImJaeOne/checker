import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import SITE_MAP from '@/constants/siteMap.constant';
import type { UserWithPositionDTO } from '@/types/DTO/user.dto';
import type { AttendanceState } from '@/types/DTO/attendances.dto';
import AttendanceBtn from '@/components/layouts/AttendanceBtn';

interface UserDropdownProps {
  user: UserWithPositionDTO;
  attendanceState: AttendanceState;
}

const UserDropdown = ({ user, attendanceState }: UserDropdownProps) => {
  const navigate = useNavigate();

  const onSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error);
        return;
      }
      alert('로그아웃 되었습니다.');
      navigate(SITE_MAP.LOGIN);
    } catch (error) {
      alert('에러 발생');
      console.error(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <span>{user.name}</span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem onClick={onSignOut}>
              <span>로그아웃</span>
            </DropdownMenuItem>
            <AttendanceBtn user={user} attendanceState={attendanceState} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default UserDropdown;
