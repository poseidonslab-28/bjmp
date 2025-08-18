import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EmployeeAccount({ employees }: { employees: any[] }) {
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [ageFilter, setAgeFilter] = useState("All Ages");
    const [genderFilter, setGenderFilter] = useState("All Genders");
    const [statusFilter, setStatusFilter] = useState("All Status"); // ✅ NEW for isActive

    // Filtering logic
    const filteredEmployees = employees.filter(emp => {
        let matches = true;

        // Search by name or ID
        if (search) {
            const fullName = `${emp.First_Name} ${emp.Last_Name}`.toLowerCase();
            if (!fullName.includes(search.toLowerCase()) && !emp.Emp_ID.toString().includes(search)) {
                matches = false;
            }
        }

        // Gender filter
        if (genderFilter !== "All Genders") {
            if (genderFilter === "Male" && emp.isFemale == 1) matches = false;
            if (genderFilter === "Female" && emp.isFemale == 0) matches = false;
        }

        // Age filter
        if (ageFilter !== "All Ages") {
            const age = parseInt(emp.Age, 10);
            if (ageFilter === "20-29" && !(age >= 20 && age <= 29)) matches = false;
            if (ageFilter === "30-39" && !(age >= 30 && age <= 39)) matches = false;
            if (ageFilter === "40-49" && !(age >= 40 && age <= 49)) matches = false;
        }

        // ✅ Status filter
        if (statusFilter !== "All Status") {
            if (statusFilter === "Active" && emp.isActive != 1) matches = false;
            if (statusFilter === "Inactive" && emp.isActive != 0) matches = false;
        }

        return matches;
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Employee Account', href: '/employee-account' }]}>
            <Head title="Employee Account" />
            <div className="flex bg-gray-100 min-h-screen text-black">
                <div className="flex-1 flex justify-center items-start py-10">
                    <div className="w-full max-w-7xl flex gap-8">
                        {/* Main Section */}
                        <div className="flex-1 flex flex-col">
                            <div className="text-2xl font-bold mb-6 mt-2 text-black">
                                MEDICAL RECORD MANAGEMENT
                            </div>
                            <div className="font-bold text-base mb-4 text-black">
                                EMPLOYEE ACCOUNT
                            </div>
                            <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">

                                {/* Header Buttons */}
                                <div className="flex justify-between items-center mb-4">
                                    <div />
                                    <div className="flex gap-2">
                                        <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded">
                                            CREATE ACCOUNT
                                        </button>
                                    </div>
                                </div>

                                {/* Filter + Search */}
                                <div className="flex justify-end items-center mb-4 gap-2 relative">
                                    <button
                                        className="bg-gray-200 rounded px-2 py-2 flex items-center justify-center"
                                        onClick={() => setShowFilter(prev => !prev)}
                                        type="button"
                                    >
                                        <img src="/icons/filter.png" alt="Filter" className="w-6 h-6 inline-block align-middle" />
                                    </button>

                                    {showFilter && (
                                        <div className="absolute right-0 top-12 z-10 bg-white border rounded-xl shadow p-4 w-64 text-black">
                                            <div className="font-bold mb-2 flex items-center justify-between">
                                                Filter
                                                <button
                                                    className="bg-red-700 text-white text-xs px-3 py-1 rounded"
                                                    onClick={() => {
                                                        setAgeFilter("All Ages");
                                                        setGenderFilter("All Genders");
                                                        setStatusFilter("All Status"); // ✅ reset status
                                                        setShowFilter(false);
                                                    }}
                                                    type="button"
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className="mb-3">
                                                <label className="block font-semibold mb-1">Age</label>
                                                <select
                                                    value={ageFilter}
                                                    onChange={(e) => setAgeFilter(e.target.value)}
                                                    className="w-full border rounded px-3 py-2 bg-white text-black"
                                                >
                                                    <option>All Ages</option>
                                                    <option>20-29</option>
                                                    <option>30-39</option>
                                                    <option>40-49</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="block font-semibold mb-1">Gender</label>
                                                <select
                                                    value={genderFilter}
                                                    onChange={(e) => setGenderFilter(e.target.value)}
                                                    className="w-full border rounded px-3 py-2 bg-white text-black"
                                                >
                                                    <option>All Genders</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>

                                            {/* ✅ Status filter */}
                                            <div>
                                                <label className="block font-semibold mb-1">Status</label>
                                                <select
                                                    value={statusFilter}
                                                    onChange={(e) => setStatusFilter(e.target.value)}
                                                    className="w-full border rounded px-3 py-2 bg-white text-black"
                                                >
                                                    <option>All Status</option>
                                                    <option>Active</option>
                                                    <option>Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {/* Search Bar */}
                                    <div className="flex items-center border rounded px-2 bg-white w-72">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
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
                                                <th className="py-2 px-4">STATUS</th>
                                                <th className="py-2 px-4">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEmployees.length > 0 ? (
                                                filteredEmployees.map((emp, i) => (
                                                    <tr key={emp.id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                                                        <td className="py-2 px-4">{emp.Emp_ID}</td>
                                                        <td className="py-2 px-4">
                                                            <img
                                                                src={emp.profile ? `/storage/${emp.profile}` : "/images/profilePic.png"}
                                                                alt="Profile"
                                                                className="w-8 h-8 rounded-full object-cover"
                                                            />
                                                        </td>
                                                        <td className="py-2 px-4">{emp.First_Name} {emp.Last_Name}</td>
                                                        <td className="py-2 px-4">{emp.Position}</td>
                                                        <td className="py-2 px-4">{emp.Age}</td>
                                                        <td className="py-2 px-4">{emp.isFemale == 1 ? "FEMALE" : "MALE"}</td>
                                                        <td className="py-2 px-4">{emp.isActive == 1 ? "ACTIVE" : "INACTIVE"}</td>
                                                        <td className="py-2 px-4 flex gap-2">
                                                            <Link
                                                                href={`/employee-account/personal-profile/${emp.Emp_ID}`}
                                                                className="bg-green-500 text-white px-2 py-1 rounded flex items-center justify-center"
                                                            >
                                                                <img src="/icons/view.png" alt="View" className="w-5 h-5" />
                                                            </Link>
                                                            {emp.isActive && (
                                                                <Link
                                                                    href={`/employee-account/${emp.Emp_ID}/toggle-active`}
                                                                    method="post"
                                                                    as="button"
                                                                    className="bg-black text-white px-2 py-1 rounded flex items-center justify-center"
                                                                >
                                                                    <img src="/icons/archive.png" alt="Archive" className="w-5 h-5" />
                                                                </Link>
                                                            )}

                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="text-center py-4 text-gray-500">
                                                        No employees found.
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
        </AppLayout>
    );
}
