import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import SITE_MAP from '@/constants/siteMap.constant';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronUp } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user.store';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useGetAttendanceQuery } from '@/hooks/useAttendanceQuery';
import { usePostAttendanceMutation } from '@/hooks/usePostAttendanceMutation';
import { ATTENDANCE_STATUS } from '@/constants/attendance.constant';

const NavItems = [
  {
    title: '대시보드',
    url: SITE_MAP.DASHBOARD,
  },
  {
    title: '출퇴근 관리',
    url: SITE_MAP.ATTENDANCE,
    authority: true,
  },
  {
    title: '연차 관리',
    children: [
      {
        title: '연차 신청',
        url: SITE_MAP.LEAVE_REQUEST,
      },
      {
        title: '연차 승인',
        url: SITE_MAP.LEAVE_APPROVAL,
        authority: true,
      },
    ],
  },
  {
    title: '직원 관리',
    url: SITE_MAP.EMPLOYEES,
    authority: true,
  },
];

const AppSidebar = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const isNotAdmin = user.role !== 'admin';

  const {
    data: attendanceState,
    isPending,
    isError,
  } = useGetAttendanceQuery(user.id);

  const { mutate: attendanceMutation, isPending: isMutating } =
    usePostAttendanceMutation();

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

  const onClickCheckIn = () => {
    if (
      !isMutating &&
      attendanceState?.status === ATTENDANCE_STATUS.NOT_CHECKED
    ) {
      attendanceMutation(user.id);
    }
  };

  const onClickCheckOut = () => {
    if (
      !isMutating &&
      attendanceState?.status === ATTENDANCE_STATUS.CHECKED_IN
    ) {
      attendanceMutation(user.id);
    }
  };

  const isCheckInDisabled =
    isMutating || attendanceState?.status !== ATTENDANCE_STATUS.NOT_CHECKED;
  const isCheckOutDisabled =
    isMutating || attendanceState?.status !== ATTENDANCE_STATUS.CHECKED_IN;

  const checkInTime = attendanceState?.check_in_time;
  const checkOutTime = attendanceState?.check_out_time;

  return (
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold">Checker</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NavItems.map((item) => {
                if (item.authority && isNotAdmin) return null;
                return item.children ? (
                  <Collapsible
                    defaultOpen
                    className="group/collapsible"
                    key={item.title}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => {
                            if (child.authority && isNotAdmin) return null;
                            return (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link to={child.url}>
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {isPending ? (
                    '로딩중...'
                  ) : isError ? (
                    '사용자 정보 불러올 수 없음'
                  ) : (
                    <>
                      <span>{user.name}</span>
                      <ChevronUp className="ml-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={onSignOut}>
                  <span>로그아웃</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onClickCheckIn}
                  disabled={isCheckInDisabled}
                  className={isCheckInDisabled ? 'text-gray-400' : ''}
                >
                  <span>출근</span>
                  {checkInTime && (
                    <span className="ml-2 text-xs text-gray-700">
                      {checkInTime}
                    </span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onClickCheckOut}
                  disabled={isCheckOutDisabled}
                  className={isCheckOutDisabled ? 'text-gray-400' : ''}
                >
                  <span>퇴근</span>
                  {checkOutTime && (
                    <span className="ml-2 text-xs text-gray-700">
                      {checkOutTime}
                    </span>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
