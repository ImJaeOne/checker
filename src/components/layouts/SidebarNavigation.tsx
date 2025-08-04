import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Link } from 'react-router-dom';
import SITE_MAP from '@/constants/siteMap.constant';

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

interface SidebarNavigationProps {
  isNotAdmin: boolean;
}

const SidebarNavigation = ({ isNotAdmin }: SidebarNavigationProps) => {
  return (
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
  );
};

export default SidebarNavigation;
