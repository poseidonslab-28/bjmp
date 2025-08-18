import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

export default function Security() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Information', href: '/personal-information' }, { title: 'Security', href: '/security' }]}> 
            <Head title="Security" />
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
                                    className="w-full bg-yellow-400 text-black font-semibold py-2 rounded flex items-center justify-center gap-2"
                                    type="button"
                                >
                                    <img src="/icons/lock.png" alt="Security" className="w-5 h-5" /> Security
                                
                                </button>
                                <button
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100"
                                    onClick={() => router.visit('/activity-log')}
                                    type="button"
                                >
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-5 h-5" /> Activity Log
                                </button>
                            </div>
                        </div>
                        {/* Security Form Section */}
                        <div className="flex-1 bg-white rounded-xl shadow p-10 border border-gray-200">
                            <div className="font-bold text-xl mb-6">Security Settings</div>
                            {/* Change Email Address */}
                            <div className="bg-gray-100 rounded-lg p-6 mb-8">
                                <div className="font-semibold mb-4">CHANGE EMAIL ADDRESS</div>
                                <div className="grid grid-cols-2 gap-6 mb-4">
                                    <input className="w-full border rounded px-3 py-2" value="lowiejroque@gmail.com" readOnly />
                                    <input className="w-full border rounded px-3 py-2" placeholder="New Email Address" />
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <button className="bg-yellow-400 px-4 py-1 rounded text-xs font-semibold">EDIT</button>
                                    <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold">SAVE</button>
                                </div>
                            </div>
                            {/* Change Mobile Number */}
                            <div className="bg-gray-100 rounded-lg p-6 mb-8">
                                <div className="font-semibold mb-4">CHANGE MOBILE NUMBER</div>
                                <div className="mb-4">
                                    <input className="w-full border rounded px-3 py-2" placeholder="New Mobile Number" />
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <button className="bg-yellow-400 px-4 py-1 rounded text-xs font-semibold">EDIT</button>
                                    <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold">SAVE</button>
                                </div>
                            </div>
                            {/* Change Password */}
                            <div className="bg-gray-100 rounded-lg p-6 mb-8">
                                <div className="font-semibold mb-4">CHANGE PASSWORD</div>
                                <div className="grid grid-cols-2 gap-6 items-end">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium">Current Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                className="w-full border rounded px-3 py-2 pr-12 bg-gray-100 focus:bg-white"
                                                type={showCurrent ? 'text' : 'password'}
                                                placeholder="Current Password"
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer select-none bg-transparent border-none p-0"
                                                onClick={() => setShowCurrent((v) => !v)}
                                            >
                                                <span className="material-icons">
                                                    {showCurrent ? 'visibility' : 'visibility_off'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium">Confirm Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                className="w-full border rounded px-3 py-2 pr-12 bg-gray-100 focus:bg-white"
                                                type={showConfirm ? 'text' : 'password'}
                                                placeholder="Confirm Password"
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer select-none bg-transparent border-none p-0"
                                                onClick={() => setShowConfirm((v) => !v)}
                                            >
                                                <span className="material-icons">
                                                    {showConfirm ? 'visibility' : 'visibility_off'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                                        <label className="text-sm font-medium">New Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                className="w-full border rounded px-3 py-2 pr-12 bg-gray-100 focus:bg-white"
                                                type={showNew ? 'text' : 'password'}
                                                placeholder="New Password"
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer select-none bg-transparent border-none p-0"
                                                onClick={() => setShowNew((v) => !v)}
                                            >
                                                <span className="material-icons">
                                                    {showNew ? 'visibility' : 'visibility_off'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>                                <div className="text-xs text-gray-600 mt-4">
                                    <span className="font-semibold">Password must be:</span>
                                    <ul className="list-disc ml-5">
                                        <li>At least 8 characters long</li>
                                        <li>Including at least one upper case</li>
                                        <li>Including at least one lower case</li>
                                        <li>Including at least one number</li>
                                    </ul>
                                </div>                                <div className="flex justify-between items-center mt-6">
                                    <button className="bg-black text-white px-4 py-1 rounded text-xs font-semibold">
                                        ENABLE TWO-FACTOR AUTHENTICATION
                                    </button>
                                    <div className="flex gap-2">
                                        <button className="bg-yellow-400 px-4 py-1 rounded text-xs font-semibold">
                                            EDIT
                                        </button>
                                        <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold">
                                            SAVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Save Changes Button */}
                            <div className="flex justify-end mt-6">
                                <button className="bg-yellow-400 px-4 py-1 rounded text-xs font-semibold">
                                    SAVE CHANGES
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
