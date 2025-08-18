import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Middle_Name?: string;
    Last_Name: string;
    Suffix?: string;
    isFemale?: boolean;
    isAdmin?: boolean;
    isMedEmp?: boolean;
    Picture_ID?: string;
    City?: string;
    Baranggay?: string;
    Street_Address?: string;
    House_No?: string;
    Province?: string;
    Zip_Code?: string;
    Age?: number;
    Birth_Date?: string;
    Birth_Place?: string;
    Religion?: string;
    Civil_Status?: string;
    Contact_No?: string;
    Office_Jail?: string;
    Email?: string;
    Contact_Person?: string;
    C_P_Address?: string;
    C_P_Relationship?: string;
    C_P_Contact?: string;
    Height?: string;
    Weight?: string;
    BMI?: string;
    BMI_Class?: string;
    Phy_classification?: string;
    Allergies?: string;
    Ph_health?: string;
    Blood_Type?: string;
    isActive?: boolean;
    Position_Code?: string;
    Position?: string;
    lastPassword?: string;
    lastEmail?: string;
    verified?: boolean;
    has_agreed_to_policy?: boolean;
    Full_Name?: string;
    Address?: string;
    Bmi_Status?: string;
}

interface Props {
    employee: Employee;
}

export default function PersonalProfile({ employee }: Props) {
    // Helper to display N/A for blank/null/undefined, always returns string
    const displayValue = (value: string | number | boolean | undefined | null): string => {
        if (value === null || value === undefined || value === "") return "N/A";
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return String(value);
    };

    // Special for gender
    const displayGender = (isFemale: boolean | undefined) => {
        if (isFemale === undefined || isFemale === null) return "N/A";
        return isFemale ? "Female" : "Male";
    };

    // Special for birth date
    const displayBirthDate = (date: string | undefined) => {
        if (!date) return "N/A";
        const d = new Date(date);
        if (isNaN(d.getTime())) return "N/A";
        return d.toISOString().slice(0, 10);
    };

    return (
        <MedicalAppSidebarLayout breadcrumbs={[{ title: 'Personal Profile', href: '/medical/personal-profile' }]}> 
            <Head title="Personal Profile" />
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
                                <Link href={`/medical/employee-account/personal-profile/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
                                </Link>
                                <Link href={`/medical/employee-account/medical-history/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
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
                        <div className="flex-1 bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="font-bold text-xl mb-6">Personal Information</div>
                            <form className="grid grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div>
                                    <label className="block mb-1 font-medium">Employee ID</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Emp_ID)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Full Name</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Full_Name)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">First Name</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.First_Name)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Middle Name</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Middle_Name)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Last Name</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Last_Name)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Suffix</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Suffix)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Gender</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayGender(employee.isFemale)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Birth Date</label>
                                    <input
                                        className="w-full border rounded px-3 py-2 bg-gray-200"
                                        value={displayBirthDate(employee.Birth_Date)}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Birth Place</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Birth_Place)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Age</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Age)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Religion</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Religion)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Civil Status</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Civil_Status)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Email)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Contact Number</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Contact_No)} readOnly />
                                </div>
                                {/* Address */}
                                <div className="col-span-2 font-bold mt-6 mb-2">Address</div>
                                <div>
                                    <label className="block mb-1 font-medium">Full Address</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Address)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">House No.</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.House_No)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Street</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Street_Address)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Barangay</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Baranggay)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">City</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.City)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Province</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Province)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Zip Code</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Zip_Code)} readOnly />
                                </div>
                                {/* Employment Information */}
                                <div className="col-span-2 font-bold mt-6 mb-2">Employment Information</div>
                                <div>
                                    <label className="block mb-1 font-medium">Position</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Position)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Rank (Position Code)</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Position_Code)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Office/Jail Unit</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Office_Jail)} readOnly />
                                </div>
                                {/* Health Information */}
                                <div className="col-span-2 font-bold mt-6 mb-2">Health Information</div>
                                <div>
                                    <label className="block mb-1 font-medium">Height (cm)</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Height)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Weight (kg)</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Weight)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">BMI</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.BMI)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">BMI Class</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.BMI_Class)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Physical Classification</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Phy_classification)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Blood Type</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Blood_Type)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Allergies</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Allergies)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">PhilHealth</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Ph_health)} readOnly />
                                </div>
                                {/* Contact Person */}
                                <div className="col-span-2 font-bold mt-6 mb-2">Contact Person</div>
                                <div>
                                    <label className="block mb-1 font-medium">Name</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.Contact_Person)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Relationship</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.C_P_Relationship)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Contact Number</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.C_P_Contact)} readOnly />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Address</label>
                                    <input className="w-full border rounded px-3 py-2 bg-gray-200" value={displayValue(employee.C_P_Address)} readOnly />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MedicalAppSidebarLayout>
    );
}
