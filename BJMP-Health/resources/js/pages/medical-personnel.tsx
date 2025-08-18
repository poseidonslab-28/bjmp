import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function MedicalPersonnel({ employees }: { employees: any[] }) {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <AppLayout breadcrumbs={[{ title: 'Medical Personnel', href: '/medical-personnel' }]}>
            <Head title="Medical Personnel" />
            <div className="flex bg-white min-h-screen text-black">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">

                        {/* Main Section */}
                        <div className="flex-1 flex flex-col">
                            <div className="text-2xl font-bold mb-6 mt-2 text-black">
                                MEDICAL RECORD MANAGEMENT
                            </div>
                            <div className="font-bold text-base mb-4 text-black">
                                MEDICAL PERSONNEL ACCOUNT
                            </div>
                            <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4 text-black">
                                {/* Table Header and Actions */}
                                <div className="flex justify-between items-center mb-4">
                                    <div />
                                    <div className="flex gap-2">
                                        <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded">
                                            ARCHIVED ACCOUNTS
                                        </button>
                                        <button className="bg-black text-white font-semibold px-4 py-2 rounded">
                                            CREATE ACCOUNT
                                        </button>
                                    </div>
                                </div>
                                {/* Filter and Search Bar Row - right aligned */}
                                <div className="flex justify-end items-center mb-4 gap-2 relative">
                                    {/* Filter Button */}
                                    <button
                                        className="bg-gray-200 rounded px-2 py-2 flex items-center justify-center"
                                        onClick={() => setShowFilter((prev) => !prev)}
                                        type="button"
                                    >
                                        <img src="/icons/filter.png" alt="Filter" className="w-6 h-6 inline-block align-middle" />
                                    </button>
                                    {/* Filter Dropdown */}
                                    {showFilter && (
                                        <div className="absolute right-0 top-12 z-10 bg-white border rounded-xl shadow p-4 w-64 text-black">
                                            <div className="font-bold mb-2 flex items-center justify-between">
                                                Filter
                                                <button
                                                    className="bg-red-700 text-white text-xs px-3 py-1 rounded"
                                                    onClick={() => setShowFilter(false)}
                                                    type="button"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                            <div className="mb-3">
                                                <label className="block font-semibold mb-1">Rank</label>
                                                <select className="w-full border rounded px-3 py-2 bg-white text-black">
                                                    <option>All Ranks</option>
                                                    <option>JO1</option>
                                                    <option>JO2</option>
                                                    <option>SJO1</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="block font-semibold mb-1">Age</label>
                                                <select className="w-full border rounded px-3 py-2 bg-white text-black">
                                                    <option>All Ages</option>
                                                    <option>20-29</option>
                                                    <option>30-39</option>
                                                    <option>40-49</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Gender</label>
                                                <select className="w-full border rounded px-3 py-2 bg-white text-black">
                                                    <option>All Genders</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    {/* Search Bar */}
                                    <div className="flex items-center border rounded px-2 bg-white w-72">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="outline-none px-2 py-1 bg-transparent w-full text-black"
                                        />
                                    </div>
                                </div>
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-black">
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
                                            {employees.map((emp, i) => (
                                                <tr key={emp.id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                                                    <td className="py-2 px-4">{emp.Emp_ID}</td>
                                                    <td className="py-2 px-4">
                                                        <img
                                                            src={emp.profile ? `/storage/${emp.profile}` : "/images/profilePic.png"}
                                                            alt="Profile"
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        {emp.First_Name} {emp.Last_Name}
                                                    </td>

                                                    <td className="py-2 px-4">{emp.Position}</td>
                                                    <td className="py-2 px-4">{emp.Age}</td>
                                                    <td className="py-2 px-4">
                                                        {emp.isFemale == 1 ? "FEMALE" : "MALE"}
                                                    </td>

                                                    <td className="py-2 px-4 flex gap-2">
                                                        <button
                                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                                            onClick={() =>
                                                                (window.location.href = `/employee-account/personal-profile/${emp.id}`)
                                                            }
                                                        >
                                                            <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                        </button>
                                                        <button className="bg-black text-white px-2 py-1 rounded">
                                                            <img src="/icons/archive.png" alt="Archive" className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
