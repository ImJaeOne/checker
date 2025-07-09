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

const NavItems = [
  {
    title: '대시보드',
    url: SITE_MAP.DASHBOARD,
  },
  {
    title: '출퇴근 관리',
    url: SITE_MAP.ATTENDANCE,
  },
  {
    title: '연차 관리',
    url: SITE_MAP.ATTENDANCE,
  },
  {
    title: '직원 관리',
    url: SITE_MAP.EMPLOYEES,
  },
];

const AppSidebar = () => {
  const user = useUserStore((state) => state.user);
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
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold">Checker</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
