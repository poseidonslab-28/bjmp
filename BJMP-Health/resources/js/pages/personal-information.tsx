import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

export default function PersonalInformation({ employee }: { employee: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Information', href: '/personal-information' }]}>
            <Head title="Personal Information" />
            <div className="flex bg-gray-100 min-h-screen">
                {/* Main Content */}
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-6 border border-gray-200">
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                                <img
                                    src="/images/profilePic.png"
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
                            <div className="text-center mb-8">
                                <div className="font-bold text-lg">{employee.First_Name}</div>
                                <div className="text-gray-600">Staff Nurse</div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    className="w-full bg-yellow-400 text-black font-semibold py-2 rounded flex items-center justify-center gap-2"
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
                                    className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100"
                                    onClick={() => router.visit('/activity-log')}
                                    type="button"
                                >
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-5 h-5" /> Activity Log
                                </button>
                            </div>
                        </div>
                        {/* Form Section */}
                        <form className="flex-1 bg-white rounded-xl shadow p-10 border border-gray-200 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            {/* Personal Information */}
                            <div className="col-span-2 font-bold text-base mb-2">Personal Information</div>
                            <div>
                                <label className="block mb-1 font-medium">First Name</label>
                                <input className="w-full border rounded px-3 py-2" value="Lowie Josh" readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Last Name</label>
                                <input className="w-full border rounded px-3 py-2" value="Roque" readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input className="w-full border rounded px-3 py-2" value="lowiejroque@gmail.com" readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Mobile Number</label>
                                <input className="w-full border rounded px-3 py-2" value="+65 9123456789" readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Religion</label>
                                <input className="w-full border rounded px-3 py-2" value="Roman Catholic" readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Marital Status</label>
                                <select className="w-full border rounded px-3 py-2 bg-white" value="Married" disabled>
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Widowed</option>
                                    <option>Separated</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Gender</label>
                                <select className="w-full border rounded px-3 py-2 bg-white" value="Male" disabled>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            {/* Birth Information */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Birth Information</div>
                            <div>
                                <label className="block mb-1 font-medium">Birthplace</label>
                                <input className="w-full border rounded px-3 py-2" value="Malolos, Bulacan" readOnly />
                            </div>
                            <div className="flex gap-2 col-span-2">
                                <div>
                                    <label className="block mb-1 font-medium">Month</label>
                                    <select className="w-full border rounded px-3 py-2 bg-white" value="January" disabled>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Day</label>
                                    <input className="w-full border rounded px-3 py-2" value="01" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Year</label>
                                    <input className="w-full border rounded px-3 py-2" value="1995" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Age</label>
                                    <input className="w-full border rounded px-3 py-2" value="30" readOnly />
                                </div>
                            </div>
                            {/* Address */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Address</div>
                            <div>
                                <label className="block mb-1 font-medium">Street Name / House No.</label>
                                <input className="w-full border rounded px-3 py-2" value="192 Estrella street" readOnly />
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <label className="block mb-1 font-medium">Province</label>
                                    <select className="w-full border rounded px-3 py-2 bg-white" value="Bulacan" disabled>
                                        <option>Bulacan</option>
                                        <option>Pampanga</option>
                                        <option>Bataan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">City</label>
                                    <select className="w-full border rounded px-3 py-2 bg-white" value="Malolos" disabled>
                                        <option>Malolos</option>
                                        <option>Meycauayan</option>
                                        <option>San Jose del Monte</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Barangay</label>
                                    <select className="w-full border rounded px-3 py-2 bg-white" value="Santo Cristo" disabled>
                                        <option>Santo Cristo</option>
                                        <option>San Pablo</option>
                                        <option>Sumapang Matanda</option>
                                    </select>
                                </div>
                            </div>
                            {/* Employee Information */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Employee Information</div>
                            <div>
                                <label className="block mb-1 font-medium">Designation</label>
                                <select className="w-full border rounded px-3 py-2 bg-white" value="Staff Nurse" disabled>
                                    <option>Staff Nurse</option>
                                    <option>Doctor</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Rank</label>
                                <select className="w-full border rounded px-3 py-2 bg-white" value="JO1" disabled>
                                    <option>JO1</option>
                                    <option>JO2</option>
                                    <option>SJO1</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Office/Jail Unit</label>
                                <select className="w-full border rounded px-3 py-2 bg-white" value="Regional Office" disabled>
                                    <option>Regional Office</option>
                                    <option>District Jail</option>
                                    <option>City Jail</option>
                                </select>
                            </div>
                            {/* Health Information */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Health Information</div>
                            <div className="flex gap-2">
                                <div>
                                    <label className="block mb-1 font-medium">Height</label>
                                    <input className="w-full border rounded px-3 py-2" value="167 cm" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Weight</label>
                                    <input className="w-full border rounded px-3 py-2" value="68kg" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">BMI Class</label>
                                    <input className="w-full border rounded px-3 py-2" value="18" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Physical</label>
                                    <input className="w-full border rounded px-3 py-2" value="0" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">PhilHealth</label>
                                    <input className="w-full border rounded px-3 py-2" value="000000000000" readOnly />
                                </div>
                            </div>
                            {/* Contact Person */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Contact Person</div>
                            <div>
                                <label className="block mb-1 font-medium">Name</label>
                                <input className="w-full border rounded px-3 py-2" value="John Patrick Soliman" readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Relationship</label>
                                <input className="w-full border rounded px-3 py-2" value="Father" readOnly />
                            </div>
                            <div>
                                    <label className="block mb-1 font-medium">Street Name / House No.</label>
                                    <input className="w-full border rounded px-3 py-2" value="192 F.Estrella st" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Province</label>
                                    <input className="w-full border rounded px-3 py-2" value="Bulacan" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">City</label>
                                    <input className="w-full border rounded px-3 py-2" value="Malolos" readOnly />
                                </div>                                <div>
                                    <label className="block mb-1 font-medium">Barangay</label>
                                    <input className="w-full border rounded px-3 py-2" value="Santo Cristo" readOnly />
                                </div>

                             {/* Action Buttons */}
                                    <div className="col-span-2 flex justify-end gap-4 mt-8">
                                    <button className="px-6 py-2 bg-white rounded hover:bg-gray-50 transition-colors font-medium border" style={{ color: '#FFAB2E', borderColor: '#FFAB2E' }}>
                                        EDIT
                                    </button>
                                    <button className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors font-medium">
                                        SAVE
                                    </button>
                                </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}