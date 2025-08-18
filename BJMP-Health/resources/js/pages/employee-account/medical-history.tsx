import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function MedicalHistory({ employee }: { employee: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Medical History', href: '/employee-account/medical-history' }]}>
            <Head title="Medical History" />
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
                                <Link
                                    href={`/employee-account/personal-profile/${employee.Emp_ID}`}
                                    className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100"
                                >
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" />
                                    Personal Profile
                                </Link>

                                <Link href="/employee-account/medical-history" className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
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
                                <Link href="/employee-account/doctors-note" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
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
                        {/* Main Section */}
                        <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full max-w-4xl">
                                <div className="font-bold text-xl mb-6">Medical History</div>
                                <form className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-1 font-medium">Present Health Condition</label>
                                        <input className="w-full border rounded px-3 py-2" value="Essentially Well Adult" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Current Medicine/s</label>
                                        <input className="w-full border rounded px-3 py-2" value="Amlodipine 5mg" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Smoker?</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-1">
                                                <input type="radio" checked readOnly /> Yes
                                            </label>
                                            <label className="flex items-center gap-1">
                                                <input type="radio" readOnly /> No
                                            </label>
                                            <span className="ml-4">Frequency</span>
                                            <select className="border rounded px-2 py-1 ml-2" value="Often" disabled>
                                                <option>Often</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Alcohol Drinker?</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-1">
                                                <input type="radio" checked readOnly /> Yes
                                            </label>
                                            <label className="flex items-center gap-1">
                                                <input type="radio" readOnly /> No
                                            </label>
                                            <span className="ml-4">Frequency</span>
                                            <select className="border rounded px-2 py-1 ml-2" value="Once a month" disabled>
                                                <option>Once a month</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Allergies</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div className="flex gap-2">
                                        <div>
                                            <label className="block mb-1 font-medium">G</label>
                                            <input className="w-16 border rounded px-3 py-2" value="O+" readOnly />
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">P</label>
                                            <input className="w-16 border rounded px-3 py-2" value="2" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-1 font-medium">LMP</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block mb-1 text-sm">Month</label>
                                                <select className="w-full border rounded px-2 py-1" value="February" disabled>
                                                    <option>February</option>
                                                </select>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block mb-1 text-sm">Day</label>
                                                <select className="w-full border rounded px-2 py-1" value="14" disabled>
                                                    <option>14</option>
                                                </select>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block mb-1 text-sm">Year</label>
                                                <select className="w-full border rounded px-2 py-1" value="2024" disabled>
                                                    <option>2024</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-1 font-medium">Past Medical History</label>
                                        <input className="w-full border rounded px-3 py-2" value="Flu" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Major Adult Illness</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Surgery / Prev. Hospitalization</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Serious Physical History</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Limitation in ROM & Activities</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Medication History</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">History of Transfusion / Reaction</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Mental & Emotional Problem</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Pediatric History</label>
                                        <input className="w-full border rounded px-3 py-2" value="None" readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Physical Classification</label>
                                        <input className="w-full border rounded px-3 py-2" value="Class B1" readOnly />
                                    </div>
                                    {/* Family Health History Section */}
                                    <div className="col-span-2">
                                        <div className="font-bold text-lg mb-4">Family Health History</div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" checked readOnly />
                                                    <span>Hypertension</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" readOnly />
                                                    <span>Heart Attack</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" readOnly />
                                                    <span>Diabetes</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" readOnly />
                                                    <span>Kidney Disease</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" readOnly />
                                                    <span>Stroke</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" readOnly />
                                                    <span>Cancer</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" readOnly />
                                                    <span>Asthma</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" readOnly />
                                                    <span>Others: _______________</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* Action Buttons */}
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
            </div>
        </AppLayout>
    );
}