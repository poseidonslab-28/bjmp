import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, BookOpen, FlaskConical, Image, Syringe, FileText, FileSignature } from 'lucide-react';

const employeeNavItems = [
    {
        title: 'Dashboard',
        href: '/employee/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Personal Information',
        href: '/employee/personal-information',
        icon: User,
    },
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
        title: 'Vaccination',
        href: '/employee/vaccination',
        icon: Syringe,
    },
    {
        title: 'Dental Record',
        href: '/employee/dental-record',
        icon: FileText,
    },
    {
        title: "Doctor's Note",
        href: '/employee/doctors-note',
        icon: FileSignature,
    },
];

export function SimpleEmployeeSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarMenu>
                    {employeeNavItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.href} className="flex items-center gap-2 hover:bg-[#FFAB2E]">
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
