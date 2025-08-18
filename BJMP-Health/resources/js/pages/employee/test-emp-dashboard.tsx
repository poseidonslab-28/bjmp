import { Head } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    Emp_FName: string;
    Emp_LName: string;
    Emp_Pass: string;
    isActive: number;
    isAdmin: number;
    isMedEmp: number;
}

interface Props {
    auth?: {
        user: Employee;
    };
    user?: Employee;
    role?: string;
}

export default function TestEmployeeDashboard({ auth, user }: Props) {
    const currentUser = user || auth?.user;

    return (
        <>
            <Head title="Employee Dashboard" />
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto p-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            Employee Dashboard - Test Version
                        </h1>
                        
                        {currentUser && (
                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                                    Welcome back, {currentUser.Emp_FName} {currentUser.Emp_LName}!
                                </h2>
                                <div className="text-blue-600">
                                    <p>Employee ID: {currentUser.Emp_ID}</p>
                                    <p>Status: {currentUser.isActive ? 'Active' : 'Inactive'}</p>
                                    <p>Admin: {currentUser.isAdmin ? 'Yes' : 'No'}</p>
                                    <p>Medical Employee: {currentUser.isMedEmp ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        )}

                        {!currentUser && (
                            <div className="bg-red-50 p-4 rounded-lg mb-6">
                                <p className="text-red-600">No user data found</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-green-50 p-6 rounded-lg border">
                                <h3 className="font-semibold text-green-800 mb-2">Personal Information</h3>
                                <p className="text-green-600">View and update your personal details</p>
                            </div>
                            
                            <div className="bg-purple-50 p-6 rounded-lg border">
                                <h3 className="font-semibold text-purple-800 mb-2">Medical Records</h3>
                                <p className="text-purple-600">Access your health information</p>
                            </div>
                            
                            <div className="bg-orange-50 p-6 rounded-lg border">
                                <h3 className="font-semibold text-orange-800 mb-2">Laboratory Results</h3>
                                <p className="text-orange-600">View your lab test results</p>
                            </div>

                            <div className="bg-pink-50 p-6 rounded-lg border">
                                <h3 className="font-semibold text-pink-800 mb-2">Vaccination</h3>
                                <p className="text-pink-600">View your vaccination records</p>
                            </div>

                            <div className="bg-indigo-50 p-6 rounded-lg border">
                                <h3 className="font-semibold text-indigo-800 mb-2">Imaging</h3>
                                <p className="text-indigo-600">View your imaging results</p>
                            </div>

                            <div className="bg-yellow-50 p-6 rounded-lg border">
                                <h3 className="font-semibold text-yellow-800 mb-2">Dental Records</h3>
                                <p className="text-yellow-600">View your dental information</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
                            <div className="bg-gray-50 p-4 rounded">
                                <pre className="text-sm text-gray-600">
                                    {JSON.stringify({ auth, user }, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
