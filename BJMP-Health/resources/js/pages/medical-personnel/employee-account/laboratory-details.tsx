import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Position?: string;
    Picture_ID?: string;
    Full_Name?: string;
}

interface LabBloodCount {
    ID: number;
    Lab_ID: number;
    Hemo_SI: string;
    Hemo_TU: string;
    Herma_SI: string;
    Herma_TU: string;
    RBC_SI: string;
    RBC_TU: string;
    WBC_SI: string;
    WBC_TU: string;
    PlateLet_SI: string;
    PlateLet_TU: string;
    Lymphocytes_SI: string;
    Lymphocytes_TU: string;
    Neutrophil_SI: string;
    Neutrophil_TU: string;
    Basophil_SI: string;
    Basophil_TU: string;
    Edsinophil_SI: string;
    Edsinophil_TU: string;
}

interface LabBloodChem {
    ID: number;
    LAB_ID: number;
    FBS_SI: string;
    FBS_TU: string;
    URIC_AC_SI: string;
    URIC_AC_TU: string;
    bunSI: string;
    bunTU: string;
    TOTAL_CHO_SI: string;
    TOTAL_CHO_TU: string;
    TRYGLYCERIDES_SI: string;
    TRYGLYCERIDES_TU: string;
    HDL_SI: string;
    HDL_TU: string;
    LDL_SI: string;
    LDL_TU: string;
    VLDL_SI: string;
    VLDL_TU: string;
    SGPT_SI: string;
    SGPT_TU: string;
    SGOT_SI: string;
    SGOT_TU: string;
    SGOT: string;
    HBSAG: string;
    VDRL: string;
    ECG: string;
    CXR: string;
    DT: string;
    PT: string;
    creaSI: string;
    creaTU: string;
}

interface LabClinicMic {
    ID: number;
    LAB_ID: number;
    Urinalysis: string;
    Fecalysis: string;
}

interface Laboratory {
    ID: number;
    Emp_ID: string;
    examNo: string;
    examiNation: string;
    Lab_Date: string;
    Lab_Taker_ID: string;
    Record_ID: number;
    archived: boolean;
}

interface Props {
    employee: Employee;
    laboratory: Laboratory;
    labBloodCount?: LabBloodCount;
    labBloodChem?: LabBloodChem;
    labClinicMic?: LabClinicMic;
}

export default function LaboratoryDetails({ employee, laboratory, labBloodCount, labBloodChem, labClinicMic }: Props) {
    // Helper to display N/A for blank/null/undefined, always returns string
    const displayValue = (value: string | number | boolean | undefined | null): string => {
        if (value === null || value === undefined || value === "") return "N/A";
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return String(value);
    };
    const getFullName = () => {
        const parts = [employee?.First_Name, employee?.Middle_Name, employee?.Last_Name];
        return parts.filter(Boolean).join(' ');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <MedicalAppSidebarLayout breadcrumbs={[
            { title: 'Employee Account', href: '/medical/employee-account' },
            { title: 'Laboratory', href: `/medical/employee-account/laboratory/${employee.Emp_ID}` },
            { title: 'Results', href: '#' }
        ]}>
            <Head title="Laboratory Results" />
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
                            <div className="text-center text-gray-600 mb-6">{displayValue(employee.Position)}</div>
                            <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
                            {/* Sidebar Navigation */}
                            <div className="w-full flex flex-col gap-2 px-4">
                                <Link href={`/medical/employee-account/personal-profile/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
                                </Link>
                                <Link href={`/medical/employee-account/medical-history/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
                                    <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" /> Medical History
                                </Link>
                                <Link href={`/medical/employee-account/laboratory/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
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

                        <div className="flex-1 bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-blue-900 mb-2">
                                        {getFullName().toUpperCase()}
                                    </h1>
                                    <p className="text-gray-600">
                                        {employee?.Position || 'RJSIOC'} [ID No. {employee?.Emp_ID}]
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800">
                                        DOWNLOAD PDF
                                    </button>
                                </div>
                            </div>

                            {/* Laboratory Results */}
                            <div className="space-y-8">
                                <h2 className="text-xl font-bold text-blue-900">SUMMARY OF DIAGNOSTIC AND LABORATORY RESULTS</h2>
                                
                                <div className="text-blue-800 font-semibold">
                                    {laboratory.examiNation} - {formatDate(laboratory.Lab_Date)}
                                </div>

                                {/* Complete Blood Count */}
                                {labBloodCount && (
                                    <div className="bg-white border rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-bold text-blue-900">Complete Blood Count</h3>
                                            <div className="flex gap-4 text-sm">
                                                <span className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                    Low
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                                    Normal
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                    High
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left py-2 font-semibold">Test</th>
                                                        <th className="text-left py-2 font-semibold">SI Units Results</th>
                                                        <th className="text-left py-2 font-semibold">Traditional Units Results</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b">
                                                        <td className="py-2">Hemoglobin</td>
                                                        <td className="py-2">{labBloodCount.Hemo_SI} g/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Hemo_TU} g/L</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Hematocrit</td>
                                                        <td className="py-2">{labBloodCount.Herma_SI} g/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Herma_TU} g/L</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Red Blood Cells</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.RBC_SI} x cells/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.RBC_TU} x cells/μL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">White Blood Cells</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.WBC_SI} x 109/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.WBC_TU} /mm3</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Platelet</td>
                                                        <td className="py-2">{labBloodCount.PlateLet_SI} x 109/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.PlateLet_TU} x 10 3 μ</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Lymphocytes</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Lymphocytes_SI} x 106/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Lymphocytes_TU} %</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Neutrophil</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Neutrophil_SI} x 106/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Neutrophil_TU} %</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Basophil</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Basophil_SI} x 106/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Basophil_TU} %</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2">Eosinophil</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Edsinophil_SI} x 106/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodCount.Edsinophil_TU} %</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Blood Chemistry */}
                                {labBloodChem && (
                                    <div className="bg-white border rounded-lg p-6">
                                        <h3 className="text-lg font-bold text-blue-900 mb-4">Blood Chemistry</h3>
                                        
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left py-2 font-semibold">Test</th>
                                                        <th className="text-left py-2 font-semibold">SI Units Results</th>
                                                        <th className="text-left py-2 font-semibold">Traditional Units Results</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b">
                                                        <td className="py-2">Fasting Blood Sugar (FBS)</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.FBS_SI} mmol/L</td>
                                                        <td className="py-2">{labBloodChem.FBS_TU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Uric Acid</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.URIC_AC_SI} μmol/L</td>
                                                        <td className="py-2">{labBloodChem.URIC_AC_TU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Blood Urea Nitrogen (BUN)</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.bunSI} mmol/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.bunTU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Creatinine</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.creaSI} μmol/L</td>
                                                        <td className="py-2">{labBloodChem.creaTU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Total Cholesterol</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.TOTAL_CHO_SI} mmol/L</td>
                                                        <td className="py-2 text-red-600">{labBloodChem.TOTAL_CHO_TU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Tryglycerides</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.TRYGLYCERIDES_SI} mmol/L</td>
                                                        <td className="py-2 text-red-600">{labBloodChem.TRYGLYCERIDES_TU} g/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">HDL</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.HDL_SI} mmol/L</td>
                                                        <td className="py-2 text-red-600">{labBloodChem.HDL_TU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">LDL</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.LDL_SI} mmol/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.LDL_TU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">VLDL</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.VLDL_SI} mmol/L</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.VLDL_TU} mg/dL</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">SGPT</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.SGPT_SI} IU/L</td>
                                                        <td className="py-2 text-red-600">{labBloodChem.SGPT_TU} U/dL</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2">SGOT</td>
                                                        <td className="py-2 text-blue-600">{labBloodChem.SGOT_SI} IU/L</td>
                                                        <td className="py-2">{labBloodChem.SGOT_TU}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Additional Tests */}
                                <div className="bg-white border rounded-lg p-6">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-2 font-semibold">Test</th>
                                                    <th className="text-left py-2 font-semibold">Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2">HbsAg</td>
                                                    <td className="py-2">{labBloodChem?.HBSAG || 'Non-Reactive'}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2">VDRL</td>
                                                    <td className="py-2">{labBloodChem?.VDRL || 'Non-Reactive'}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2">Electro-Cardiogram (ECG)</td>
                                                    <td className="py-2">{labBloodChem?.ECG || 'REGULAR SINUS RHYTM'}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2">Chest X-ray (PA view)</td>
                                                    <td className="py-2">{labBloodChem?.CXR || 'NCF'}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2">Drug Test</td>
                                                    <td className="py-2">{labBloodChem?.DT || 'Negative'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">Pregnancy Test</td>
                                                    <td className="py-2">{labBloodChem?.PT || 'Not Applicable'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Clinical Microscopy */}
                                {labClinicMic && (
                                    <div className="bg-white border rounded-lg p-6">
                                        <h3 className="text-lg font-bold text-blue-900 mb-4">Clinical Microscopy</h3>
                                        
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left py-2 font-semibold">Test</th>
                                                        <th className="text-left py-2 font-semibold">Result</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b">
                                                        <td className="py-2">Urinalysis</td>
                                                        <td className="py-2">{labClinicMic.Urinalysis || 'MUCUS THREAD few'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2">Fecalysis</td>
                                                        <td className="py-2">{labClinicMic.Fecalysis || 'NIPS'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MedicalAppSidebarLayout>
    );
}
