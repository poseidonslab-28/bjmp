import EmployeeAppSidebarLayout from '../../layouts/app/employee-app-sidebar-layout';
import { Head } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Position?: string;
}

interface HelpData {
    ID: number;
    Date: string;
    Doc_Name: string;
    Doc_File: string;
}

interface Props {
    user: Employee;
    helpData: HelpData[];
}

export default function Help({ user, helpData }: Props) {
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
            { title: 'Help', href: '/employee/help' }
        ]}>
            <Head title="Help" />
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
                        
                        {/* Main Content */}
                        <div className="flex-1 flex flex-col bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full">
                                <h1 className="text-3xl font-bold mb-6">HELP</h1>
                                
                                {helpData.length > 0 ? (
                                    <div className="space-y-4">
                                        {helpData.map((help) => (
                                            <div key={help.ID} className="bg-gray-50 rounded-lg shadow-md p-5 border border-gray-200">
                                                <div className="mb-3">
                                                    <div className="text-sm text-gray-500 mb-1">
                                                        Uploaded on: {formatDate(help.Date)}
                                                    </div>
                                                    <div className="text-sm text-gray-700 mb-3">
                                                        Click the link below to download the PDF file:
                                                    </div>
                                                </div>
                                                <a
                                                    href={`/help-files/${help.Doc_File}`}
                                                    className="flex items-center gap-2 text-blue-600 font-medium hover:underline text-sm"
                                                    download
                                                >
                                                    <img src="/icons/pdf.png" alt="PDF" className="w-5 h-5" />
                                                    {help.Doc_Name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg shadow-md p-8 text-center border border-gray-200">
                                        <div className="text-gray-500 text-lg mb-2">No help documents available</div>
                                        <div className="text-gray-400 text-sm">Please check back later for help and manual guides.</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EmployeeAppSidebarLayout>
    );
}
