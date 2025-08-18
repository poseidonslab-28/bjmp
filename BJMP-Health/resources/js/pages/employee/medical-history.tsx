import EmployeeAppSidebarLayout from '../../layouts/app/employee-app-sidebar-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Position?: string;
}

interface MedHistory {
    Patient_ID: string;
    Record_ID: string;
    Present_HC?: string;
    Past_HC?: string;
    Allergies?: string;
    Family_HH?: string;
    Current_M?: string;
    Other?: string;
    Pediatric_H?: string;
    Major_AI?: string;
    Surgery?: string;
    Serious_PI?: string;
    Limitation?: string;
    Med_H?: string;
    Transfusion_H?: string;
    Mental_P?: string;
    Smoker_Freq?: string;
    Alcohol_Freq?: string;
    G?: string;
    P?: string;
    LMP?: string;
    blood?: string;
    physical?: string;
}

interface Props {
    user: Employee;
    medHistory?: MedHistory;
}

export default function MedicalHistory({ user, medHistory }: Props) {
    const [isEditMode, setIsEditMode] = useState(false);
    
    // Form state using Inertia's useForm (similar to personal-information)
    const { data, setData, post, processing } = useForm({
        Patient_ID: user?.Emp_ID || '',
        Present_HC: medHistory?.Present_HC || '',
        Past_HC: medHistory?.Past_HC || '',
        Allergies: medHistory?.Allergies || '',
        Family_HH: medHistory?.Family_HH || '',
        Current_M: medHistory?.Current_M || '',
        Other: medHistory?.Other || '',
        Pediatric_H: medHistory?.Pediatric_H || '',
        Major_AI: medHistory?.Major_AI || '',
        Surgery: medHistory?.Surgery || '',
        Serious_PI: medHistory?.Serious_PI || '',
        Limitation: medHistory?.Limitation || '',
        Med_H: medHistory?.Med_H || '',
        Transfusion_H: medHistory?.Transfusion_H || '',
        Mental_P: medHistory?.Mental_P || '',
        Smoker_Freq: medHistory?.Smoker_Freq || '',
        Alcohol_Freq: medHistory?.Alcohol_Freq || '',
        G: medHistory?.G || '',
        P: medHistory?.P || '',
        LMP: medHistory?.LMP || '',
        blood: medHistory?.blood || '',
        physical: medHistory?.physical || ''
    });

    // Update form data when medHistory changes
    useEffect(() => {
        if (medHistory) {
            setData({
                Patient_ID: user?.Emp_ID || '',
                Present_HC: medHistory.Present_HC || '',
                Past_HC: medHistory.Past_HC || '',
                Allergies: medHistory.Allergies || '',
                Family_HH: medHistory.Family_HH || '',
                Current_M: medHistory.Current_M || '',
                Other: medHistory.Other || '',
                Pediatric_H: medHistory.Pediatric_H || '',
                Major_AI: medHistory.Major_AI || '',
                Surgery: medHistory.Surgery || '',
                Serious_PI: medHistory.Serious_PI || '',
                Limitation: medHistory.Limitation || '',
                Med_H: medHistory.Med_H || '',
                Transfusion_H: medHistory.Transfusion_H || '',
                Mental_P: medHistory.Mental_P || '',
                Smoker_Freq: medHistory.Smoker_Freq || '',
                Alcohol_Freq: medHistory.Alcohol_Freq || '',
                G: medHistory.G || '',
                P: medHistory.P || '',
                LMP: medHistory.LMP || '',
                blood: medHistory.blood || '',
                physical: medHistory.physical || ''
            });
        }
    }, [medHistory]);

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

    // Helper function to get full name
    const getFullName = () => {
        const parts = [user?.First_Name, user?.Middle_Name, user?.Last_Name];
        return parts.filter(Boolean).join(' ');
    };

    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData(field, value);
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleSave = () => {
        post('/employee/medical-history/save', {
            onSuccess: () => {
                setIsEditMode(false);
                alert('Medical history updated successfully!');
            },
            onError: (errors) => {
                console.error('Save failed:', errors);
                alert('Failed to save medical history. Please try again.');
            }
        });
    };

    const handleCancel = () => {
        // Reset form data to original values using setData
        if (medHistory) {
            setData({
                Patient_ID: user?.Emp_ID || '',
                Present_HC: medHistory.Present_HC || '',
                Past_HC: medHistory.Past_HC || '',
                Allergies: medHistory.Allergies || '',
                Family_HH: medHistory.Family_HH || '',
                Current_M: medHistory.Current_M || '',
                Other: medHistory.Other || '',
                Pediatric_H: medHistory.Pediatric_H || '',
                Major_AI: medHistory.Major_AI || '',
                Surgery: medHistory.Surgery || '',
                Serious_PI: medHistory.Serious_PI || '',
                Limitation: medHistory.Limitation || '',
                Med_H: medHistory.Med_H || '',
                Transfusion_H: medHistory.Transfusion_H || '',
                Mental_P: medHistory.Mental_P || '',
                Smoker_Freq: medHistory.Smoker_Freq || '',
                Alcohol_Freq: medHistory.Alcohol_Freq || '',
                G: medHistory.G || '',
                P: medHistory.P || '',
                LMP: medHistory.LMP || '',
                blood: medHistory.blood || '',
                physical: medHistory.physical || ''
            });
        }
        setIsEditMode(false);
    };

    const parseFamilyHealth = (familyHH?: string) => {
        if (!familyHH) return {};
        try {
            return JSON.parse(familyHH);
        } catch {
            return {};
        }
    };

    const familyHealthConditions = parseFamilyHealth(data.Family_HH);

    const handleFamilyHealthChange = (condition: string, checked: boolean) => {
        const current = parseFamilyHealth(data.Family_HH);
        const updated = { ...current, [condition]: checked };
        
        if (condition === 'Others' && !checked) {
            delete updated['Others_Text'];
        }
        
        handleInputChange('Family_HH', JSON.stringify(updated));
    };

    const handleOthersTextChange = (text: string) => {
        const current = parseFamilyHealth(data.Family_HH);
        const updated = { ...current, 'Others_Text': text };
        handleInputChange('Family_HH', JSON.stringify(updated));
    };

    const parseLMP = (lmp?: string) => {
        if (!lmp) return { month: '', day: '', year: '' };
        const parts = lmp.split('-');
        return {
            month: parts[1] || '',
            day: parts[2] || '',
            year: parts[0] || ''
        };
    };

    const lmpDate = parseLMP(data.LMP);

    const handleLMPChange = (type: 'month' | 'day' | 'year', value: string) => {
        const current = parseLMP(data.LMP);
        current[type] = value;
        const dateString = `${current.year}-${current.month.padStart(2, '0')}-${current.day.padStart(2, '0')}`;
        handleInputChange('LMP', dateString);
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <EmployeeAppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/employee/dashboard' },
            { title: 'Medical History', href: '/employee/medical-history' }
        ]}>
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
                            <div className="text-center font-bold text-lg mb-2">{getFullName()}</div>
                            <div className="text-center text-gray-600 mb-6">{user?.Position || 'Employee'}</div>
                        </div>

                        {/* Main Section */}
                        <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full max-w-4xl">
                                <div className="font-bold text-xl mb-6">Medical History</div>
                                
                                <form className="space-y-6">
                                    {/* Basic Medical Information */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-1 font-medium">Present Health Condition</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Present_HC}
                                                    onChange={(e) => handleInputChange('Present_HC', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Present_HC || 'Not specified'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Current Medicine/s</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Current_M}
                                                    onChange={(e) => handleInputChange('Current_M', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Current_M || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Smoking and Drinking */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-1 font-medium">Smoker?</label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-1">
                                                    <input 
                                                        type="radio" 
                                                        name="smoker"
                                                        checked={isSmoker(data.Smoker_Freq)}
                                                        onChange={() => isEditMode && handleInputChange('Smoker_Freq', 'Occasionally')}
                                                        disabled={!isEditMode}
                                                    /> Yes
                                                </label>
                                                <label className="flex items-center gap-1">
                                                    <input 
                                                        type="radio" 
                                                        name="smoker"
                                                        checked={isNonSmoker(data.Smoker_Freq)}
                                                        onChange={() => isEditMode && handleInputChange('Smoker_Freq', 'Never')}
                                                        disabled={!isEditMode}
                                                    /> No
                                                </label>
                                                <span className="ml-4">Frequency</span>
                                                {isEditMode ? (
                                                    <select 
                                                        className="border rounded px-2 py-1 ml-2" 
                                                        value={data.Smoker_Freq}
                                                        onChange={(e) => handleInputChange('Smoker_Freq', e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Never">Never</option>
                                                        <option value="Occasionally">Occasionally</option>
                                                        <option value="Often">Often</option>
                                                        <option value="Daily">Daily</option>
                                                    </select>
                                                ) : (
                                                    <select 
                                                        className="border rounded px-2 py-1 ml-2 bg-gray-50" 
                                                        value={data.Smoker_Freq || 'Never'} 
                                                        disabled
                                                    >
                                                        <option>{data.Smoker_Freq || 'Never'}</option>
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Alcohol Drinker?</label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-1">
                                                    <input 
                                                        type="radio" 
                                                        name="drinker"
                                                        checked={isDrinker(data.Alcohol_Freq)}
                                                        onChange={() => isEditMode && handleInputChange('Alcohol_Freq', 'Occasionally')}
                                                        disabled={!isEditMode}
                                                    /> Yes
                                                </label>
                                                <label className="flex items-center gap-1">
                                                    <input 
                                                        type="radio" 
                                                        name="drinker"
                                                        checked={isNonDrinker(data.Alcohol_Freq)}
                                                        onChange={() => isEditMode && handleInputChange('Alcohol_Freq', 'Never')}
                                                        disabled={!isEditMode}
                                                    /> No
                                                </label>
                                                <span className="ml-4">Frequency</span>
                                                {isEditMode ? (
                                                    <select 
                                                        className="border rounded px-2 py-1 ml-2" 
                                                        value={data.Alcohol_Freq}
                                                        onChange={(e) => handleInputChange('Alcohol_Freq', e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Never">Never</option>
                                                        <option value="Occasional">Occasional</option>
                                                        <option value="Occasionally">Occasionally</option>
                                                        <option value="Once a week">Once a week</option>
                                                        <option value="Once a month">Once a month</option>
                                                        <option value="Daily">Daily</option>
                                                    </select>
                                                ) : (
                                                    <select 
                                                        className="border rounded px-2 py-1 ml-2 bg-gray-50" 
                                                        value={data.Alcohol_Freq || 'Never'} 
                                                        disabled
                                                    >
                                                        <option>{data.Alcohol_Freq || 'Never'}</option>
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Allergies and Blood Type */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-1 font-medium">Allergies</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Allergies}
                                                    onChange={(e) => handleInputChange('Allergies', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Allergies || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Blood Type</label>
                                            {isEditMode ? (
                                                <select 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.blood}
                                                    onChange={(e) => handleInputChange('blood', e.target.value)}
                                                >
                                                    <option value="">Select Blood Type</option>
                                                    <option value="A+">A+</option>
                                                    <option value="A-">A-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="B-">B-</option>
                                                    <option value="AB+">AB+</option>
                                                    <option value="AB-">AB-</option>
                                                    <option value="O+">O+</option>
                                                    <option value="O-">O-</option>
                                                </select>
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.blood || 'Not specified'} 
                                                    readOnly 
                                                />
                                            )}
                                            <div className="flex gap-2 mt-2">
                                                <div className="flex-1">
                                                    <label className="block mb-1 text-sm">G</label>
                                                    {isEditMode ? (
                                                        <input 
                                                            className="w-full border rounded px-3 py-2" 
                                                            value={data.G}
                                                            onChange={(e) => handleInputChange('G', e.target.value)}
                                                        />
                                                    ) : (
                                                        <input 
                                                            className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                            value={data.G || 'Not specified'} 
                                                            readOnly 
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block mb-1 text-sm">P</label>
                                                    {isEditMode ? (
                                                        <input 
                                                            className="w-full border rounded px-3 py-2" 
                                                            value={data.P}
                                                            onChange={(e) => handleInputChange('P', e.target.value)}
                                                        />
                                                    ) : (
                                                        <input 
                                                            className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                            value={data.P || 'Not specified'} 
                                                            readOnly 
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* LMP */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 font-medium">LMP (Last Menstrual Period)</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block mb-1 text-sm">Month</label>
                                                {isEditMode ? (
                                                    <select 
                                                        className="w-full border rounded px-2 py-1" 
                                                        value={lmpDate.month}
                                                        onChange={(e) => handleLMPChange('month', e.target.value)}
                                                    >
                                                        <option value="">Select Month</option>
                                                        {months.map((month, index) => (
                                                            <option key={month} value={String(index + 1).padStart(2, '0')}>{month}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <select className="w-full border rounded px-2 py-1 bg-gray-50" disabled>
                                                        <option>{lmpDate.month ? months[parseInt(lmpDate.month) - 1] : 'Not specified'}</option>
                                                    </select>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <label className="block mb-1 text-sm">Day</label>
                                                {isEditMode ? (
                                                    <select 
                                                        className="w-full border rounded px-2 py-1" 
                                                        value={lmpDate.day}
                                                        onChange={(e) => handleLMPChange('day', e.target.value)}
                                                    >
                                                        <option value="">Select Day</option>
                                                        {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                                            <option key={day} value={String(day).padStart(2, '0')}>{day}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <select className="w-full border rounded px-2 py-1 bg-gray-50" disabled>
                                                        <option>{lmpDate.day || 'Not specified'}</option>
                                                    </select>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <label className="block mb-1 text-sm">Year</label>
                                                {isEditMode ? (
                                                    <select 
                                                        className="w-full border rounded px-2 py-1" 
                                                        value={lmpDate.year}
                                                        onChange={(e) => handleLMPChange('year', e.target.value)}
                                                    >
                                                        <option value="">Select Year</option>
                                                        {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => (
                                                            <option key={year} value={String(year)}>{year}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <select className="w-full border rounded px-2 py-1 bg-gray-50" disabled>
                                                        <option>{lmpDate.year || 'Not specified'}</option>
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Medical History Details */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-1 font-medium">Past Medical History</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Past_HC}
                                                    onChange={(e) => handleInputChange('Past_HC', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Past_HC || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Major Adult Illness</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Major_AI}
                                                    onChange={(e) => handleInputChange('Major_AI', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Major_AI || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Surgery / Prev. Hospitalization</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Surgery}
                                                    onChange={(e) => handleInputChange('Surgery', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Surgery || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Serious Physical History</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Serious_PI}
                                                    onChange={(e) => handleInputChange('Serious_PI', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Serious_PI || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Limitation in ROM & Activities</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Limitation}
                                                    onChange={(e) => handleInputChange('Limitation', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Limitation || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Medication History</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Med_H}
                                                    onChange={(e) => handleInputChange('Med_H', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Med_H || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">History of Transfusion / Reaction</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Transfusion_H}
                                                    onChange={(e) => handleInputChange('Transfusion_H', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Transfusion_H || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Mental & Emotional Problem</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Mental_P}
                                                    onChange={(e) => handleInputChange('Mental_P', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Mental_P || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Pediatric History</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.Pediatric_H}
                                                    onChange={(e) => handleInputChange('Pediatric_H', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.Pediatric_H || 'None'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">Physical Classification</label>
                                            {isEditMode ? (
                                                <input 
                                                    className="w-full border rounded px-3 py-2" 
                                                    value={data.physical}
                                                    onChange={(e) => handleInputChange('physical', e.target.value)}
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border rounded px-3 py-2 bg-gray-50" 
                                                    value={data.physical || 'Not specified'} 
                                                    readOnly 
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Family Health History Section */}
                                    <div className="col-span-2">
                                        <div className="font-bold text-lg mb-4">Family Health History</div>
                                        <div className="grid grid-cols-4 gap-4">
                                            {['Hypertension', 'Heart Attack', 'Diabetes', 'Kidney Disease', 'Stroke', 'Cancer', 'Asthma'].map((condition) => (
                                                <div key={condition}>
                                                    <label className="flex items-center gap-2">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={familyHealthConditions[condition] || false}
                                                            onChange={(e) => isEditMode && handleFamilyHealthChange(condition, e.target.checked)}
                                                            disabled={!isEditMode}
                                                        />
                                                        <span>{condition}</span>
                                                    </label>
                                                </div>
                                            ))}
                                            <div>
                                                <label className="flex items-center gap-2">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={familyHealthConditions['Others'] || false}
                                                        onChange={(e) => isEditMode && handleFamilyHealthChange('Others', e.target.checked)}
                                                        disabled={!isEditMode}
                                                    />
                                                    <span>Others:</span>
                                                </label>
                                                {familyHealthConditions['Others'] && (
                                                    <div className="mt-2">
                                                        {isEditMode ? (
                                                            <input 
                                                                type="text"
                                                                className="w-full border rounded px-2 py-1 text-sm"
                                                                placeholder="Please specify..."
                                                                value={familyHealthConditions['Others_Text'] || ''}
                                                                onChange={(e) => handleOthersTextChange(e.target.value)}
                                                            />
                                                        ) : (
                                                            <input 
                                                                type="text"
                                                                className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
                                                                value={familyHealthConditions['Others_Text'] || 'Not specified'}
                                                                readOnly
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                                {/* Action Buttons */}
                                <div className="flex justify-end gap-4 mt-8">
                                    {isEditMode ? (
                                        <>
                                            <button 
                                                onClick={handleCancel}
                                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium"
                                            >
                                                CANCEL
                                            </button>
                                            <button 
                                                onClick={handleSave}
                                                disabled={processing}
                                                className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors font-medium disabled:opacity-50"
                                            >
                                                {processing ? 'SAVING...' : 'SAVE'}
                                            </button>
                                        </>
                                    ) : (
                                        <button 
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
            </div>
        </EmployeeAppSidebarLayout>
    );
}
