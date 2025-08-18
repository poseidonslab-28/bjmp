import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, BookOpen, FlaskConical, Image, Syringe, FileText, FileSignature, Info, HelpCircle } from 'lucide-react';
// You may want to create a separate nav user for medical personnel, or reuse EmployeeNavUser
import { EmployeeNavUser } from '@/components/employee-nav-user';

const mainNavItems = [
    {
        title: 'Personal Profile',
        href: '/medical-personnel/employee-account/personal-profile',
        icon: User,
    },
];

const medicalRecordsItems = [
    {
        title: 'Medical History',
        href: '/medical-personnel/employee-account/medical-history',
        icon: BookOpen,
    },
    {
        title: 'Laboratory',
        href: '/medical-personnel/employee-account/laboratory',
        icon: FlaskConical,
    },
    {
        title: 'Imaging',
        href: '/medical-personnel/employee-account/imaging',
        icon: Image,
    },
    {
        title: 'Vaccination Record',
        href: '/medical-personnel/employee-account/vaccination',
        icon: Syringe,
    },
    {
        title: 'Dental Record',
        href: '/medical-personnel/employee-account/dental-record',
        icon: FileText,
    },
    {
        title: "Doctor's Notes",
        href: '/medical-personnel/employee-account/doctors-note',
        icon: FileSignature,
    },
];


export function MedicalPersonnelSidebar() {
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
                    
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="bg-[#183153]">
                <EmployeeNavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
