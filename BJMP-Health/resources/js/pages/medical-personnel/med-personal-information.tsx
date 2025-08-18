import React, { useState } from 'react';
import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head, useForm } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Middle_Name?: string;
    Last_Name: string;
    Suffix?: string;
    Age?: number;
    Birth_Date?: string;
    Birth_Place?: string;
    Religion?: string;
    Civil_Status?: string;
    Contact_No?: string;
    Email?: string;
    House_No?: string;
    Street_Address?: string;
    Baranggay?: string; 
    City?: string;
    Province?: string;
    Zip_Code?: string;
    Position?: string;
    Office_Jail?: string;
    Height?: number;
    Weight?: number;
    BMI?: number;
    BMI_Class?: string;
    Phy_classification?: string;
    Ph_health?: string;
    Contact_Person?: string;
    C_P_Relationship?: string;
    C_P_Address?: string;
    C_P_Contact?: string;
    isFemale?: boolean;
}

interface Props {
    employee: Employee;
}

export default function PersonalInformation({ employee }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    // Debug: Log employee data to console
    console.log('Employee data:', employee);
    
    // Helper function to format date for input[type="date"]
    const formatDateForInput = (dateString: string | null | undefined) => {
        if (!dateString) return '';
        
        try {
            // If it's already in YYYY-MM-DD format, return as is
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                return dateString;
            }
            
            // Try to parse and format the date (handles Carbon timestamps)
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        } catch (error) {
            console.error('Error formatting date:', error);
        }
        
        return '';
    };
    
    // Helper function to normalize civil status
    const normalizeCivilStatus = (status: string | null | undefined) => {
        if (!status) return '';
        
        // Convert to title case to match our dropdown options
        return status.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };
    
    const { data, setData, put, processing, errors, reset } = useForm({
        First_Name: employee?.First_Name || '',
        Middle_Name: employee?.Middle_Name || '',
        Last_Name: employee?.Last_Name || '',
        Suffix: employee?.Suffix || '',
        Age: employee?.Age || '',
        Birth_Date: formatDateForInput(employee?.Birth_Date),
        Birth_Place: employee?.Birth_Place || '',
        Religion: employee?.Religion || '',
        Civil_Status: normalizeCivilStatus(employee?.Civil_Status),
        Contact_No: employee?.Contact_No || '',
        Email: employee?.Email || '',
        House_No: employee?.House_No || '',
        Street_Address: employee?.Street_Address || '',
        Baranggay: employee?.Baranggay || '', 
        City: employee?.City || '',
        Province: employee?.Province || '',
        Zip_Code: employee?.Zip_Code || '',
        Position: employee?.Position || '',
        Office_Jail: employee?.Office_Jail || '',
        Height: employee?.Height || '',
        Weight: employee?.Weight || '',
        BMI: employee?.BMI || '',
        BMI_Class: employee?.BMI_Class || '',
        Phy_classification: employee?.Phy_classification || '',
        Ph_health: employee?.Ph_health || '',
        Contact_Person: employee?.Contact_Person || '',
        C_P_Relationship: employee?.C_P_Relationship || '',
        C_P_Address: employee?.C_P_Address || '',
        C_P_Contact: employee?.C_P_Contact || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/medical/personal-information', {
            onSuccess: () => {
                setIsEditing(false);
                setShowSuccessMessage(true);
                
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            },
            onError: () => {
               
                console.error('Failed to update personal information');
            }
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };
    return (
        <MedicalAppSidebarLayout>
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
                                <div className="font-bold text-lg">{employee?.First_Name} {employee?.Last_Name}</div>
                                <div className="text-gray-600">{employee?.Position || 'Staff'}</div>
                            </div>
                        </div>
                        
                        {/* Success Message */}
                        {showSuccessMessage && (
                            <div className="fixed top-20 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="font-medium">Personal information updated successfully!</span>
                                    </div>
                                    <button 
                                        onClick={() => setShowSuccessMessage(false)}
                                        className="text-white hover:text-gray-200 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Form Section */}
                        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-xl shadow p-10 border border-gray-200 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            {/* Personal Information */}
                            <div className="col-span-2 font-bold text-base mb-2">Personal Information</div>
                            <div>
                                <label className="block mb-1 font-medium">First Name</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.First_Name} 
                                    onChange={(e) => setData('First_Name', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.First_Name && <div className="text-red-500 text-sm mt-1">{errors.First_Name}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Last Name</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Last_Name} 
                                    onChange={(e) => setData('Last_Name', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Last_Name && <div className="text-red-500 text-sm mt-1">{errors.Last_Name}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input 
                                    type="email"
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Email} 
                                    onChange={(e) => setData('Email', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Email && <div className="text-red-500 text-sm mt-1">{errors.Email}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Mobile Number</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Contact_No} 
                                    onChange={(e) => setData('Contact_No', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Contact_No && <div className="text-red-500 text-sm mt-1">{errors.Contact_No}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Religion</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Religion} 
                                    onChange={(e) => setData('Religion', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Religion && <div className="text-red-500 text-sm mt-1">{errors.Religion}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Civil Status</label>
                                <select 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Civil_Status} 
                                    onChange={(e) => setData('Civil_Status', e.target.value)}
                                    disabled={!isEditing}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                                {errors.Civil_Status && <div className="text-red-500 text-sm mt-1">{errors.Civil_Status}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Gender</label>
                                <select 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={employee?.isFemale ? 'Female' : 'Male'} 
                                    disabled={!isEditing}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            
                            {/* Birth Information */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Birth Information</div>
                            <div>
                                <label className="block mb-1 font-medium">Birth Place</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Birth_Place} 
                                    onChange={(e) => setData('Birth_Place', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Birth_Place && <div className="text-red-500 text-sm mt-1">{errors.Birth_Place}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Birth Date</label>
                                <input 
                                    type="date"
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Birth_Date} 
                                    onChange={(e) => setData('Birth_Date', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Birth_Date && <div className="text-red-500 text-sm mt-1">{errors.Birth_Date}</div>}
                            </div>
                            
                            <div>
                                <label className="block mb-1 font-medium">Age</label>
                                <input 
                                    type="number"
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Age} 
                                    onChange={(e) => setData('Age', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Age && <div className="text-red-500 text-sm mt-1">{errors.Age}</div>}
                            </div>
                            
                            {/* Address */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Address</div>
                            <div>
                                <label className="block mb-1 font-medium">House No. / Street</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={`${data.House_No || ''} ${data.Street_Address || ''}`.trim()} 
                                    onChange={(e) => {
                                        const fullAddress = e.target.value;
                                        const parts = fullAddress.split(' ');
                                        const houseNo = parts[0] || '';
                                        const street = parts.slice(1).join(' ') || '';
                                        setData('House_No', houseNo);
                                        setData('Street_Address', street);
                                    }}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Province</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Province} 
                                    onChange={(e) => setData('Province', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Province && <div className="text-red-500 text-sm mt-1">{errors.Province}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">City</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.City} 
                                    onChange={(e) => setData('City', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.City && <div className="text-red-500 text-sm mt-1">{errors.City}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Barangay</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Baranggay} 
                                    onChange={(e) => setData('Baranggay', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Baranggay && <div className="text-red-500 text-sm mt-1">{errors.Baranggay}</div>}
                            </div>
                            
                            {/* Employee Information */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Employee Information</div>
                            <div>
                                <label className="block mb-1 font-medium">Position</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Position} 
                                    onChange={(e) => setData('Position', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Position && <div className="text-red-500 text-sm mt-1">{errors.Position}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Office/Jail Unit</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Office_Jail} 
                                    onChange={(e) => setData('Office_Jail', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Office_Jail && <div className="text-red-500 text-sm mt-1">{errors.Office_Jail}</div>}
                            </div>
                            
                            {/* Health Information */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Health Information</div>
                            <div>
                                <label className="block mb-1 font-medium">Height (cm)</label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Height} 
                                    onChange={(e) => setData('Height', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Height && <div className="text-red-500 text-sm mt-1">{errors.Height}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Weight (kg)</label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Weight} 
                                    onChange={(e) => setData('Weight', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Weight && <div className="text-red-500 text-sm mt-1">{errors.Weight}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">BMI</label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.BMI} 
                                    onChange={(e) => setData('BMI', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.BMI && <div className="text-red-500 text-sm mt-1">{errors.BMI}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Physical Classification</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Phy_classification} 
                                    onChange={(e) => setData('Phy_classification', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Phy_classification && <div className="text-red-500 text-sm mt-1">{errors.Phy_classification}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">PhilHealth</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Ph_health} 
                                    onChange={(e) => setData('Ph_health', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Ph_health && <div className="text-red-500 text-sm mt-1">{errors.Ph_health}</div>}
                            </div>
                            
                            {/* Contact Person */}
                            <div className="col-span-2 font-bold mt-6 mb-2">Emergency Contact</div>
                            <div>
                                <label className="block mb-1 font-medium">Contact Person Name</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.Contact_Person} 
                                    onChange={(e) => setData('Contact_Person', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.Contact_Person && <div className="text-red-500 text-sm mt-1">{errors.Contact_Person}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Relationship</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.C_P_Relationship} 
                                    onChange={(e) => setData('C_P_Relationship', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.C_P_Relationship && <div className="text-red-500 text-sm mt-1">{errors.C_P_Relationship}</div>}
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-1 font-medium">Contact Person Address</label>
                                <textarea 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.C_P_Address} 
                                    onChange={(e) => setData('C_P_Address', e.target.value)}
                                    readOnly={!isEditing}
                                    rows={3}
                                />
                                {errors.C_P_Address && <div className="text-red-500 text-sm mt-1">{errors.C_P_Address}</div>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Contact Number</label>
                                <input 
                                    className={`w-full border rounded px-3 py-2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                                    value={data.C_P_Contact} 
                                    onChange={(e) => setData('C_P_Contact', e.target.value)}
                                    readOnly={!isEditing}
                                />
                                {errors.C_P_Contact && <div className="text-red-500 text-sm mt-1">{errors.C_P_Contact}</div>}
                            </div>

                            <div className="col-span-2 flex justify-end gap-4 mt-8">
                                {!isEditing ? (
                                    <button 
                                        type="button"
                                        onClick={handleEdit}
                                        className="px-6 py-2 bg-white rounded hover:bg-gray-50 transition-colors font-medium border" 
                                        style={{ color: '#FFAB2E', borderColor: '#FFAB2E' }}
                                    >
                                        EDIT
                                    </button>
                                ) : (
                                    <>
                                        <button 
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium"
                                        >
                                            CANCEL
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={processing}
                                            className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors font-medium disabled:opacity-50"
                                        >
                                            {processing ? 'SAVING...' : 'SAVE'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </MedicalAppSidebarLayout>
    );
}
