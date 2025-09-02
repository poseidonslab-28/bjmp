import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import '@inertiajs/core';
import { Inertia } from '@inertiajs/inertia';

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

    const props = usePage().props;


    // Safely extract flash
    const flash = (props as any).flash || {};

    // 👇 Log just the flash messages
    console.log("Flash data:", flash);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        employee_id: "EMP12345",
        first_name: "John",
        middle_name: "M",
        last_name: "Doe",
        gender: "Male",
        is_medical_employee: "0", // "0" = No, "1" = Yes
        picture_id: "PIC001",
        suffix: "",
        city: "Sample City",
        barangay: "Sample Barangay",
        street_address: "123 Main St",
        house_no: "42",
        province: "Sample Province",
        zip_code: "1000",
        age: "30",
        birthdate: "1995-01-01",
        birth_place: "Sample Town",
        religion: "None",
        civil_status: "Single",
        contact_no: "09123456789",
        office_jail: "HQ",
        email: "johndoe@example.com",
        contact_person: "Jane Doe",
        contact_p_address: "456 Elm St, Sample City",
        contact_p_relationship: "Sister",
        contact_p_contact: "09876543210",
        height: "175",
        weight: "70",
        physical_classification: "Normal",
        allergies: "Peanuts",
        philhealth: "PH123456",
        blood_type: "O+",
        date_added: new Date().toISOString().split("T")[0],
        position_code: "POS001",
        position: "Developer",
    });


    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false)
        post("/employees/store"); // your route
    };

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
                                        <button
                                            onClick={() => setShowForm(true)} // 👈 open modal
                                            className="bg-blue-900 text-white font-semibold px-4 py-2 rounded">
                                            CREATE ACCOUNT
                                        </button>
                                    </div>
                                </div>


                                <div>
                                    {flash.success && (
                                        <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
                                            {flash.success}
                                        </div>
                                    )}

                                    {flash.error && (
                                        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
                                            {flash.error}
                                        </div>
                                    )}
                                </div>


                                {showForm && (
                                    <div className="p-6 bg-white shadow rounded-lg">
                                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Registration</h2>

                                        <form
                                            onSubmit={submit}
                                            className="grid grid-cols-1 md:grid-cols-4 gap-4"
                                        >
                                            {/* Column 1 */}
                                            <div>
                                                <label className="block text-sm font-semibold">Employee ID</label>
                                                <input type="text" name="Emp_ID" className="w-full border p-2 rounded"
                                                    value={data.employee_id}
                                                    onChange={(e) => setData("employee_id", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">First Name</label>
                                                <input type="text" name="FirstName" className="w-full border p-2 rounded"
                                                    value={data.first_name}
                                                    onChange={(e) => setData("first_name", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Middle Name</label>
                                                <input type="text" name="MiddleName" className="w-full border p-2 rounded"
                                                    value={data.middle_name}
                                                    onChange={(e) => setData("middle_name", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Last Name</label>
                                                <input type="text" name="LastName" className="w-full border p-2 rounded"
                                                    value={data.last_name}
                                                    onChange={(e) => setData("last_name", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Suffix</label>
                                                <input type="text" name="Suffix" className="w-full border p-2 rounded"
                                                    value={data.suffix}
                                                    onChange={(e) => setData("suffix", e.target.value)} />
                                            </div>

                                            {/* Column 2 */}
                                            <div>
                                                <label className="block text-sm font-semibold">Gender</label>
                                                <select name="Gender" className="w-full border p-2 rounded"
                                                    value={data.gender}
                                                    onChange={(e) => setData("gender", e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>

                                                <label className="block text-sm font-semibold mt-3">Is Medical Employee</label>
                                                <select
                                                    name="IsMedEmp"
                                                    className="w-full border p-2 rounded"
                                                    value={data.is_medical_employee}
                                                    onChange={(e) => setData("is_medical_employee", e.target.value)}
                                                >
                                                    <option value="0">No</option>
                                                    <option value="1">Yes</option>
                                                </select>

                                                <label className="block text-sm font-semibold mt-3">Picture ID</label>
                                                <input type="text" name="PictureID" className="w-full border p-2 rounded"
                                                    value={data.picture_id}
                                                    onChange={(e) => setData("picture_id", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">City</label>
                                                <input type="text" name="City" className="w-full border p-2 rounded"
                                                    value={data.city}
                                                    onChange={(e) => setData("city", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Barangay</label>
                                                <input type="text" name="Barangay" className="w-full border p-2 rounded"
                                                    value={data.barangay}
                                                    onChange={(e) => setData("barangay", e.target.value)} />
                                            </div>

                                            {/* Column 3 */}
                                            <div>
                                                <label className="block text-sm font-semibold">Street Address</label>
                                                <input type="text" name="StreetAddress" className="w-full border p-2 rounded"
                                                    value={data.street_address}
                                                    onChange={(e) => setData("street_address", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">House No</label>
                                                <input type="text" name="House_No" className="w-full border p-2 rounded"
                                                    value={data.house_no}
                                                    onChange={(e) => setData("house_no", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Province</label>
                                                <input type="text" name="Province" className="w-full border p-2 rounded"
                                                    value={data.province}
                                                    onChange={(e) => setData("province", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Zip Code</label>
                                                <input type="text" name="ZipCode" className="w-full border p-2 rounded"
                                                    value={data.zip_code}
                                                    onChange={(e) => setData("zip_code", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Birthdate</label>
                                                <input type="date" name="Birthdate" className="w-full border p-2 rounded"
                                                    value={data.birthdate}
                                                    onChange={(e) => setData("birthdate", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Birth Place</label>
                                                <input type="text" name="BirthPlace" className="w-full border p-2 rounded"
                                                    value={data.birth_place}
                                                    onChange={(e) => setData("birth_place", e.target.value)} />
                                            </div>

                                            {/* Column 4 */}
                                            <div>
                                                <label className="block text-sm font-semibold">Age</label>
                                                <input type="number" name="Age" className="w-full border p-2 rounded"
                                                    value={data.age}
                                                    onChange={(e) => setData("age", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Civil Status</label>
                                                <select name="CivilStatus" className="w-full border p-2 rounded"
                                                    value={data.civil_status}
                                                    onChange={(e) => setData("civil_status", e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                    <option value="Widowed">Widowed</option>
                                                </select>

                                                <label className="block text-sm font-semibold mt-3">Religion</label>
                                                <input type="text" name="Religion" className="w-full border p-2 rounded"
                                                    value={data.religion}
                                                    onChange={(e) => setData("religion", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Email</label>
                                                <input type="email" name="Email" className="w-full border p-2 rounded"
                                                    value={data.email}
                                                    onChange={(e) => setData("email", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Contact No</label>
                                                <input type="text" name="ContactNo" className="w-full border p-2 rounded"
                                                    value={data.contact_no}
                                                    onChange={(e) => setData("contact_no", e.target.value)} />
                                            </div>

                                            {/* Column 1 Extended */}
                                            <div>
                                                <label className="block text-sm font-semibold">Office Jail</label>
                                                <input type="text" name="OfficeJail" className="w-full border p-2 rounded"
                                                    value={data.office_jail}
                                                    onChange={(e) => setData("office_jail", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Contact Person</label>
                                                <input type="text" name="ContactPerson" className="w-full border p-2 rounded"
                                                    value={data.contact_person}
                                                    onChange={(e) => setData("contact_person", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Contact P Address</label>
                                                <input type="text" name="ContactPAddress" className="w-full border p-2 rounded"
                                                    value={data.contact_p_address}
                                                    onChange={(e) => setData("contact_p_address", e.target.value)} />
                                            </div>

                                            {/* Column 2 Extended */}
                                            <div>
                                                <label className="block text-sm font-semibold">Contact P Relationship</label>
                                                <input type="text" name="ContactPRelationship" className="w-full border p-2 rounded"
                                                    value={data.contact_p_relationship}
                                                    onChange={(e) => setData("contact_p_relationship", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Contact P Contact</label>
                                                <input type="text" name="ContactPContact" className="w-full border p-2 rounded"
                                                    value={data.contact_p_contact}
                                                    onChange={(e) => setData("contact_p_contact", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Height (cm)</label>
                                                <input type="number" name="Height" className="w-full border p-2 rounded"
                                                    value={data.height}
                                                    onChange={(e) => setData("height", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Weight (kg)</label>
                                                <input type="number" name="Weight" className="w-full border p-2 rounded"
                                                    value={data.weight}
                                                    onChange={(e) => setData("weight", e.target.value)} />
                                            </div>

                                            {/* Column 3 Extended */}
                                            <div>
                                                <label className="block text-sm font-semibold">Physical Classification</label>
                                                <input type="text" name="PhysicalClassification" className="w-full border p-2 rounded"
                                                    value={data.physical_classification}
                                                    onChange={(e) => setData("physical_classification", e.target.value)} />

                                                <div className="flex flex-col space-y-1 border p-2 rounded">
                                                    {["Peanuts", "Seafood", "Pollen", "Dust"].map((allergy) => {
                                                        const selected = data.allergies.split(",").filter(Boolean); // string → array

                                                        return (
                                                            <label key={allergy} className="flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    name="Allergies[]"
                                                                    value={allergy}
                                                                    checked={selected.includes(allergy)}
                                                                    onChange={(e) => {
                                                                        let updated: string[];
                                                                        if (e.target.checked) {
                                                                            updated = [...selected, allergy]; // add
                                                                        } else {
                                                                            updated = selected.filter((a) => a !== allergy); // remove
                                                                        }
                                                                        setData("allergies", updated.join(",")); // array → string
                                                                    }}
                                                                />
                                                                <span>{allergy}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>

                                                <label className="block text-sm font-semibold mt-3">PhilHealth</label>
                                                <input type="text" name="PhilHealth" className="w-full border p-2 rounded"
                                                    value={data.philhealth}
                                                    onChange={(e) => setData("philhealth", e.target.value)} />
                                            </div>

                                            {/* Column 4 Extended */}
                                            <div>
                                                <label className="block text-sm font-semibold">Blood Type</label>
                                                <select name="BloodType" className="w-full border p-2 rounded"
                                                    value={data.blood_type}
                                                    onChange={(e) => setData("blood_type", e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="A+">A+</option>
                                                    <option value="A-">A-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="B-">B-</option>
                                                    <option value="AB+">AB+</option>
                                                    <option value="AB-">AB-</option>
                                                    <option value="O+">O+</option>
                                                    <option value="O-">O-</option>
                                                </select>

                                                <label className="block text-sm font-semibold mt-3">Date Added</label>
                                                <input type="date" name="DateAdded" className="w-full border p-2 rounded"
                                                    value={data.date_added}
                                                    onChange={(e) => setData("date_added", e.target.value)} />

                                                <label className="block text-sm font-semibold mt-3">Position Code</label>
                                                <select name="PositionCode" className="w-full border p-2 rounded"
                                                    value={data.position_code}
                                                    onChange={(e) => setData("position_code", e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="POS1">POS1</option>
                                                    <option value="POS2">POS2</option>
                                                </select>

                                                <label className="block text-sm font-semibold mt-3">Position</label>
                                                <input type="text" name="Position" className="w-full border p-2 rounded"
                                                    value={data.position}
                                                    onChange={(e) => setData("position", e.target.value)} />
                                            </div>

                                            <div className='col-span-4 flex justify-end mt-6'>
                                                <button type="reset"
                                                    onClick={() => setShowForm(false)} // 👈 closes modal
                                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                                                    Cancel
                                                </button>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="col-span-4 flex justify-end mt-6">
                                                <button
                                                    type="submit"
                                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                                                >
                                                    Save Employee
                                                </button>
                                            </div>
                                        </form>
                                    </div>


                                )}



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
                                                    <tr key={emp.Emp_ID} className={i % 2 === 0 ? "bg-gray-50" : ""}>
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
