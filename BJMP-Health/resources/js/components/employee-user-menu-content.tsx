import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { EmployeeUserInfo } from '@/components/employee-user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

interface EmployeeUserMenuContentProps {
    user: User;
}

export function EmployeeUserMenuContent({ user }: EmployeeUserMenuContentProps) {
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <EmployeeUserInfo user={user} showId={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full hover:bg-[#FFAB2E] hover:text-white" href={route('security')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-[#FFAB2E] hover:text-white" onClick={() => {
                cleanup();
                router.post(route('logout'), {}, {
                    preserveState: false,
                    preserveScroll: false,
                    onFinish: () => {
                        window.location.href = '/login';
                    }
                });
            }}>
                <LogOut className="mr-2" />
                Log out
            </DropdownMenuItem>
        </>
    );
}
