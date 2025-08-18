import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function ActivityLog() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Activity Log', href: '/medical_personnel/activity-log' }]}> 
            <Head title="Activity Log" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-0 border border-gray-200">
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
                                <Link href="/medical_personnel/imaging" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
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
                                <Link href="/medical_personnel/activity-log" className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-6 h-6" /> Activity Log
                                </Link>
                            </div>
                        </div>
                        {/* Activity Log Section */}
                        <div className="flex-1 bg-white rounded-xl shadow p-10 border border-gray-200 flex flex-col">
                            <div className="font-bold text-2xl mb-8">ACTIVITY LOG</div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left px-4 py-2 font-semibold">DATE AND TIME</th>
                                            <th className="text-left px-4 py-2 font-semibold">ACTIVITIES</th>
                                            <th className="text-left px-4 py-2 font-semibold">DESCRIPTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="px-4 py-2">03-14-25 1:10 PM</td>
                                            <td className="px-4 py-2">EDIT</td>
                                            <td className="px-4 py-2">CHANGE EMAIL</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-2">03-14-25 1:28 PM</td>
                                            <td className="px-4 py-2">EDIT</td>
                                            <td className="px-4 py-2">CHANGE PROFILE PICTURE</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-2">03-04-25 4:54 PM</td>
                                            <td className="px-4 py-2">DOWNLOAD</td>
                                            <td className="px-4 py-2">DOWNLOAD ECG IMAGING RESULT</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2">03-01-25 10:03 AM</td>
                                            <td className="px-4 py-2">EDIT</td>
                                            <td className="px-4 py-2">CHANGE PASSWORD</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
