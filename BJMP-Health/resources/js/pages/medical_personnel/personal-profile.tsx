import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function PersonalProfile() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Profile', href: '/medical_personnel/personal-profile' }]}> 
            <Head title="Personal Profile" />
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
                            <div className="text-center mb-2 font-bold text-lg">JOHNJOHN PATRICK SOLIMAN</div>
                            <div className="text-center text-gray-600 mb-6">Staff Nurse</div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
                            {/* Sidebar Navigation */}
                            <div className="w-full flex flex-col gap-2 px-4">
                                <a href="/medical_personnel/personal-profile" className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
                                </a>
                                <a href="/medical_personnel/medical-history" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" /> Medical History
                                </a>
                                <a href="/medical_personnel/laboratory" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/laboratory.png" alt="Laboratory" className="w-6 h-6" /> Laboratory
                                </a>
                                <a href="/medical_personnel/imaging" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/imaging.png" alt="Imaging" className="w-6 h-6" /> Imaging
                                </a>
                                <a href="/medical_personnel/vaccination" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/vaccination.png" alt="Vaccination" className="w-6 h-6" /> Vaccination
                                </a>
                                <a href="/medical_personnel/dental-record" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/dental-record.png" alt="Dental Record" className="w-6 h-6" /> Dental Record
                                </a>
                                <a href="/medical_personnel/doctors-note" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/doctors-note.png" alt="Doctor's Note" className="w-6 h-6" /> Doctor's Note
                                </a>
                                <Link href="/medical_personnel/security" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/lock.png" alt="Security" className="w-6 h-6" /> Security
                                </Link>
                                <Link href="/medical_personnel/activity-log" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-6 h-6" /> Activity Log
                                </Link>
                            </div>
                        </div>
                        {/* Main Section */}
                        <div className="flex-1 bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="font-bold text-xl mb-6">Personal Information</div>
                            <form className="grid grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div>
                                    <label className="block mb-1 font-medium">First Name</label>
                                    <input className="w-full border rounded px-3 py-2" value="JOHNJOHN Patrick" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Last Name</label>
                                    <input className="w-full border rounded px-3 py-2" value="Soliman" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input className="w-full border rounded px-3 py-2" value="jpsoliman@gmail.com" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Mobile Number</label>
                                    <input className="w-full border rounded px-3 py-2" value="9123456789" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Religion</label>
                                    <input className="w-full border rounded px-3 py-2" value="Roman Catholic" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Marital Status</label>
                                    <input className="w-full border rounded px-3 py-2" value="Married" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Gender</label>
                                    <input className="w-full border rounded px-3 py-2" value="Male" readOnly />
                                </div>
                                {/* Birth Information */}
                                <div>
                                    <label className="block mb-1 font-medium">Birthplace</label>
                                    <input className="w-full border rounded px-3 py-2" value="Malolos, Bulacan" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Birth Month</label>
                                    <input className="w-full border rounded px-3 py-2" value="January" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Birth Day</label>
                                    <input className="w-full border rounded px-3 py-2" value="01" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Birth Year</label>
                                    <input className="w-full border rounded px-3 py-2" value="1995" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Age</label>
                                    <input className="w-full border rounded px-3 py-2" value="30" readOnly />
                                </div>
                                {/* Address */}
                                <div>
                                    <label className="block mb-1 font-medium">Street Name / House No.</label>
                                    <input className="w-full border rounded px-3 py-2" value="192 F.Estrella street" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Province</label>
                                    <input className="w-full border rounded px-3 py-2" value="Bulacan" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">City</label>
                                    <input className="w-full border rounded px-3 py-2" value="Malolos" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Barangay</label>
                                    <input className="w-full border rounded px-3 py-2" value="Santa Cristo" readOnly />
                                </div>
                                {/* Employee Information */}
                                <div>
                                    <label className="block mb-1 font-medium">Designation</label>
                                    <input className="w-full border rounded px-3 py-2" value="Staff Nurse" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Rank</label>
                                    <input className="w-full border rounded px-3 py-2" value="JO1" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Office/Jail Unit</label>
                                    <input className="w-full border rounded px-3 py-2" value="Regional Office" readOnly />
                                </div>
                                {/* Health Information */}
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
                                {/* Contact Person */}
                                <div className="col-span-2 font-bold mt-6 mb-2">Contact Person</div>
                                <div>
                                    <label className="block mb-1 font-medium">Name</label>
                                    <input className="w-full border rounded px-3 py-2" value="Abbygaille Las Pinas" readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Relationship</label>
                                    <input className="w-full border rounded px-3 py-2" value="Mother" readOnly />
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
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Barangay</label>
                                    <input className="w-full border rounded px-3 py-2" value="Santo Cristo" readOnly />
                                </div>
                            </form>

                            <div className="flex justify-end gap-4 mt-8">
                                    <button className="px-6 py-2 bg-white rounded hover:bg-gray-50 transition-colors font-medium border" style={{ color: '#FFAB2E', borderColor: '#FFAB2E' }}>
                                        EDIT
                                    </button>
                                    <button className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors font-medium">
                                        SAVE
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
