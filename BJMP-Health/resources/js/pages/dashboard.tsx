import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const healthConditions = [
    { label: 'Essentially Well-Adult', value: 1 },
    { label: 'N/A', value: 1 },
];

const employees = [
    { id: 'P212101', name: 'Decerie Joy Perez', rank: 'JO1', img: '/images/profilePic.png' },
    { id: 'P212101', name: 'Decerie Joy Perez', rank: 'JO1', img: '/images/profilePic.png' },
    { id: 'P212101', name: 'Decerie Joy Perez', rank: 'JO1', img: '/images/profilePic.png' },
    { id: 'P212101', name: 'Decerie Joy Perez', rank: 'JO1', img: '/images/profilePic.png' },
    { id: 'P212101', name: 'Decerie Joy Perez', rank: 'JO1', img: '/images/profilePic.png' },
    { id: 'P212101', name: 'Decerie Joy Perez', rank: 'JO1', img: '/images/profilePic.png' },
    { id: 'P212101', name: 'Decerie Joy Perez', rank: 'JO1', img: '/images/profilePic.png' },
];

interface AdminDashboardProps {
    employees: any[];
    activeCount: number;
    medicalPersonnelCount: number;
    physicalFitnessClassA: number;
    physicalFitnessClassB1: number;
    physicalFitnessClassB2: number;
    physicalFitnessClassC: number;
    physicalFitnessClassD: number;
    physicalFitnessClassX: number;
    bmiUnderWeight: number;
    bmiNormal: number;
    bmiOverweight: number;
    bmiObeseClassI: number;
    bmiObeseClassII: number;
    bmiObeseClassIII: number;
}

export default function AdminDashboard({
    employees,
    activeCount,
    medicalPersonnelCount,
    physicalFitnessClassA,
    physicalFitnessClassB1,
    physicalFitnessClassB2,
    physicalFitnessClassC,
    physicalFitnessClassD,
    physicalFitnessClassX,
    bmiUnderWeight,
    bmiNormal,
    bmiOverweight,
    bmiObeseClassI,
    bmiObeseClassII,
    bmiObeseClassIII,
}: AdminDashboardProps) {

    const stats = [
        { label: 'Total Active User', value: activeCount, icon: '/icons/activeUser.png' },
        { label: 'All Personnel', value: employees.length, icon: '/icons/personnel.png' },
        { label: 'All Medical Personnel', value: medicalPersonnelCount, icon: '/icons/medicalPersonnel.png' },
        { label: 'Activities this Month', value: 'N/A', icon: '/icons/activities.png' },
    ];

    const fitnessClasses = [
        { label: 'CLASS A', value: physicalFitnessClassA },
        { label: 'CLASS B1', value: physicalFitnessClassB1 },
        { label: 'CLASS B2', value: physicalFitnessClassB2 },
        { label: 'CLASS C', value: physicalFitnessClassC },
        { label: 'CLASS D', value: physicalFitnessClassD },
        { label: 'CLASS X', value: physicalFitnessClassX },
    ];

    const bmiSummary = [
        { label: "UNDERWEIGHT", value: bmiUnderWeight },
        { label: "NORMAL", value: bmiNormal },
        { label: "OVERWEIGHT", value: bmiOverweight },
        { label: "OBESE CLASS I", value: bmiObeseClassI },
        { label: "OBESE CLASS II", value: bmiObeseClassII },
        { label: "OBESE CLASS III", value: bmiObeseClassIII },
    ];

    const maleCount = employees.filter(emp => !emp.isFemale).length;
    const femaleCount = employees.filter(emp => emp.isFemale).length;

    const data = {
        labels: ['Female', 'Male'],
        datasets: [
            {
                data: [femaleCount, maleCount],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    function getAge(dateString: string) {
        const birthDate = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getAgeGroups(employees: any[]) {
        const groups = { '18-35': 0, '36-50': 0, '51-70': 0 };

        employees.forEach(emp => {
            const age = getAge(emp.Birth_Date);
            if (age >= 18 && age <= 35) groups['18-35']++;
            else if (age >= 36 && age <= 50) groups['36-50']++;
            else if (age >= 51 && age <= 70) groups['51-70']++;
        });

        return groups;
    }

    const ageGroups = getAgeGroups(employees);
    const ageData = {
        labels: Object.keys(ageGroups),
        datasets: [
            {
                data: Object.values(ageGroups),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');


    const filteredEmployees = employees.filter(emp => {
        if (genderFilter === 'all') return true;
        if (genderFilter === 'male') return !emp.isFemale;
        if (genderFilter === 'female') return emp.isFemale;
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/admin-dashboard' }]}>
            <Head title="Admin Dashboard" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 p-8">
                    <div className="text-2xl font-bold mb-6 text-black">DASHBOARD</div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-xl shadow flex flex-col items-center p-6 border border-gray-200 relative">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded text-lg">{stat.value}</span>
                                </div>
                                <div className="mb-2">
                                    <img src={stat.icon} alt={stat.label} className="w-10 h-10 object-contain inline-block" />
                                </div>
                                <div className="text-base font-semibold text-black text-center">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Physical Fitness Classification */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-200">
                        <div className="font-bold text-lg mb-4 text-black">Physical Fitness</div>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            {fitnessClasses.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-50 rounded-lg shadow p-4 text-center border border-gray-200"
                                >
                                    <div className="font-semibold text-black">{item.label}</div>
                                    <div className="text-xl font-bold text-black">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Health Conditions */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-200">
                        <div className="font-bold text-lg mb-4 text-black">Health Conditions</div>
                        <div className="grid grid-cols-2 md:w-1/3 gap-4">
                            {healthConditions.map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg shadow p-4 text-center border border-gray-200">
                                    <div className="font-semibold text-black">{item.label}</div>
                                    <div className="text-xl font-bold text-black">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BMI Summary */}
                    <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-6">
                        <div className="font-bold text-lg mb-4 text-black">Body Mass Index (BMI) Summary</div>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            {bmiSummary.map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg shadow p-4 text-center border border-gray-200">
                                    <div className="font-semibold text-black">{item.label}</div>
                                    <div className="text-xl font-bold text-black">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Graphs Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-xl shadow p-8 border border-gray-200 flex flex-col items-center min-h-[420px]">
                            <div className="font-bold mb-4 text-xl text-black">AGE</div>
                            <Pie data={ageData} />
                            <div className="flex flex-col mt-6 text-base text-black">
                                <span className="font-bold text-black">18-35</span>
                                <span>36-50</span>
                                <span>60-70</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-8 border border-gray-200 flex flex-col items-center min-h-[420px]">
                            <div className="font-bold mb-4 text-xl text-black">USERS</div>
                            <Pie data={data} />
                            <div className="flex flex-col mt-6 text-base text-black">
                                <span className="font-bold">Female</span>
                                <span className="font-bold">Male</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-8 border border-gray-200 flex flex-col items-center min-h-[420px]">
                            <div className="font-bold mb-4 text-xl text-black">Monthly Account Report</div>
                            <span className="text-base mb-4 text-black">Users added for each month</span>
                            <img src="/images/monthly-account-report.png" alt="Monthly Account Report" className="w-full h-64 object-contain" />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full md:w-96 flex flex-col gap-6 p-4">
                    <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="font-bold text-black">EMPLOYEE</div>
                            <div className="flex gap-2">
                                <button
                                    className={`px-3 py-1 rounded text-xs font-bold ${genderFilter === 'all' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                    onClick={() => setGenderFilter('all')}
                                >
                                    ALL
                                </button>
                                <button
                                    className={`px-3 py-1 rounded text-xs font-bold ${genderFilter === 'male' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                    onClick={() => setGenderFilter('male')}
                                >
                                    MEN
                                </button>
                                <button
                                    className={`px-3 py-1 rounded text-xs font-bold ${genderFilter === 'female' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                    onClick={() => setGenderFilter('female')}
                                >
                                    WOMEN
                                </button>
                            </div>
                        </div>
                        <table className="w-full text-sm text-black">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-2">ID NO.</th>
                                    <th className="py-2">PROFILE</th>
                                    <th className="py-2">NAME</th>
                                    <th className="py-2">RANK</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp, i) => (
                                    <tr key={i} className="border-t h-12 align-middle hover:bg-gray-50">
                                        <td className="py-2">{emp.Emp_ID}</td>
                                        <td className="py-2">
                                            <img
                                                src={emp.Picture_ID}
                                                alt={emp.First_Name}
                                                className="w-8 h-8 rounded-full object-cover border border-gray-300 mx-auto"
                                            />
                                        </td>
                                        <td className="py-2">{emp.First_Name}</td>
                                        <td className="py-2">{emp.Position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="font-bold text-black">MEDICAL PERSONNEL</div>
                            <div className="flex gap-2">
                                <button className="bg-yellow-400 px-3 py-1 rounded text-xs font-bold text-black">ALL</button>
                                <button className="bg-gray-200 px-3 py-1 rounded text-xs text-black">MEN</button>
                                <button className="bg-gray-200 px-3 py-1 rounded text-xs text-black">WOMEN</button>
                            </div>
                        </div>
                        <table className="w-full text-sm text-black">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-2">ID NO.</th>
                                    <th className="py-2">PROFILE</th>
                                    <th className="py-2">NAME</th>
                                    <th className="py-2">RANK</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp, i) => (
                                    <tr key={i} className="border-t h-12 align-middle hover:bg-gray-50">
                                        <td className="py-2">{emp.id}</td>
                                        <td className="py-2">
                                            <img
                                                src={emp.img}
                                                alt={emp.name}
                                                className="w-8 h-8 rounded-full object-cover border border-gray-300 mx-auto"
                                            />
                                        </td>
                                        <td className="py-2">{emp.name}</td>
                                        <td className="py-2">{emp.rank}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                        <div className="font-bold text-black mb-4">FEEDBACKS</div>
                        <table className="w-full text-sm text-black">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-2">ID NO.</th>
                                    <th className="py-2">Message</th>
                                    <th className="py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t h-12 align-middle hover:bg-gray-50">
                                    <td className="py-2">E1001</td>
                                    <td className="py-2">nice..</td>
                                    <td className="py-2">2 hrs ago</td>
                                </tr>
                                <tr className="border-t h-12 align-middle hover:bg-gray-50">
                                    <td className="py-2">E1002</td>
                                    <td className="py-2">ok..</td>
                                    <td className="py-2">1 day ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
