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
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user.store';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

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
                                  <a href={child.url}>
                                    <span>{child.title}</span>
                                  </a>
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
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
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
                  <p>{user.name}</p>
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
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
