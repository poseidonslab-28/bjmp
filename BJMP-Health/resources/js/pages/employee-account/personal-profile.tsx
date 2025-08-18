import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Correct!

export default function PersonalProfile({ employee }: { employee: any }) {
    const [isEditable, setIsEditable] = useState(false);

    const birthDate = new Date(employee.Birth_Date);
    const birthYear = birthDate.getFullYear();
    const birthMonthName = birthDate.toLocaleString('default', { month: 'long' });
    const birthDay = birthDate.getDate();

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleSave = () => {
        Inertia.put(`/employee-account/personal-profile/${employee.Emp_ID}`, formData, {
            onSuccess: () => setIsEditable(false),
        });
    };


    // Local state for the form
    const [formData, setFormData] = useState({
        First_Name: employee.First_Name,
        Last_Name: employee.Last_Name,
        Email: employee.Email,
        Contact_No: employee.Contact_No,
        Religion: employee.Religion,
        Civil_Status: employee.Civil_Status,
        isFemale: employee.isFemale,
        Birth_Place: employee.Birth_Place,
        Birth_Date: new Date(employee.Birth_Date),
        Age: employee.Age,
        Street_Address: employee.Street_Address,
        House_No: employee.House_No,
        Province: employee.Province,
        City: employee.City,
        Baranggay: employee.Baranggay,
        Position_Code: employee.Position_Code,
        Position: employee.Position,
        Office_Jail: employee.Office_Jail,
        Height: employee.Height,
        Weight: employee.Weight,
        BMI_Class: employee.BMI_Class,
        phy_classification: employee.phy_classification,
        Ph_health: employee.Ph_health,
        Contact_Person: employee.Contact_Person,
        C_P_Relationship: employee.C_P_Relationship,
        C_P_Address: employee.C_P_Address,
        C_P_Province: employee.C_P_Province || 'Bulacan',
        C_P_City: employee.C_P_City || 'Malolos',
        C_P_Barangay: employee.C_P_Barangay || 'Santo Cristo',
    });

    const handleChange = (field: string, value: string | boolean) => {
        setFormData({ ...formData, [field]: value });
    };


    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Profile', href: '/employee-account/personal-profile' }]}>
            <Head title="Personal Profile" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Profile Sidebar */}
                        <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-0 border border-gray-200">
                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                                <img
                                    src="/images/profilePic.png"
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="text-black font-semibold">{employee.First_Name} {employee.Last_Name}</div>
                            <div className="text-gray-500">{employee.Position}</div>
                            <button className="bg-blue-900 text-black px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
                            <div className="w-full flex flex-col gap-2 px-4">
                                <Link
                                    href={`/employee-account/personal-profile/${employee.Emp_ID}`}
                                    className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black"
                                >
                                    <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" />
                                    Personal Profile
                                </Link>
                                <Link
                                    href={`/employee-account/medical-history/${employee.Emp_ID}`}
                                    className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black"
                                >
                                    <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" />
                                    Medical History
                                </Link>
                                <a href="/employee-account/laboratory" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black">
                                    <img src="/icons/laboratory.png" alt="Laboratory" className="w-6 h-6 text-black" /> Laboratory
                                </a>
                                <a href="/employee-account/imaging" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black">
                                    <img src="/icons/imaging.png" alt="Imaging" className="w-6 h-6 text-black" /> Imaging
                                </a>
                                <a href="/employee-account/vaccination" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black">
                                    <img src="/icons/vaccination.png" alt="Vaccination" className="w-6 h-6 text-black" /> Vaccination
                                </a>
                                <a href="/employee-account/dental-record" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black">
                                    <img src="/icons/dental-record.png" alt="Dental Record" className="w-6 h-6 text-black" /> Dental Record
                                </a>
                                <a href="/employee-account/doctors-note" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black">
                                    <img src="/icons/doctors-note.png" alt="Doctor's Note" className="w-6 h-6 text-black" /> Doctor's Note
                                </a>
                                <Link href="/employee-account/security" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black">
                                    <img src="/icons/lock.png" alt="Security" className="w-6 h-6 text-black" /> Security
                                </Link>
                                <Link href="/employee-account/activity-log" className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100 text-black">
                                    <img src="/icons/activityLog.png" alt="Activity Log" className="w-6 h-6 text-black" /> Activity Log
                                </Link>
                            </div>
                        </div>

                        {/* Main Section */}
                        <div className="flex-1 bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="font-bold text-xl mb-6 text-black">Personal Information</div>
                            <form className="grid grid-cols-2 gap-6">
                                {/* Personal Information */}
                                {/* Personal Information */}
                                {[
                                    { label: 'First Name', key: 'First_Name', value: formData.First_Name },
                                    { label: 'Last Name', key: 'Last_Name', value: formData.Last_Name },
                                    { label: 'Email', key: 'Email', value: formData.Email },
                                    { label: 'Mobile Number', key: 'Contact_No', value: formData.Contact_No },
                                    { label: 'Religion', key: 'Religion', value: formData.Religion },
                                    { label: 'Marital Status', key: 'Civil_Status', value: formData.Civil_Status },
                                    { label: 'Gender', key: 'isFemale', value: formData.isFemale ? 'FEMALE' : 'MALE' },
                                    { label: 'Birthplace', key: 'Birth_Place', value: formData.Birth_Place },
                                    { label: 'Birth Month', key: 'birthMonth', value: birthMonthName },
                                    { label: 'Birth Day', key: 'birthDay', value: birthDay },
                                    { label: 'Birth Year', key: 'birthYear', value: birthYear },
                                    { label: 'Age', key: 'Age', value: formData.Age },
                                ].map((item, idx) => (
                                    <div key={idx}>
                                        <label className="block mb-1 font-medium text-black">{item.label}</label>
                                        <input
                                            className="w-full border rounded px-3 py-2 text-black"
                                            value={item.value}
                                            readOnly={!isEditable}
                                            onChange={e => {
                                                // For gender, convert string back to boolean
                                                const value = item.key === 'isFemale' ? e.target.value === 'FEMALE' : e.target.value;
                                                handleChange(item.key, value);
                                            }}
                                        />
                                    </div>
                                ))}


                                {/* Contact Person */}
                                <div className="col-span-2 font-bold mt-6 mb-2 text-black">Contact Person</div>
                                {[
                                    { label: 'Name', key: 'Contact_Person', value: formData.Contact_Person },
                                    { label: 'Relationship', key: 'C_P_Relationship', value: formData.C_P_Relationship },
                                    { label: 'Street Name / House No.', key: 'C_P_Address', value: formData.C_P_Address },
                                    { label: 'Province', key: 'C_P_Province', value: formData.C_P_Province || 'Bulacan' },
                                    { label: 'City', key: 'C_P_City', value: formData.C_P_City || 'Malolos' },
                                    { label: 'Barangay', key: 'C_P_Barangay', value: formData.C_P_Barangay || 'Santo Cristo' },
                                ].map((item, idx) => (
                                    <div key={idx}>
                                        <label className="block mb-1 font-medium text-black">{item.label}</label>
                                        <input
                                            className="w-full border rounded px-3 py-2 text-black"
                                            value={item.value}
                                            readOnly={!isEditable}
                                            onChange={e => handleChange(item.key, e.target.value)}
                                        />
                                    </div>
                                ))}

                            </form>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 mt-8">
                                <button
                                    className="px-6 py-2 bg-white rounded hover:bg-gray-50 transition-colors font-medium border"
                                    style={{ color: '#FFAB2E', borderColor: '#FFAB2E' }}
                                    onClick={handleEditClick}
                                >
                                    {isEditable ? 'CANCEL' : 'EDIT'}
                                </button>
                                <button
                                    className="px-6 py-2 bg-blue-900 text-black rounded hover:bg-blue-800 transition-colors font-medium"
                                    disabled={!isEditable}
                                    onClick={handleSave}
                                >
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
