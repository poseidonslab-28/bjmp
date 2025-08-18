import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, BookOpen, FlaskConical, Image, Syringe, FileText, FileSignature, Info, HelpCircle } from 'lucide-react';
import { EmployeeNavUser } from '@/components/employee-nav-user';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/employee/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Personal Profile',
        href: '/employee/personal-information',
        icon: User,
    },
];

const medicalRecordsItems = [
    {
        title: 'Medical History',
        href: '/employee/medical-history',
        icon: BookOpen,
    },
    {
        title: 'Laboratory',
        href: '/employee/laboratory',
        icon: FlaskConical,
    },
    {
        title: 'Imaging',
        href: '/employee/imaging',
        icon: Image,
    },
    {
        title: 'Vaccination Record',
        href: '/employee/vaccination',
        icon: Syringe,
    },
    {
        title: 'Dental Record',
        href: '/employee/dental-record',
        icon: FileText,
    },
    {
        title: "Doctor's Notes",
        href: '/employee/doctors-note',
        icon: FileSignature,
    },
];

const contentManagementItems = [
    {
        title: 'Help',
        href: '/employee/help',
        icon: HelpCircle,
    },
    {
        title: 'About Us',
        href: '/employee/about-us',
        icon: Info,
    },
];

export function EmployeeSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#183153] border-none shadow-none">
            <SidebarContent className="bg-[#183153] pt-4">
                <SidebarMenu>
                    {/* Main Navigation */}
                    {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="text-white hover:bg-[#FFAB2E] data-[state=open]:bg-[#FFAB2E]">
                                <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    
                    {medicalRecordsItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="text-white hover:bg-[#FFAB2E] data-[state=open]:bg-[#FFAB2E]">
                                <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    
                    {contentManagementItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="text-white hover:bg-[#FFAB2E] data-[state=open]:bg-[#FFAB2E]">
                                <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="bg-[#183153]">
                <EmployeeNavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
