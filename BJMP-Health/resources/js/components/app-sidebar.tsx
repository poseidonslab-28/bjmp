import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { LayoutGrid, User, Users, UserCheck, HelpCircle, Info } from 'lucide-react';

interface AppSidebarProps {
    employee: {
        Emp_ID: string | number;
    };
}

const footerNavItems: NavItem[] = [];

export function AppSidebar({ employee }: AppSidebarProps) {
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Personal Information',
            href: `/personal-information/${employee?.Emp_ID}`, // safe access
            icon: User,
        },
        {
            title: 'Employee Account',
            href: '/employee-account',
            icon: Users,
        },
        {
            title: 'Medical Personnel',
            href: '/medical-personnel',
            icon: UserCheck,
        },
        {
            title: 'Help',
            href: '/help',
            icon: HelpCircle,
        },
        {
            title: 'About Us',
            href: '/about-us',
            icon: Info,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#0D3255] border-none shadow-none">
            <SidebarHeader className="bg-[#0D3255]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="bg-[#0D3255]">
                            {/* Optional Logo component */}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-[#0D3255]">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="bg-[#0D3255]">
                <NavFooter items={footerNavItems} className="mt-auto bg-[#0D3255]" />
                <div className="flex flex-col items-center py-6">
                    <NavUser />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
