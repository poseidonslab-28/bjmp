import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Middle_Name?: string;
    Last_Name: string;
    Position?: string;
    Position_Code?: string;
    Age?: number;
    isFemale: boolean;
    Picture_ID?: string;
    isActive: boolean;
}

interface Props {
    employees: Employee[];
}

export default function EmployeeAccount({ employees }: Props) {
    const [showFilter, setShowFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRank, setSelectedRank] = useState('All Ranks');
    const [showArchived, setShowArchived] = useState(false);
    const [selectedAge, setSelectedAge] = useState('All Ages');
    const [selectedGender, setSelectedGender] = useState('All Genders');

    // Helper function to get employee's full name
    const getFullName = (employee: Employee) => {
        return `${employee.Last_Name}, ${employee.First_Name}${employee.Middle_Name ? ' ' + employee.Middle_Name : ''}`.toUpperCase();
    };

    // Helper function to get gender display
    const getGenderDisplay = (isFemale: boolean) => {
        return isFemale ? 'FEMALE' : 'MALE';
    };

    // Helper function to get rank (Position_Code as rank)
    const getRankDisplay = (positionCode?: string) => {
        return positionCode ? positionCode.trim().toUpperCase() : 'N/A';
    };

    // Filter employees based on search and filter criteria
    const filteredEmployees = employees.filter(employee => {
        const fullName = getFullName(employee);
        const empId = employee.Emp_ID.toLowerCase();
        const searchMatch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          empId.includes(searchTerm.toLowerCase());

        const selectedRankValue = selectedRank.trim().toUpperCase();
        const empRankValue = (employee.Position_Code || '').trim().toUpperCase();
        const rankMatch = selectedRankValue === 'ALL RANKS' ? true : empRankValue === selectedRankValue;

        const ageMatch = selectedAge === 'All Ages' || 
                        (selectedAge === '20-29' && employee.Age && employee.Age >= 20 && employee.Age <= 29) ||
                        (selectedAge === '30-39' && employee.Age && employee.Age >= 30 && employee.Age <= 39) ||
                        (selectedAge === '40-49' && employee.Age && employee.Age >= 40 && employee.Age <= 49) ||
                        (selectedAge === '50+' && employee.Age && employee.Age >= 50);

        const genderMatch = selectedGender === 'All Genders' || 
                           getGenderDisplay(employee.isFemale) === selectedGender;

        const archivedMatch = showArchived ? !employee.isActive : employee.isActive;

        return searchMatch && rankMatch && ageMatch && genderMatch && archivedMatch;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedRank('All Ranks');
        setSelectedAge('All Ages');
        setSelectedGender('All Genders');
        setShowFilter(false);
    };

    return (
        <MedicalAppSidebarLayout>
            <Head title="Employee Account" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Main Section */}
                        <div className="flex-1 flex flex-col">
                            <div className="text-2xl font-bold mb-6 mt-2">MEDICAL RECORD MANAGEMENT</div>
                            <div className="font-bold text-base text-blue-900 mb-4">
                                {showArchived ? 'ARCHIVED ACCOUNTS' : 'EMPLOYEE ACCOUNT'}
                                <span className="text-sm font-normal text-gray-600 ml-2">
                                    ({filteredEmployees.length} of {employees.length} employees)
                                </span>
                            </div>
                            <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">
                                {/* Table Header and Actions */}
                                <div className="flex justify-between items-center mb-4">
                                    <div />
                                    <div className="flex gap-2">
                                        <button
                                            className={`bg-yellow-400 text-black font-semibold px-4 py-2 rounded ${showArchived ? 'ring-2 ring-yellow-700' : ''}`}
                                            onClick={() => setShowArchived((prev) => !prev)}
                                        >
                                            ARCHIVED ACCOUNTS
                                        </button>
                                    </div>
                                </div>
                                {/* Filter and Search Bar Row - right aligned */}
                                <div className="flex justify-end items-center mb-4 gap-2 relative">
                                    {/* Filter Button and Search Bar in one line */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="bg-gray-200 rounded px-2 py-2 flex items-center justify-center"
                                            onClick={() => setShowFilter((prev) => !prev)}
                                            type="button"
                                        >
                                            <img src="/icons/filter.png" alt="Filter Icon" className="w-5 h-5" />
                                        </button>
                                        <div className="flex items-center border rounded px-2 bg-white w-72">
                                            <input
                                                type="text"
                                                placeholder="Search by name or ID"
                                                className="outline-none px-2 py-1 bg-transparent w-full"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* Filter Dropdown */}
                                    {showFilter && (
                                        <div className="absolute right-0 top-12 z-10 bg-white border rounded-xl shadow p-4 w-64">
                                            <div className="font-bold text-blue-900 mb-2 flex items-center justify-between">
                                                Filter
                                                <button
                                                    className="bg-red-700 text-white text-xs px-3 py-1 rounded"
                                                    onClick={clearFilters}
                                                    type="button"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                            <div className="mb-3">
                                                <label className="block font-semibold mb-1">Rank</label>
                                                <select
                                                    className="w-full border rounded px-3 py-2 bg-white"
                                                    value={selectedRank}
                                                    onChange={(e) => setSelectedRank(e.target.value)}
                                                >
                                                    <option>All Ranks</option>
                                                    <option>JDIR</option>
                                                    <option>JCSUPT</option>
                                                    <option>JSSUPT</option>
                                                    <option>JSUPT</option>
                                                    <option>JCINSP</option>
                                                    <option>JSINSP</option>
                                                    <option>JINSP</option>
                                                    <option>SJO4</option>
                                                    <option>SJO3</option>
                                                    <option>SJO2</option>
                                                    <option>SJO1</option>
                                                    <option>JO3</option>
                                                    <option>JO2</option>
                                                    <option>JO1</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="block font-semibold mb-1">Age</label>
                                                <select 
                                                    className="w-full border rounded px-3 py-2 bg-white"
                                                    value={selectedAge}
                                                    onChange={(e) => setSelectedAge(e.target.value)}
                                                >
                                                    <option>All Ages</option>
                                                    <option>20-29</option>
                                                    <option>30-39</option>
                                                    <option>40-49</option>
                                                    <option>50+</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Gender</label>
                                                <select 
                                                    className="w-full border rounded px-3 py-2 bg-white"
                                                    value={selectedGender}
                                                    onChange={(e) => setSelectedGender(e.target.value)}
                                                >
                                                    <option>All Genders</option>
                                                    <option>MALE</option>
                                                    <option>FEMALE</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="text-left border-b">
                                                <th className="py-2 px-4">ID NUMBER</th>
                                                <th className="py-2 px-4">PROFILE</th>
                                                <th className="py-2 px-4">NAME</th>
                                                <th className="py-2 px-4">RANK</th>
                                                <th className="py-2 px-4">AGE</th>
                                                <th className="py-2 px-4">GENDER</th>
                                                <th className="py-2 px-4">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEmployees.length > 0 ? (
                                                filteredEmployees.map((employee, i) => (
                                                    <tr key={employee.Emp_ID} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                                                        <td className="py-2 px-4">{employee.Emp_ID}</td>
                                                        <td className="py-2 px-4">
                                                            <img
                                                                src={employee.Picture_ID ? `/images/profiles/${employee.Picture_ID}` : "/images/profilePic.png"}
                                                                alt="Profile"
                                                                className="w-8 h-8 rounded-full object-cover"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = "/images/profilePic.png";
                                                                }}
                                                            />
                                                        </td>
                                                        <td className="py-2 px-4">{getFullName(employee)}</td>
                                                        <td className="py-2 px-4">{getRankDisplay(employee.Position_Code)}</td>
                                                        <td className="py-2 px-4">{employee.Age || 'N/A'}</td>
                                                        <td className="py-2 px-4">{getGenderDisplay(employee.isFemale)}</td>
                                                        <td className="py-2 px-4 flex gap-2">
                                                            <button
                                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                                                onClick={() => window.location.href = `/medical/employee-account/personal-profile/${employee.Emp_ID}`}
                                                                title="View Personal Profile"
                                                                type="button"
                                                            >
                                                                <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                            </button>
                                                            <button className="bg-black text-white px-2 py-1 rounded">
                                                                <img src="/icons/archive.png" alt="Archive" className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="py-8 px-4 text-center text-gray-500">
                                                        No employees found matching your criteria.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MedicalAppSidebarLayout>
    );
}
