import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

export default function ActivityLog() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Information', href: '/personal-information' }, { title: 'Activity Log', href: '/activity-log' }]}> 
            <Head title="Activity Log" />
            <div className="flex bg-gray-100 min-h-screen">
                {/* Main Content */}
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-6 border border-gray-200">
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                                <img
                                    src="/profile-placeholder.png"
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
                            <div className="text-center mb-8">
                                <div className="font-bold text-lg">Lowie Josh Roque</div>
                                <div className="text-gray-600">Staff Nurse</div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100"
                                    onClick={() => router.visit('/personal-information')}
                                    type="button"
                                >
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-5 h-5" /> Personal Profile
                                </button>
                                <button
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100"
                                    onClick={() => router.visit('/security')}
                                    type="button"
                                >
                                    <img src="/icons/lock.png" alt="Security" className="w-5 h-5" /> Security
                                </button>
                                <button
                                    className="w-full bg-yellow-400 text-black font-semibold py-2 rounded flex items-center justify-center gap-2"
                                    type="button"
                                >
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-5 h-5" /> Activity Log
                                </button>
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
