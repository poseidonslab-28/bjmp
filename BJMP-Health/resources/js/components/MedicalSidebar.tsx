import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
//import { Link } from '@inertiajs/react';
import { LayoutGrid, User, HelpCircle, Info, Users } from 'lucide-react';
//import AppLogo from './app-logo';

const medicalNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/medical/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Personal Information',
        href: '/medical/personal-information',
        icon: User,
    },
    {
        title: 'Employee Account',
        href: '/medical/employee-account',
        icon: Users,
    },
    {
        title: 'Help',
        href: '/medical/help',
        icon: HelpCircle,
    },
    {
        title: 'About Us',
        href: '/medical/about-us',
        icon: Info,
    },
];

const medicalFooterNavItems: NavItem[] = [
    // Add any footer items if needed
];

export function MedicalSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#0D3255] border-none shadow-none">
            <SidebarHeader className="bg-[#0D3255]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="bg-[#0D3255]">
                            {/* <Link href="/medical/dashboard" prefetch>
                                <AppLogo />
                            </Link> */}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-[#0D3255]">
                <NavMain items={medicalNavItems} />
            </SidebarContent>

            <SidebarFooter className="bg-[#0D3255]">
                <NavFooter items={medicalFooterNavItems} className="mt-auto bg-[#0D3255]" />
                <div className="text-white" style={{ color: '#fff', fill: '#fff' }}>
                    <NavUser />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
