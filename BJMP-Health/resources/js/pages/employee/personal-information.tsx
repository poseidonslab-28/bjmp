import EmployeeAppSidebarLayout from '../../layouts/app/employee-app-sidebar-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Suffix?: string;
    Email?: string;
    Contact_No?: string;
    Religion?: string;
    Civil_Status?: string;
    isFemale?: number;
    Birth_Place?: string;
    Birth_Date?: string;
    Age?: number;
    Street_Address?: string;
    House_No?: string;
    Province?: string;
    City?: string;
    Baranggay?: string;
    Position?: string;
    Position_Code?: string;
    Office_Jail?: string;
    Height?: number;
    Weight?: number;
    BMI?: number;
    BMI_Class?: string;
    Phy_classification?: string;
    Ph_health?: string;
    Allergies?: string;
    Blood_Type?: string;
    Contact_Person?: string;
    C_P_Relationship?: string;
    C_P_Address?: string;
    C_P_Contact?: string;
    isActive?: number;
    Picture_ID?: string;
}

interface Props {
    user: Employee;
}

export default function PersonalProfile({ user }: Props) {
    // Debug: Log the user data to see what's being received
    console.log('Personal Information - User data received:', user);
    
    // State for editing mode
    const [isEditing, setIsEditing] = useState(false);
    
    // Form state using Inertia's useForm
    const { data, setData, put, processing } = useForm({
        First_Name: user?.First_Name || '',
        Last_Name: user?.Last_Name || '',
        Middle_Name: user?.Middle_Name || '',
        Email: user?.Email || '',
        Contact_No: user?.Contact_No || '',
        Religion: user?.Religion || '',
        Civil_Status: user?.Civil_Status || '',
        isFemale: user?.isFemale || 0,
        Birth_Place: user?.Birth_Place || '',
        Birth_Date: user?.Birth_Date || '',
        Age: user?.Age || '',
        Street_Address: user?.Street_Address || '',
        House_No: user?.House_No || '',
        Province: user?.Province || '',
        City: user?.City || '',
        Baranggay: user?.Baranggay || '',
        Position: user?.Position || '',
        Position_Code: user?.Position_Code || '',
        Office_Jail: user?.Office_Jail || '',
        Height: user?.Height || '',
        Weight: user?.Weight || '',
        BMI_Class: user?.BMI_Class || '',
        Phy_classification: user?.Phy_classification || '',
        Ph_health: user?.Ph_health || '',
        Allergies: user?.Allergies || '',
        Blood_Type: user?.Blood_Type || '',
        Contact_Person: user?.Contact_Person || '',
        C_P_Relationship: user?.C_P_Relationship || '',
        C_P_Address: user?.C_P_Address || '',
        C_P_Contact: user?.C_P_Contact || '',
    });

    // Handle edit button click
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Handle save button click
    const handleSave = () => {
        put('/employee/personal-information', {
            onSuccess: () => {
                setIsEditing(false);
                alert('Personal information updated successfully!');
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
                alert('Failed to update personal information. Please try again.');
            }
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setData({
            First_Name: user?.First_Name || '',
            Last_Name: user?.Last_Name || '',
            Middle_Name: user?.Middle_Name || '',
            Email: user?.Email || '',
            Contact_No: user?.Contact_No || '',
            Religion: user?.Religion || '',
            Civil_Status: user?.Civil_Status || '',
            isFemale: user?.isFemale || 0,
            Birth_Place: user?.Birth_Place || '',
            Birth_Date: user?.Birth_Date || '',
            Age: user?.Age || '',
            Street_Address: user?.Street_Address || '',
            House_No: user?.House_No || '',
            Province: user?.Province || '',
            City: user?.City || '',
            Baranggay: user?.Baranggay || '',
            Position: user?.Position || '',
            Position_Code: user?.Position_Code || '',
            Office_Jail: user?.Office_Jail || '',
            Height: user?.Height || '',
            Weight: user?.Weight || '',
            BMI_Class: user?.BMI_Class || '',
            Phy_classification: user?.Phy_classification || '',
            Ph_health: user?.Ph_health || '',
            Allergies: user?.Allergies || '',
            Blood_Type: user?.Blood_Type || '',
            Contact_Person: user?.Contact_Person || '',
            C_P_Relationship: user?.C_P_Relationship || '',
            C_P_Address: user?.C_P_Address || '',
            C_P_Contact: user?.C_P_Contact || '',
        });
    };
    
    const getFullName = () => {
        const parts = [data.First_Name, data.Middle_Name, data.Last_Name];
        return parts.filter(Boolean).join(' ');
    };

    const getGender = () => {
        return data.isFemale === 1 ? 'Female' : 'Male';
    };

    const formatBirthDate = (birthDate?: string) => {
        if (!birthDate) return { month: '', day: '', year: '' };
        const date = new Date(birthDate);
        return {
            month: date.toLocaleString('default', { month: 'long' }),
            day: date.getDate().toString().padStart(2, '0'),
            year: date.getFullYear().toString()
        };
    };

    const birthInfo = formatBirthDate(data.Birth_Date);

    const getFullAddress = () => {
        const parts = [data.House_No, data.Street_Address];
        return parts.filter(Boolean).join(' ');
    };
    return (
        <EmployeeAppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/employee/dashboard' },
            { title: 'Personal Information', href: '/employee/personal-information' }
        ]}>
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
                                <div className="text-center mb-2 font-bold text-lg">{getFullName()}</div>
                                <div className="text-center text-gray-600 mb-6">{user?.Position || 'Employee'}</div>
                                <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4 cursor-pointer">UPLOAD PHOTO</button>
                                
                            </div>
                            {/* Main Section */}
                            <div className="flex-1 bg-white rounded-xl shadow p-8 border border-gray-200">
                                <div className="font-bold text-xl mb-6">Personal Information</div>
                                <form className="grid grid-cols-2 gap-6">
                                    {/* Personal Information */}
                                    <div>
                                        <label className="block mb-1 font-medium">First Name</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.First_Name} 
                                            onChange={(e) => setData('First_Name', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Last Name</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Last_Name} 
                                            onChange={(e) => setData('Last_Name', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Email</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Email} 
                                            onChange={(e) => setData('Email', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Mobile Number</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Contact_No} 
                                            onChange={(e) => setData('Contact_No', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Religion</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Religion} 
                                            onChange={(e) => setData('Religion', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Marital Status</label>
                                        {isEditing ? (
                                            <select 
                                                className="w-full border rounded px-3 py-2" 
                                                value={data.Civil_Status} 
                                                onChange={(e) => setData('Civil_Status', e.target.value)}
                                            >
                                                <option value="">Select Marital Status</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                                <option value="Separated">Separated</option>
                                            </select>
                                        ) : (
                                            <input 
                                                className="w-full border rounded px-3 py-2" 
                                                value={data.Civil_Status} 
                                                readOnly 
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Gender</label>
                                        {isEditing ? (
                                            <select 
                                                className="w-full border rounded px-3 py-2" 
                                                value={data.isFemale?.toString() || '0'} 
                                                onChange={(e) => setData('isFemale', parseInt(e.target.value))}
                                            >
                                                <option value="0">Male</option>
                                                <option value="1">Female</option>
                                            </select>
                                        ) : (
                                            <input className="w-full border rounded px-3 py-2" value={getGender()} readOnly />
                                        )}
                                    </div>
                                    {/* Birth Information */}
                                    <div>
                                        <label className="block mb-1 font-medium">Birthplace</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Birth_Place} 
                                            onChange={(e) => setData('Birth_Place', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Birth Month</label>
                                        <input className="w-full border rounded px-3 py-2" value={birthInfo.month} readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Birth Day</label>
                                        <input className="w-full border rounded px-3 py-2" value={birthInfo.day} readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Birth Year</label>
                                        <input className="w-full border rounded px-3 py-2" value={birthInfo.year} readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Age</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Age?.toString() || ''} 
                                            onChange={(e) => setData('Age', parseInt(e.target.value) || '')}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    {/* Address */}
                                    <div>
                                        <label className="block mb-1 font-medium">Street Name / House No.</label>
                                        <input className="w-full border rounded px-3 py-2" value={getFullAddress()} readOnly />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Province</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Province} 
                                            onChange={(e) => setData('Province', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">City</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.City} 
                                            onChange={(e) => setData('City', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Barangay</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Baranggay} 
                                            onChange={(e) => setData('Baranggay', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    {/* Employee Information */}
                                    <div>
                                        <label className="block mb-1 font-medium">Designation</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Position} 
                                            onChange={(e) => setData('Position', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Rank</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Position_Code} 
                                            onChange={(e) => setData('Position_Code', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Office/Jail Unit</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Office_Jail} 
                                            onChange={(e) => setData('Office_Jail', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    {/* Health Information */}
                                    <div>
                                        <label className="block mb-1 font-medium">Height</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Height?.toString() || ''} 
                                            onChange={(e) => setData('Height', parseFloat(e.target.value) || '')}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Weight</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Weight?.toString() || ''} 
                                            onChange={(e) => setData('Weight', parseFloat(e.target.value) || '')}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">BMI Class</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.BMI_Class} 
                                            onChange={(e) => setData('BMI_Class', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Physical Classification</label>
                                        {isEditing ? (
                                            <select 
                                                className="w-full border rounded px-3 py-2" 
                                                value={data.Phy_classification} 
                                                onChange={(e) => setData('Phy_classification', e.target.value)}
                                            >
                                                <option value="">Select Physical Classification</option>
                                                <option value="N/A">N/A</option>
                                                <option value="A">A</option>
                                                <option value="B1">B1</option>
                                                <option value="B2">B2</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="X">X</option>
                                            </select>
                                        ) : (
                                            <input 
                                                className="w-full border rounded px-3 py-2" 
                                                value={data.Phy_classification} 
                                                readOnly 
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">PhilHealth</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Ph_health} 
                                            onChange={(e) => setData('Ph_health', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    {/* Contact Person */}
                                    <div className="col-span-2 font-bold mt-6 mb-2">Contact Person</div>
                                    <div>
                                        <label className="block mb-1 font-medium">Name</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.Contact_Person} 
                                            onChange={(e) => setData('Contact_Person', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Relationship</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.C_P_Relationship} 
                                            onChange={(e) => setData('C_P_Relationship', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-1 font-medium">Complete Address</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.C_P_Address} 
                                            onChange={(e) => setData('C_P_Address', e.target.value)}
                                            readOnly={!isEditing} 
                                            placeholder="Full address including street, city, province, barangay"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Contact Number</label>
                                        <input 
                                            className="w-full border rounded px-3 py-2" 
                                            value={data.C_P_Contact} 
                                            onChange={(e) => setData('C_P_Contact', e.target.value)}
                                            readOnly={!isEditing} 
                                        />
                                    </div>
                                </form>                                
                                {/* Action Buttons */}
                                <div className="flex justify-end gap-4 mt-8">
                                    {isEditing ? (
                                        <>
                                            <button 
                                                type="button"
                                                onClick={handleCancel}
                                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-medium"
                                            >
                                                CANCEL
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={handleSave}
                                                disabled={processing}
                                                className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors font-medium disabled:opacity-50"
                                            >
                                                {processing ? 'SAVING...' : 'SAVE'}
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={handleEdit}
                                            className="px-6 py-2 bg-white rounded hover:bg-gray-50 transition-colors font-medium border" 
                                            style={{ color: '#FFAB2E', borderColor: '#FFAB2E' }}
                                        >
                                            EDIT
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </EmployeeAppSidebarLayout>
    );
}
