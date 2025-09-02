import React, { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';

export default function ActivityLog() {
    const { activities = [], employee } = usePage().props as any;

    const props = usePage().props;

    console.log("All Inertia props:", props); // ✅ Logs everything
    console.log("Flash messages:", (props as any).flash || {}); // Only flash messagesÍ


    useEffect(() => {
        console.log('Fetched activities:', activities);
    }, [activities]);
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Personal Information', href: '/personal-information' },
                { title: 'Activity Log', href: '/activity-log' },
            ]}
        >
            <Head title="Activity Log" />
            <div className="flex bg-gray-100 min-h-screen">
                {/* Main Content */}
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-6 border border-gray-200">
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4 text-black">
                                <img
                                    src={employee?.Picture_ID || '/profile-placeholder.png'}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4 text-black">
                                UPLOAD PHOTO
                            </button>
                            <div className="text-center mb-8 text-black">
                                <div className="font-bold text-lg">{employee?.First_Name} {employee?.Last_Name}</div>
                                <div className="text-gray-600">{employee?.Position}</div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100"
                                    onClick={() => router.visit('/personal-information')}
                                    type="button"
                                >
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-5 h-5 text-black" /> Personal Profile
                                </button>
                                <button
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 text-black"
                                    onClick={() => router.visit('/security')}
                                    type="button"
                                >
                                    <img src="/icons/lock.png" alt="Security" className="w-5 h-5" /> Security
                                </button>
                                <button
                                    className="w-full bg-yellow-400 text-black font-semibold py-2 rounded flex items-center justify-center gap-2 text-black"
                                    type="button"
                                >
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-5 h-5" /> Activity Log
                                </button>
                            </div>
                        </div>

                        {/* Activity Log Section */}
                        <div className="flex-1 bg-white rounded-xl shadow p-10 border border-gray-200 flex flex-col">
                            <div className="font-bold text-2xl mb-8 text-black">ACTIVITY LOG</div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left px-4 py-2 font-semibold text-black">DATE AND TIME</th>
                                            <th className="text-left px-4 py-2 font-semibold text-black">ACTIVITIES</th>
                                            <th className="text-left px-4 py-2 font-semibold text-black">DESCRIPTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activities.length ? (
                                            activities.map((activity: any) => (
                                                <tr key={activity.ID} className="border-b">
                                                    <td className="px-4 py-2 text-black">{activity.date} {activity.time}</td>
                                                    <td className="px-4 py-2 text-black">{activity.Activity.split(' ')[0]}</td>
                                                    <td className="px-4 py-2 text-black">{activity.Activity}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                                                    No activities found.
                                                </td>
                                            </tr>
                                        )}
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
