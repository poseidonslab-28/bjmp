import React from "react";
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function DoctorsNote() {
    return (
        <AppLayout breadcrumbs={[{ title: "Doctor's Note", href: '/employee-account/doctors-note' }]}> 
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
                            <div className="text-center font-bold text-lg mb-2">JOHN PATRICK SOLIMAN</div>
                            <div className="text-center text-gray-600 mb-6">Staff Nurse</div>
                            {/* Sidebar Navigation */}
                            <div className="w-full flex flex-col gap-2 px-4">
                                <Link href="/employee-account/personal-profile" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
                                </Link>
                                <Link href="/employee-account/medical-history" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" /> Medical History
                                </Link>
                                <Link href="/employee-account/laboratory" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/laboratory.png" alt="Laboratory" className="w-6 h-6" /> Laboratory
                                </Link>
                                <Link href="/employee-account/imaging" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/imaging.png" alt="Imaging" className="w-6 h-6" /> Imaging
                                </Link>
                                <Link href="/employee-account/vaccination" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/vaccination.png" alt="Vaccination" className="w-6 h-6" /> Vaccination
                                </Link>
                                <Link href="/employee-account/dental-record" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/dental-record.png" alt="Dental Record" className="w-6 h-6" /> Dental Record
                                </Link>
                                <Link href="/employee-account/doctors-note" className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
                                    <img src="/icons/doctors-note.png" alt="Doctor's Note" className="w-6 h-6" /> Doctor's Note
                                </Link>
                                <Link href="/employee-account/security" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/lock.png" alt="Security" className="w-6 h-6" /> Security
                                </Link>
                                <Link href="/employee-account/activity-log" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-6 h-6" /> Activity Log
                                </Link>
                            </div>
                        </div>
                        {/* Main Section */}                        <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full max-w-4xl">
                                <button className="flex items-center gap-2 mb-4 px-4 py-1 rounded bg-gray-100 text-black font-semibold text-sm">
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
                                        <button className="bg-[#FFAB2ECC] text-white font-semibold px-6 py-2 rounded flex items-center gap-2">
                                            <img src="/icons/edit-text.png" alt="Edit" className="w-4 h-4" /> EDIT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
