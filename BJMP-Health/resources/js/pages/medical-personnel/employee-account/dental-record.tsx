import React, { useState } from "react";
import MedicalAppSidebarLayout from "@/layouts/app/medical-app-sidebar-layout";
import { Head, Link } from "@inertiajs/react";

interface Employee {
  Emp_ID: string;
  First_Name: string;
  Middle_Name?: string;
  Last_Name: string;
  Position?: string;
  Picture_ID?: string;
  Full_Name?: string;
}

interface Props {
  employee: Employee;
}

const DentalRecord: React.FC<Props> = ({ employee }) => {
  const [verticalChart, setVerticalChart] = useState(false);

  // Helper to display N/A for blank/null/undefined, always returns string
  const displayValue = (value: string | number | boolean | undefined | null): string => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  return (
    <MedicalAppSidebarLayout breadcrumbs={[{ title: "Dental Record", href: `/medical/employee-account/dental-record/${employee.Emp_ID}` }]}> 
      <Head title="Dental Record" />
      <div className="flex bg-gray-100 min-h-screen">
        <div className="flex-1 flex justify-center items-start py-10">
          <div className="w-full max-w-7xl flex gap-8">
      {/* Profile Sidebar */}
      <div className="w-80 bg-white rounded-xl shadow flex flex-col items-center py-8 px-0 border border-gray-200">
        {/* Employee Profile */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-4">
          <img
            src={employee.Picture_ID ? `/images/profiles/${employee.Picture_ID}` : "/images/profilePic.png"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-center mb-2 font-bold text-lg">{employee.First_Name} {employee.Middle_Name ? employee.Middle_Name + ' ' : ''}{employee.Last_Name}</div>
        <div className="text-center text-gray-600 mb-6">{displayValue(employee.Position)}</div>
        <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs mb-4">UPLOAD PHOTO</button>
        {/* Sidebar Navigation */}
        <div className="w-full flex flex-col gap-2 px-4">
          <Link href={`/medical/employee-account/personal-profile/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
            <img src="/icons/personalProfile.png" alt="Personal Profile" className="w-6 h-6" /> Personal Profile
          </Link>
          <Link href={`/medical/employee-account/medical-history/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
            <img src="/icons/medical-history.png" alt="Medical History" className="w-6 h-6" /> Medical History
          </Link>
          <Link href={`/medical/employee-account/laboratory/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
            <img src="/icons/laboratory.png" alt="Laboratory" className="w-6 h-6" /> Laboratory
          </Link>
          <Link href={`/medical/employee-account/imaging/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
            <img src="/icons/imaging.png" alt="Imaging" className="w-6 h-6" /> Imaging
          </Link>
          <Link href={`/medical/employee-account/vaccination/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
            <img src="/icons/vaccination.png" alt="Vaccination" className="w-6 h-6" /> Vaccination
          </Link>
          <Link href={`/medical/employee-account/dental-record/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded mb-2 font-semibold" style={{ backgroundColor: '#FFAB2E', color: '#000', boxShadow: '0 2px 8px #FFAB2ECC' }}>
            <img src="/icons/dental-record.png" alt="Dental Record" className="w-6 h-6" /> Dental Record
          </Link>
          <Link href={`/medical/employee-account/doctors-note/${employee.Emp_ID}`} className="w-full flex items-center gap-3 py-3 px-3 rounded hover:bg-gray-100">
            <img src="/icons/doctors-note.png" alt="Doctor's Note" className="w-6 h-6" /> Doctor's Note
          </Link>
        </div>
      </div>
            {/* Main Section */}
            <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
              <div className="w-full max-w-4xl">
                <div className="font-bold text-xl mb-6">DENTAL RECORD</div>
                {/* Dental Chart Section - Redesigned */}
                <div style={{ background: '#F5F6FA', borderRadius: 12, padding: '2rem', marginBottom: 24, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
                    {/* Left: Dental Chart Title only */}
                    <div style={{ minWidth: 220, marginRight: 32 }}>
                      <div style={{ fontWeight: 700, color: '#16355D', fontSize: 18, marginBottom: 16 }}>Dental Chart</div>
                    </div>
                    {/* Center: Chart Image and Centered Legend */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                      <img
                        src={verticalChart ? '/images/dental-vertical-chart.png' : '/images/dental-horizontal-chart.png'}
                        alt={verticalChart ? 'Dental Chart Vertical' : 'Dental Chart Horizontal'}
                        style={{ maxWidth: verticalChart ? 260 : 400, width: '100%', marginBottom: 16 }}
                      />
                      {/* LEGEND row (matches screenshot) */}
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: verticalChart ? 0 : 16, marginTop: 8 }}>
                        <div style={{ color: '#16355D', fontWeight: 600, fontSize: 14, marginBottom: 8, marginLeft: 8 }}>LEGEND:</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginLeft: 32 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <LegendItem color="#fff" label="Present" />
                            <LegendItem color="#1A5AFF" label="Restoration (O)" />
                            <LegendItem color="#F6FF2E" label="Caries (C)" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <LegendItem color="#000" label="Missing (M)" />
                            <LegendItem color="#E600FF" label="Impacted (I)" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <LegendItem color="#FF2D2D" label="Root Fragment (RF)" />
                            <LegendItem color="#3DD365" label="FPD/Jacket Crown (P)" />
                          </div>
                        </div>
                      </div>
                      {verticalChart && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                          <button style={{ background: '#FFAB2ECC', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 600, fontSize: 16 }}>PRINT DRI</button>
                        </div>
                      )}
                    </div>
                    {/* Right: Toggle */}
                    <div style={{ minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: 16 }}>
                      <button
                        aria-label="Toggle Dental Chart"
                        onClick={() => setVerticalChart((v) => !v)}
                        style={{
                          width: 48,
                          height: 24,
                          borderRadius: 12,
                          background: verticalChart ? '#FFAB2E' : '#0D3255',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: verticalChart ? 'flex-end' : 'flex-start',
                          padding: 2,
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: '#fff',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                            transition: 'transform 0.2s',
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Dental Treatment Record Table */}
                <div className="bg-gray-50 rounded-xl shadow p-6">
                  <div className="font-bold text-lg mb-4">Dental Treatment Record</div>
                  <div className="flex items-center gap-2 mb-4 justify-end">
                    <input type="text" className="border rounded px-2 py-2" placeholder="Search" />
                  </div>
                  <table className="min-w-full">
                    <thead>
                      <tr className="" style={{ backgroundColor: '#0D3255', color: 'white' }}>
                        <th className="py-3 px-6 text-left">DATE</th>
                        <th className="py-3 px-6 text-left">ATTENDING DENTIST</th>
                        <th className="py-3 px-6 text-left">PROCEDURE</th>
                        <th className="py-3 px-6 text-left">REMARKS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-6">April 12, 2023</td>
                        <td className="py-3 px-6">SINOVAC</td>
                        <td className="py-3 px-6">1st Dose</td>
                        <td className="py-3 px-6">City of San Fernando, Pampanga</td>
                      </tr>
                    </tbody>
                  </table>                  {/* Pagination and Add Record Button */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                        disabled
                      >
                        <span className="text-sm">‹</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-black text-white font-medium">
                        1
                      </button>
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      >
                        <span className="text-sm">›</span>
                      </button>
                    </div>                    <button 
                      className="bg-yellow-400 text-white px-4 py-2 rounded font-medium hover:bg-yellow-500"
                    >
                      ADD RECORD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MedicalAppSidebarLayout>
  );
};

// LegendItem helper component
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16355D', fontSize: 15 }}>
    <span style={{
      display: 'inline-block',
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: color,
      border: '1.5px solid #BDBDBD',
      marginRight: 8,
    }} />
    <span>{label}</span>
  </div>
);

export default DentalRecord;
