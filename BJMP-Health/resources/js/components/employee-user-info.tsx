import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Emp_Pass: string;
    isActive: number;
    isAdmin: number;
    isMedEmp: number;
}

// Create a union type that can handle both User and Employee
type UserOrEmployee = User | Employee;

function isEmployee(user: UserOrEmployee): user is Employee {
    return 'Emp_ID' in user;
}

export function EmployeeUserInfo({ user, showId = false }: { user: UserOrEmployee; showId?: boolean }) {
    const getInitials = useInitials();
    
    let fullName: string;
    let displayId: string | undefined;
    let avatar: string | undefined;
    
    if (isEmployee(user)) {
        // Handle Employee type
        fullName = `${user.First_Name} ${user.Last_Name}`;
        displayId = user.Emp_ID;
        avatar = undefined;
    } else {
        // Handle User type
        fullName = user.name;
        displayId = user.id.toString();
        avatar = user.avatar;
    }

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={avatar || ""} alt={fullName} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(fullName)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                {showId && displayId && <span className="truncate text-xs text-muted-foreground">{displayId}</span>}
            </div>
        </>
    );
}
