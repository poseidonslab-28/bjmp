import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';

interface Employee {
    Emp_ID: string | number;
    First_Name?: string;
    Last_Name?: string;
    [key: string]: any;
}

// Use index signature for PageProps to satisfy Inertia's type
interface MyPageProps {
    employee: Employee;
    [key: string]: any;
}

interface AppSidebarLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<AppSidebarLayoutProps>) {
    // Pull employee from Inertia page props
    const { employee } = usePage<MyPageProps>().props;

    return (
        <AppShell variant="sidebar">
            <AppSidebar employee={employee} />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
