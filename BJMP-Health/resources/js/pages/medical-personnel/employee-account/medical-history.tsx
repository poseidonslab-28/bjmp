import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Middle_Name?: string;
    Last_Name: string;
    Suffix?: string;
    Position?: string;
    Full_Name?: string;
    Patient_ID?: string;
    Picture_ID?: string;
    // Add other fields as needed
}

interface MedicalHistoryData {
    Present_HC: string;
    Current_M: string;
    Smoker_Freq: string;
    Alcohol_Freq: string;
    Allergies: string;
    G: string;
    P: string;
    blood: string;
    physical: string;
    Past_HC: string;
    Family_HH: string;
    Other: string;
    Pediatric_H: string;
    Major_AI: string;
    Surgery: string;
    Serious_PI: string;
    Limitation: string;
    Med_H: string;
    Transfusion_H: string;
    Mental_P: string;
    LMP: string;
}

interface Props {
    employee: Employee;
    medicalHistory: MedicalHistoryData;
}

export default function MedicalHistory({ employee, medicalHistory }: Props) {
    // Helper functions for radio button logic
    const isSmoker = (freq: string | undefined): boolean => {
        return Boolean(freq && freq !== '' && freq !== 'No' && freq !== 'Never');
    };

    const isNonSmoker = (freq: string | undefined): boolean => {
        return Boolean(!freq || freq === '' || freq === 'No' || freq === 'Never');
    };

    const isDrinker = (freq: string | undefined): boolean => {
        return Boolean(freq && freq !== '' && freq !== 'No' && freq !== 'Never');
    };

    const isNonDrinker = (freq: string | undefined): boolean => {
        return Boolean(!freq || freq === '' || freq === 'No' || freq === 'Never');
    };
    return (
        <MedicalAppSidebarLayout breadcrumbs={[{ title: 'Medical History', href: `/medical/employee-account/medical-history/${employee.Emp_ID}` }]}> 
            <Head title="Medical History" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-0 border border-gray-200">
                            {/* Employee Profile */}
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                                <img
                                    src={employee.Picture_ID ? `/images/profiles/${employee.Picture_ID}` : "/images/profilePic.png"}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="text-center mb-2 font-bold text-lg">{employee.First_Name} {employee.Middle_Name ? employee.Middle_Name + ' ' : ''}{employee.Last_Name}</div>
                            <div className="text-center text-gray-600 mb-6">{employee.Position || 'N/A'}</div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
                            {/* Sidebar Navigation */}
                            <div className="w-full flex flex-col gap-2 px-4">
                                <Link href={`/medical/employee-account/personal-profile/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
                                </Link>
                                <Link href={`/medical/employee-account/medical-history/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
                                    <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" /> Medical History
                                </Link>
                                <Link href={`/medical/employee-account/laboratory/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/laboratory.png" alt="Laboratory" className="w-6 h-6" /> Laboratory
                                </Link>
                                <Link href={`/medical/employee-account/imaging/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/imaging.png" alt="Imaging" className="w-6 h-6" /> Imaging
                                </Link>
                                <Link href={`/medical/employee-account/vaccination/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/vaccination.png" alt="Vaccination" className="w-6 h-6" /> Vaccination
                                </Link>
                                <Link href={`/medical/employee-account/dental-record/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/dental-record.png" alt="Dental Record" className="w-6 h-6" /> Dental Record
                                </Link>
                                <Link href={`/medical/employee-account/doctors-note/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/doctors-note.png" alt="Doctor's Note" className="w-6 h-6" /> Doctor's Note
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
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={medicalHistory?.Present_HC || 'Not Available'} 
                                            readOnly 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Current Medicine/s</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={medicalHistory?.Current_M || 'None'} 
                                            readOnly 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Smoker?</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-1">
                                                <input 
                                                    type="radio" 
                                                    checked={isSmoker(medicalHistory?.Smoker_Freq)} 
                                                    readOnly 
                                                /> Yes
                                            </label>
                                            <label className="flex items-center gap-1">
                                                <input 
                                                    type="radio" 
                                                    checked={isNonSmoker(medicalHistory?.Smoker_Freq)} 
                                                    readOnly 
                                                /> No
                                            </label>
                                            {medicalHistory?.Smoker_Freq && !isNonSmoker(medicalHistory?.Smoker_Freq) && (
                                                <>
                                                    <span className="ml-4">Frequency</span>
                                                    <input 
                                                        className="border rounded px-2 py-1 ml-2" 
                                                        value={medicalHistory.Smoker_Freq} 
                                                        readOnly 
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Alcohol Drinker?</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-1">
                                                <input 
                                                    type="radio" 
                                                    checked={isDrinker(medicalHistory?.Alcohol_Freq)} 
                                                    readOnly 
                                                /> Yes
                                            </label>
                                            <label className="flex items-center gap-1">
                                                <input 
                                                    type="radio" 
                                                    checked={isNonDrinker(medicalHistory?.Alcohol_Freq)} 
                                                    readOnly 
                                                /> No
                                            </label>
                                            {medicalHistory?.Alcohol_Freq && !isNonDrinker(medicalHistory?.Alcohol_Freq) && (
                                                <>
                                                    <span className="ml-4">Frequency</span>
                                                    <input 
                                                        className="border rounded px-2 py-1 ml-2" 
                                                        value={medicalHistory.Alcohol_Freq} 
                                                        readOnly 
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Allergies</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={medicalHistory?.Allergies || 'None'} 
                                            readOnly 
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div>
                                            <label className="block mb-1 font-medium">Blood Type</label>
                                            <input 
                                                className="w-16 border rounded px-3 py-2" 
                                                value={medicalHistory?.blood || 'N/A'} 
                                                readOnly 
                                            />
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
        </MedicalAppSidebarLayout>
    );
}
