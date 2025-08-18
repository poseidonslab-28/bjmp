import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { EmployeeUserInfo } from '@/components/employee-user-info';
import { EmployeeUserMenuContent } from '@/components/employee-user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type User } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

interface PageProps extends Record<string, unknown> {
    auth?: {
        user: User;
    };
    user?: User;
}

export function EmployeeNavUser() {
    const { props } = usePage<PageProps>();
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const user = props.user || props.auth?.user;

    if (!user) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" className="bg-[#183153]">
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold text-white">Guest User</span>
                            <span className="truncate text-xs text-gray-300">Not logged in</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="text-sidebar-accent-foreground hover:bg-[#FFAB2E] data-[state=open]:bg-[#FFAB2E] group">
                            <EmployeeUserInfo user={user} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'right' : 'bottom'}
                    >
                        <EmployeeUserMenuContent user={user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
