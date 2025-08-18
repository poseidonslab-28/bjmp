import EmployeeAppSidebarLayout from '../../layouts/app/employee-app-sidebar-layout';
import { Head } from '@inertiajs/react';
import React, { useState, useRef } from 'react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Position?: string;
}

interface Props {
    user: Employee;
}

export default function Vaccination({ user }: Props) {
    const [selectedDate, setSelectedDate] = useState('');
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVaccination, setSelectedVaccination] = useState<{
        date: string;
        procedure: string;
        photo: string;
    } | null>(null);

    
    const getFullName = () => {
        const parts = [user?.First_Name, user?.Middle_Name, user?.Last_Name];
        return parts.filter(Boolean).join(' ');
    };

    const handleViewPhoto = (vaccination: { date: string; procedure: string; photo: string }) => {
        setSelectedVaccination(vaccination);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVaccination(null);
    };

    return (
        <EmployeeAppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/employee/dashboard' },
            { title: 'Vaccination', href: '/employee/vaccination' }
        ]}>
                <Head title="Vaccination" />
                <div className={`flex bg-gray-100 min-h-screen ${isModalOpen ? 'blur-sm' : ''}`}>
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
                                    <div className="font-bold text-xl mb-6">VACCINATION</div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-semibold cursor-pointer"
                                            onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                                        >
                                            <img src="/icons/calendar.png" alt="Calendar" className="w-5 h-5" />
                                            {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'SELECT A DATE'}
                                        </button>
                                        <input
                                            ref={dateInputRef}
                                            type="date"
                                            value={selectedDate}
                                            onChange={e => setSelectedDate(e.target.value)}
                                            className="hidden"
                                        />
                                        <select className="border rounded px-2 py-2">
                                            <option>Active Records</option>
                                        </select>
                                        <div className="flex items-center gap-2 ml-auto">
                        
                                            <input type="text" className="border rounded px-2 py-2 ml-2" placeholder="Search" />
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl shadow p-0 overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="" style={{ backgroundColor: '#0D3255', color: 'white' }}>
                                                    <th className="py-3 px-6 text-left">VACCINATION DATE</th>
                                                    <th className="py-3 px-6 text-left">PROCEDURE</th>
                                                    <th className="py-3 px-6 text-left">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>                                                <tr className="border-b">
                                                    <td className="py-3 px-6 text-blue-900 font-semibold">NOVEMBER 2, 2023</td>
                                                    <td className="py-3 px-6">PHIZER-BOOSTER SHOT</td>
                                                    <td className="py-3 px-6 flex gap-2">
                                                        <button 
                                                            className="text-white rounded p-2 cursor-pointer" 
                                                            style={{ backgroundColor: '#37B37E' }} 
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A9D69'} 
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#37B37E'}
                                                            onClick={() => handleViewPhoto({
                                                                date: 'NOVEMBER 2, 2023',
                                                                procedure: 'PHIZER-BOOSTER SHOT',
                                                                photo: '/images/vaccination-card.jpg' // Replace with actual photo path
                                                            })}
                                                        >
                                                            <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                        </button>
                                                        <button className="text-white rounded p-2 cursor-pointer" style={{ backgroundColor: '#FFAB01' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E69A01'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFAB01'}>
                                                            <img src="/icons/download.png" alt="Edit" className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-6 text-blue-900 font-semibold">JANUARY 30, 2023</td>
                                                    <td className="py-3 px-6">FLU SHOT</td>
                                                    <td className="py-3 px-6 flex gap-2">
                                                        <button 
                                                            className="text-white rounded p-2 cursor-pointer" 
                                                            style={{ backgroundColor: '#37B37E' }} 
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A9D69'} 
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#37B37E'}
                                                            onClick={() => handleViewPhoto({
                                                                date: 'JANUARY 30, 2023',
                                                                procedure: 'FLU SHOT',
                                                                photo: '/images/flu-shot-card.jpg' // Replace with actual photo path
                                                            })}
                                                        >
                                                            <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                        </button>
                                                        <button className="text-white rounded p-2 cursor-pointer" style={{ backgroundColor: '#FFAB01' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E69A01'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFAB01'}>
                                                            <img src="/icons/download.png" alt="Edit" className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-end items-center mt-4">
                                        <button className="border rounded px-2 py-1 mr-2 cursor-pointer">&lt;</button>
                                        <button className="border rounded px-2 py-1 cursor-pointer">&gt;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            {isModalOpen && selectedVaccination && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-3xl max-h-[90vh] overflow-auto relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
                        >
                            ×
                        </button>
                        
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2 text-center">
                                Vaccination Record
                            </h2>
                            <p className="text-gray-600 mb-4 text-center">
                                {selectedVaccination.procedure} - {selectedVaccination.date}
                            </p>
                            
                            <div className="flex justify-center">
                                <img
                                    src={selectedVaccination.photo}
                                    alt={`${selectedVaccination.procedure} vaccination photo`}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                    style={{ maxHeight: '70vh' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </EmployeeAppSidebarLayout>
    );
}
