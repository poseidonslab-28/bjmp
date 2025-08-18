import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Imaging() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Imaging', href: '/medical_personnel/imaging' }]}> 
            <Head title="Imaging" />
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
                            <div className="text-center font-bold text-lg mb-2">JOHNJOHN PATRICK SOLIMAN</div>
                            <div className="text-center text-gray-600 mb-6">Staff Nurse</div>
                            {/* Sidebar Navigation */}
                            <div className="w-full flex flex-col gap-2 px-4">
                                <Link href="/medical_personnel/personal-profile" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
                                </Link>
                                <Link href="/medical_personnel/medical-history" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" /> Medical History
                                </Link>
                                <Link href="/medical_personnel/laboratory" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/laboratory.png" alt="Laboratory" className="w-6 h-6" /> Laboratory
                                </Link>
                                <Link href="/medical_personnel/imaging" className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
                                    <img src="/icons/imaging.png" alt="Imaging" className="w-6 h-6" /> Imaging
                                </Link>
                                <Link href="/medical_personnel/vaccination" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/vaccination.png" alt="Vaccination" className="w-6 h-6" /> Vaccination
                                </Link>
                                <Link href="/medical_personnel/dental-record" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/dental-record.png" alt="Dental Record" className="w-6 h-6" /> Dental Record
                                </Link>
                                <Link href="/medical_personnel/doctors-note" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/doctors-note.png" alt="Doctor's Note" className="w-6 h-6" /> Doctor's Note
                                </Link>
                                <Link href="/medical_personnel/security" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/lock.png" alt="Security" className="w-6 h-6" /> Security
                                </Link>
                                <Link href="/medical_personnel/activity-log" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-6 h-6" /> Activity Log
                                </Link>
                            </div>
                        </div>
                        {/* Main Section */}
                        <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full max-w-4xl">
                                <div className="font-bold text-xl mb-6">IMAGING</div>
                                <div className="flex items-center gap-4 mb-6">
                                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-semibold">
                                        <img src="/icons/calendar.png" alt="Calendar" className="w-5 h-5" /> SELECT A DATE
                                    </button>
                                    <select className="border rounded px-2 py-2">
                                        <option>Active Records</option>
                                    </select>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button className="rounded px-2 py-2 flex items-center justify-center" style={{ backgroundColor: '#0D3255' }}>
                                            <img src="/icons/add.png" alt="Add" className="w-5 h-5" style={{ filter: 'invert(1) brightness(2)' }} />
                                        </button>
                                        <input type="text" className="border rounded px-2 py-2 ml-2" placeholder="Search" />
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl shadow p-0 overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="" style={{ backgroundColor: '#0D3255', color: 'white' }}>
                                                <th className="py-3 px-6 text-left">IMAGING DATE</th>
                                                <th className="py-3 px-6 text-left">PROCEDURE</th>
                                                <th className="py-3 px-6 text-left">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>                                            <tr className="border-b">
                                                <td className="py-3 px-6 text-blue-900 font-semibold">NOVEMBER 2, 2023</td>
                                                <td className="py-3 px-6">CHEST X-RAY</td>
                                                <td className="py-3 px-6 flex gap-2">
                                                    <button className="text-white rounded p-2" style={{ backgroundColor: '#37B37E' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A9D69'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#37B37E'}>
                                                        <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                    </button>
                                                    <button className="text-white rounded p-2" style={{ backgroundColor: '#FFAB01' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E69A01'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFAB01'}>
                                                        <img src="/icons/edit-text.png" alt="Edit" className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-6 text-blue-900 font-semibold">NOVEMBER 2, 2023</td>
                                                <td className="py-3 px-6">ECG</td>
                                                <td className="py-3 px-6 flex gap-2">
                                                    <button className="text-white rounded p-2" style={{ backgroundColor: '#37B37E' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A9D69'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#37B37E'}>
                                                        <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                    </button>
                                                    <button className="text-white rounded p-2" style={{ backgroundColor: '#FFAB01' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E69A01'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFAB01'}>
                                                        <img src="/icons/edit-text.png" alt="Edit" className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
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
        </AppLayout>
    );
}
