import EmployeeAppSidebarLayout from '../../layouts/app/employee-app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Position?: string;
}

interface Laboratory {
    ID: number;
    Emp_ID: string;
    examNo: string;
    examiNation: string;
    Lab_Date: string;
    Lab_Taker_ID: string;
    Record_ID: number;
    archived: boolean;
}

interface Props {
    user: Employee;
    laboratories: Laboratory[];
}

export default function Laboratory({ user, laboratories }: Props) {
    const [selectedDate, setSelectedDate] = useState('');
    const dateInputRef = useRef<HTMLInputElement>(null);

    const getFullName = () => {
        const parts = [user?.First_Name, user?.Middle_Name, user?.Last_Name];
        return parts.filter(Boolean).join(' ');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <EmployeeAppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/employee/dashboard' },
            { title: 'Laboratory', href: '/employee/laboratory' }
        ]}>
            <Head title="Laboratory" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-0 border border-gray-200">
                            {/* Employee Profile */}
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                                <img
                                    src="/images/profilePic.png"
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="text-center font-bold text-lg mb-2">{getFullName()}</div>
                            <div className="text-center text-gray-600 mb-6">{user?.Position || 'Employee'}</div>
                            
                        </div>
                        {/* Main Section */}
                        <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full max-w-4xl">
                                <div className="font-bold text-xl mb-6">LABORATORY</div>
                                <div className="flex items-center gap-4 mb-6">
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-semibold cursor-pointer"
                                        onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                                    >
                                        <img src="/icons/calendar.png" alt="Calendar" className="w-5 h-5" />
                                        {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'SELECT A DATE'}
                                    </button>
                                    <input
                                        ref={dateInputRef}
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => setSelectedDate(e.target.value)}
                                        className="hidden"
                                    />
                                    <select className="border rounded px-2 py-2">
                                        <option>Active Records</option>
                                    </select>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <input type="text" className="border rounded px-2 py-2 ml-2" placeholder="Search" />
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl shadow p-0 overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="" style={{ backgroundColor: '#0D3255', color: 'white' }}>
                                                <th className="py-3 px-6 text-left">EXAM DATE</th>
                                                <th className="py-3 px-6 text-left">EXAMINATION</th>
                                                <th className="py-3 px-6 text-left">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {laboratories && laboratories.length > 0 ? (
                                                laboratories.map((lab) => (
                                                    <tr key={lab.ID} className="border-b">
                                                        <td className="py-3 px-6 text-blue-900 font-semibold">
                                                            {formatDate(lab.Lab_Date)}
                                                        </td>
                                                        <td className="py-3 px-6">{lab.examiNation}</td>
                                                        <td className="py-3 px-6 flex gap-2">
                                                            <Link 
                                                                href={`/employee/laboratory-details/${lab.ID}`}
                                                                className="text-white rounded p-2 cursor-pointer inline-flex items-center justify-center" 
                                                                style={{ backgroundColor: '#37B37E' }} 
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A9D69'} 
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#37B37E'}
                                                            >
                                                                <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                            </Link>
                                                            <button className="text-white rounded p-2 cursor-pointer" style={{ backgroundColor: '#FFAB01' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E69A01'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFAB01'}>
                                                                <img src="/icons/download.png" alt="Download" className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="py-8 px-6 text-center text-gray-500">
                                                        No laboratory records found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-end items-center mt-4">
                                    <button className="border rounded px-2 py-1 mr-2 cursor-pointer">&lt;</button>
                                    <button className="border rounded px-2 py-1 cursor-pointer">&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EmployeeAppSidebarLayout>
    );
}
