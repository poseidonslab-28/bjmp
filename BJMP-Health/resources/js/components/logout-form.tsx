import { router } from '@inertiajs/react';

interface LogoutFormProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function LogoutForm({ children, className, onClick }: LogoutFormProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (onClick) {
            onClick();
        }
        
        router.post(route('logout'), {}, {
            preserveState: false,
            preserveScroll: false,
            onStart: () => {
                console.log('Logout started');
            },
            onError: (errors) => {
                console.error('Logout error:', errors);
            },
            onSuccess: () => {
                console.log('Logout successful');
            }
        });
    };

    return (
        <div className={className} onClick={handleClick} style={{ cursor: 'pointer' }}>
            {children}
        </div>
    );
}
