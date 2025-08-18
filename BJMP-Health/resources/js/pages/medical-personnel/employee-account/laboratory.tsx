import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Middle_Name?: string;
    Last_Name: string;
    Position?: string;
    Picture_ID?: string;
    Full_Name?: string;
}

interface Laboratory {
    ID: number;
    Emp_ID: string;
    examNo: string;
    examiNation: string;
    Lab_Date: string;
    Lab_Taker_ID: string;
    Record_ID?: number;
    archived: boolean;
}

interface Props {
    employee: Employee;
    laboratories: Laboratory[];
}

export default function Laboratory({ employee, laboratories }: Props) {
    // Helper to display N/A for blank/null/undefined, always returns string
    const displayValue = (value: string | number | boolean | undefined | null): string => {
        if (value === null || value === undefined || value === "") return "N/A";
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return String(value);
    };

    return (
        <MedicalAppSidebarLayout breadcrumbs={[{ title: 'Laboratory', href: `/medical/employee-account/laboratory/${employee.Emp_ID}` }]}> 
            <Head title="Laboratory" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-0 border border-gray-200">
                            {/* Employee Profile */}
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                                <img
                                    src={employee.Picture_ID ? `/images/profiles/${employee.Picture_ID}` : "/images/profilePic.png"}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="text-center mb-2 font-bold text-lg">{employee.First_Name} {employee.Middle_Name ? employee.Middle_Name + ' ' : ''}{employee.Last_Name}</div>
                            <div className="text-center text-gray-600 mb-6">{displayValue(employee.Position)}</div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
                            {/* Sidebar Navigation */}
                            <div className="w-full flex flex-col gap-2 px-4">
                                <Link href={`/medical/employee-account/personal-profile/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
                                </Link>
                                <Link href={`/medical/employee-account/medical-history/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" /> Medical History
                                </Link>
                                <Link href={`/medical/employee-account/laboratory/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
                                    <img src="/icons/laboratory.png" alt="Laboratory" className="w-6 h-6" /> Laboratory
                                </Link>
                                <Link href={`/medical/employee-account/imaging/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/imaging.png" alt="Imaging" className="w-6 h-6" /> Imaging
                                </Link>
                                <Link href={`/medical/employee-account/vaccination/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/vaccination.png" alt="Vaccination" className="w-6 h-6" /> Vaccination
                                </Link>
                                <Link href={`/medical/employee-account/dental-record/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/dental-record.png" alt="Dental Record" className="w-6 h-6" /> Dental Record
                                </Link>
                                <Link href={`/medical/employee-account/doctors-note/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/doctors-note.png" alt="Doctor's Note" className="w-6 h-6" /> Doctor's Note
                                </Link>
                            </div>
                        </div>
                        {/* Main Section */}
                        <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full max-w-4xl">
                                <div className="font-bold text-xl mb-6">LABORATORY</div>
                                <div className="flex items-center gap-4 mb-6">
                                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-semibold">
                                        <img src="/icons/calendar.png" alt="Calendar" className="w-5 h-5" /> SELECT A DATE
                                    </button>
                                    <select className="border rounded px-2 py-2">
                                        <option>Active Records</option>
                                    </select>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button className="rounded px-2 py-2 flex items-center justify-center" style={{ backgroundColor: '#0D3255', color: 'white' }}>
                                            <img src="/icons/add.png" alt="Add" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                                        </button>
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
                                                            {new Date(lab.Lab_Date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            }).toUpperCase()}
                                                        </td>
                                                        <td className="py-3 px-6">{lab.examiNation}</td>
                                                        <td className="py-3 px-6 flex gap-2">
                                                            <Link 
                                                                href={`/medical/employee-account/laboratory/${employee.Emp_ID}/details/${lab.ID}`}
                                                                className="bg-green-500 hover:bg-green-600 text-white rounded p-2 inline-block"
                                                            >
                                                                <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                            </Link>
                                                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white rounded p-2">
                                                                <img src="/icons/edit-text.png" alt="Edit" className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="py-8 px-6 text-center text-gray-500">
                                                        No laboratory records found for this employee.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-end items-center mt-4">
                                    <button className="border rounded px-2 py-1 mr-2">&lt;</button>
                                    <button className="border rounded px-2 py-1">&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MedicalAppSidebarLayout>
    );
}
