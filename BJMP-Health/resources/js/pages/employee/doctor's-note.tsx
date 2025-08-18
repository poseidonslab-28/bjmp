import EmployeeAppSidebarLayout from '../../layouts/app/employee-app-sidebar-layout';
import { Head } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Position?: string;
}

interface Props {
    user: Employee;
}

export default function DoctorsNote({ user }: Props) {
    const getFullName = () => {
        const parts = [user?.First_Name, user?.Middle_Name, user?.Last_Name];
        return parts.filter(Boolean).join(' ');
    };
    return (
        <EmployeeAppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/employee/dashboard' },
            { title: "Doctor's Note", href: '/employee/doctors-note' }
        ]}>
            
                <Head title="Doctor's Note" />
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
                            <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
                                <div className="w-full max-w-4xl">
                                    <button
                                        className="flex items-center gap-2 mb-4 px-4 py-1 rounded bg-gray-100 text-black font-semibold text-sm cursor-pointer"
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        <img src="/icons/back.png" alt="Back" className="w-5 h-5" /> BACK
                                    </button>
                                    <div className="bg-gray-50 rounded-xl shadow p-6 flex items-center justify-between mb-6">
                                        <div>
                                            <div className="font-bold text-base mb-1">ANNUAL MEDICAL EXAMINATION</div>
                                            <div className="text-sm mb-2">Medical Doctor In Charge: JO2 SORIANO, ERNEST OSCAR DAY</div>
                                            <div className="text-gray-500 text-sm">Essentially Well-Adult.</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-4">
                                            <div className="text-sm text-gray-700">FEBRUARY 12, 2024</div>
                                            <button className="bg-[#FFAB2ECC] text-white font-semibold px-6 py-2 rounded cursor-pointer">
                                                <img src="/icons/download.png" alt="Edit" className="w-5 h-5 inline-block mr-1" /> Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </EmployeeAppSidebarLayout>
    );
}
