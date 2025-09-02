import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';

export default function Security() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingMobile, setIsEditingMobile] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);


    const props = usePage().props;

    console.log("All Inertia props:", props); // ✅ Logs everything
    console.log("Flash messages:", (props as any).flash || {}); // Only flash messages

    // You can also destructure
    const { employee, flash } = props as any;
    console.log("Employee data:", employee);
    console.log("Flash data:", flash || {});

    const [newEmail, setNewEmail] = useState(employee.email || '');
    const [newMobile, setNewMobile] = useState(employee.contact_no || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const updateEmail = () => {
        router.post('/security/update-email', { email: newEmail });
    };

    const updateMobile = () => {
        router.post('/security/update-mobile', { mobile_number: newMobile });
    };

    const updatePassword = () => {
        router.post('/security/update-password', {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        });
    };


    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Personal Information', href: '/personal-information' },
                { title: 'Security', href: '/security' },
            ]}
        >
            <Head title="Security" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-6 border border-gray-200">
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                                <img
                                    src={employee?.Picture_ID || '/profile-placeholder.png'}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">
                                UPLOAD PHOTO
                            </button>
                            <div className="text-center mb-8">
                                <div className="font-bold text-lg text-black">
                                    {employee?.First_Name} {employee?.Last_Name}
                                </div>
                                <div className="text-gray-600 text-black">{employee?.Position}</div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 text-black"
                                    onClick={() => router.visit('/personal-information')}
                                    type="button"
                                >
                                    <img
                                        src="/icons/personalProfile.png"
                                        alt="Personal Profile"
                                        className="w-5 h-5"
                                    />{' '}
                                    Personal Profile
                                </button>
                                <button
                                    className="w-full bg-yellow-400 text-black font-semibold py-2 rounded flex items-center justify-center gap-2 text-black"
                                    type="button"
                                >
                                    <img src="/icons/lock.png" alt="Security" className="w-5 h-5" /> Security
                                </button>
                                <button
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 text-black"
                                    onClick={() => router.visit('/activity-log')}
                                    type="button"
                                >
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-5 h-5" /> Activity Log
                                </button>
                            </div>
                        </div>

                        {/* Security Form Section */}
                        <div className="flex-1 bg-white rounded-xl shadow p-10 border border-gray-200">
                            <div className="font-bold text-xl mb-6 text-black">Security Settings</div>

                            {/* --- CHANGE EMAIL --- */}
                            <div className="bg-gray-100 rounded-lg p-6 mb-8">
                                <div className="font-semibold mb-4 text-black">CHANGE EMAIL ADDRESS</div>
                                <input
                                    className={`w-full border rounded px-3 py-2 mb-4 text-black ${isEditingEmail ? 'bg-white' : 'bg-gray-100'}`}
                                    value={newEmail}
                                    readOnly={!isEditingEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="New Email Address"
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        className={`px-4 py-1 rounded text-xs font-semibold ${isEditingEmail ? 'bg-green-400 text-white' : 'bg-yellow-400 text-black'}`}
                                        onClick={() => setIsEditingEmail(true)}
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold"
                                        onClick={() => { updateEmail(); setIsEditingEmail(false); }}
                                        disabled={!isEditingEmail}
                                    >
                                        SAVE
                                    </button>
                                </div>
                            </div>

                            {/* --- CHANGE MOBILE --- */}
                            <div className="bg-gray-100 rounded-lg p-6 mb-8">
                                <div className="font-semibold mb-4 text-black">CHANGE MOBILE NUMBER</div>
                                <input
                                    className={`w-full border rounded px-3 py-2 mb-4 text-black ${isEditingMobile ? 'bg-white' : 'bg-gray-100'}`}
                                    value={newMobile}
                                    readOnly={!isEditingMobile}
                                    onChange={(e) => setNewMobile(e.target.value)}
                                    placeholder="New Mobile Number"
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        className={`px-4 py-1 rounded text-xs font-semibold ${isEditingMobile ? 'bg-green-400 text-white' : 'bg-yellow-400 text-black'}`}
                                        onClick={() => setIsEditingMobile(true)}
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold"
                                        onClick={() => { updateMobile(); setIsEditingMobile(false); }}
                                        disabled={!isEditingMobile}
                                    >
                                        SAVE
                                    </button>
                                </div>
                            </div>

                            {/* --- CHANGE PASSWORD --- */}
                            <div className="bg-gray-100 rounded-lg p-6 mb-8">
                                <div className="font-semibold mb-4 text-black">CHANGE PASSWORD</div>
                                <div className="grid grid-cols-2 gap-6 items-end">
                                    {/* Current Password */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-black">Current Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                className={`w-full border rounded px-3 py-2 pr-12 ${isEditingPassword ? 'bg-white' : 'bg-gray-100'} text-black`}
                                                type={showCurrent ? 'text' : 'password'}
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                placeholder="Current Password"
                                                readOnly={!isEditingPassword}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowCurrent(!showCurrent)}
                                            >
                                                <span className="material-icons">{showCurrent ? 'visibility' : 'visibility_off'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-black">New Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                className={`w-full border rounded px-3 py-2 pr-12 ${isEditingPassword ? 'bg-white' : 'bg-gray-100'} text-black`}
                                                type={showNew ? 'text' : 'password'}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="New Password"
                                                readOnly={!isEditingPassword}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowNew(!showNew)}
                                            >
                                                <span className="material-icons">{showNew ? 'visibility' : 'visibility_off'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-black">Confirm Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                className={`w-full border rounded px-3 py-2 pr-12 ${isEditingPassword ? 'bg-white' : 'bg-gray-100'} text-black`}
                                                type={showConfirm ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm Password"
                                                readOnly={!isEditingPassword}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                            >
                                                <span className="material-icons">{showConfirm ? 'visibility' : 'visibility_off'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 justify-end mt-4">
                                    <button
                                        className={`px-4 py-1 rounded text-xs font-semibold ${isEditingPassword ? 'bg-green-400 text-white' : 'bg-yellow-400 text-black'}`}
                                        onClick={() => setIsEditingPassword(true)}
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold"
                                        onClick={() => { updatePassword(); setIsEditingPassword(false); }}
                                        disabled={!isEditingPassword}
                                    >
                                        SAVE
                                    </button>
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
