import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
}

interface Props {
    employee: Employee;
}

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export default function MedicalDashboard({ employee }: Props) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const welcomeRef = useRef<HTMLDivElement>(null);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Build calendar grid
    const calendarCells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarCells.push(<div key={"empty-" + i} className="text-gray-400"> </div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
        calendarCells.push(
            <div
                key={day}
                className={
                    isToday
                        ? "bg-blue-900 text-white rounded-full font-bold"
                        : ""
                }
            >
                {day}
            </div>
        );
    }

    useEffect(() => {
        if (welcomeRef.current) {
            welcomeRef.current.animate([
                { opacity: 0, transform: 'translateY(-40px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 900,
                easing: 'ease-out',
                fill: 'forwards'
            });
        }
    }, []);

    // Helper to format full name
    const getFullName = (emp?: Employee) => {
        if (!emp) return 'MEDICAL PERSONNEL';
        const first = emp.First_Name ? emp.First_Name.trim() : '';
        const last = emp.Last_Name ? emp.Last_Name.trim() : '';
        // Show only first and last name, as in the sidebar (e.g., 'DEXTER BONAYON')
        const full = [first, last].filter(Boolean).join(' ');
        return full ? full.toUpperCase() : 'MEDICAL PERSONNEL';
    };
    return (
        <>
            <Head title="Medical Personnel Dashboard" />
            <MedicalAppSidebarLayout>
                <div className="flex flex-col md:flex-row gap-6 p-6">
                    <div className="flex-1">
                        {/* Logo and welcome message row */}
                        <div className="flex flex-col gap-2 mb-6">
                            <div className="flex items-center">
                                <img src="/images/hrms-logo.png" alt="Logo" className="h-24 md:h-32 ml-2" />
                            </div>
                            <div className="w-full">
                                <div ref={welcomeRef} className="text-xl md:text-2xl font-bold bg-white rounded px-6 py-3 shadow">
                                    WELCOME BACK, <span style={{ color: '#FFB800' }}>{getFullName(employee)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            {[
                                {
                                    href: "/medical/personal-information",
                                    icon: "/icons/personal-information.png",
                                    alt: "Personal Information",
                                    text: "Personal Information"
                                },
                                {
                                    href: "/medical/employee-account",
                                    icon: "/icons/employee-account.png",
                                    alt: "Employee Account",
                                    text: "Employee Account"
                                },
                                {
                                    href: "/medical/help",
                                    icon: "/icons/help.png",
                                    alt: "Help",
                                    text: "Help"
                                },
                                {
                                    href: "/medical/about-us",
                                    icon: "/icons/about-us.png",
                                    alt: "About Us",
                                    text: "About Us"
                                }
                            ].map((item, index) => (
                                <Link key={index} href={item.href} className="block h-full">
                                    <div className="bg-[#375877] rounded-2xl flex flex-col items-center justify-between p-8 cursor-pointer hover:bg-[#27405a] transition group shadow-lg h-full min-h-[240px]">
                                        <div className="flex-1 flex items-center justify-center">
                                            <img 
                                                src={item.icon} 
                                                alt={item.alt} 
                                                className="w-20 h-20 group-hover:scale-110 transition-transform duration-300" 
                                                onError={e => e.currentTarget.src='/icons/default.svg'} 
                                            />
                                        </div>
                                        <div className="text-white text-xl font-semibold text-center mt-4">{item.text}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-80">
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Weather" className="rounded-xl w-full h-28 object-cover mb-4" />
                            <div className="flex items-center mb-2">
                                <svg className="w-10 h-10 text-yellow-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0A9 9 0 0 0 3 12Z"/><path d="M12 7v5l3 3"/></svg>
                                <div>
                                    <div className="text-2xl font-bold">37°</div>
                                    <div className="text-base">Partly Cloudy</div>
                                    <div className="text-xs text-gray-500">2:45 PM<br/>Malolos, Bulacan</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="font-semibold mb-2 flex items-center justify-between">
                                <button onClick={prevMonth} className="px-2 py-1 text-lg font-bold">&#60;</button>
                                {monthNames[currentMonth]} {currentYear}
                                <button onClick={nextMonth} className="px-2 py-1 text-lg font-bold">&#62;</button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-gray-700">
                                <div className="font-bold">Su</div><div className="font-bold">Mo</div><div className="font-bold">Tu</div><div className="font-bold">We</div><div className="font-bold">Th</div><div className="font-bold">Fr</div><div className="font-bold">Sa</div>
                                {calendarCells}
                            </div>
                        </div>
                    </div>
                </div>
            </MedicalAppSidebarLayout>
        </>
    );
}
