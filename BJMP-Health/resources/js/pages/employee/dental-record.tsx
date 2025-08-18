import React, { useState } from "react";
import EmployeeAppSidebarLayout from "../../layouts/app/employee-app-sidebar-layout";
import { Head } from "@inertiajs/react";

interface Employee {
  Emp_ID: string;
  First_Name: string;
  Last_Name: string;
  Middle_Name?: string;
  Position?: string;
}

interface DentalRecord {
  ID: number;
  Patient_ID: string;
  Emp_ID: string;
  18?: string; 17?: string; 16?: string; 15?: string; 14?: string; 13?: string; 12?: string; 11?: string;
  21?: string; 22?: string; 23?: string; 24?: string; 25?: string; 26?: string; 27?: string; 28?: string;
  48?: string; 47?: string; 46?: string; 45?: string; 44?: string; 43?: string; 42?: string; 41?: string;
  31?: string; 32?: string; 33?: string; 34?: string; 35?: string; 36?: string; 37?: string; 38?: string;
}

interface Props {
  user: Employee;
  dentalRecord?: DentalRecord;
}

const TOOTH_CONDITIONS = {
  '': { color: '#fff', label: 'Present', code: '/' },
  'M': { color: '#000', label: 'Missing', code: '(M)' },
  'RF': { color: '#FF2D2D', label: 'Root Fragment', code: '(RF)' },
  'O': { color: '#1A5AFF', label: 'Restoration', code: '(O)' },
  'I': { color: '#E600FF', label: 'Impacted', code: '(I)' },
  'P': { color: '#3DD365', label: 'FPD/Jacket Crown', code: '(P)' },
  'C': { color: '#F6FF2E', label: 'Caries', code: '(C)' },
};

const COLOR_TO_CONDITION: { [key: string]: string } = {
  'lightgrey': '', // Present
  'black': 'M', // Missing
  'red': 'RF', // Root Fragment
  'blue': 'O', // Restoration
  'magenta': 'I', // Impacted
  'green': 'P', // FPD/Jacket Crown
  'gold': 'C', // Caries
  // Add any other color mappings as needed
};

const DentalRecord: React.FC<Props> = ({ user, dentalRecord }) => {
  const [verticalChart, setVerticalChart] = useState(false);

  const getFullName = () => {
    const parts = [user?.First_Name, user?.Middle_Name, user?.Last_Name];
    return parts.filter(Boolean).join(' ');
  };

  const getToothColor = (toothNumber: string) => {
    const dbValue = dentalRecord?.[toothNumber as keyof DentalRecord] as string || '';
    const conditionCode = COLOR_TO_CONDITION[dbValue] || '';
    return TOOTH_CONDITIONS[conditionCode as keyof typeof TOOTH_CONDITIONS]?.color || '#fff';
  };

  const getToothCondition = (toothNumber: string) => {
    const dbValue = dentalRecord?.[toothNumber as keyof DentalRecord] as string || '';
    const conditionCode = COLOR_TO_CONDITION[dbValue] || '';
    return TOOTH_CONDITIONS[conditionCode as keyof typeof TOOTH_CONDITIONS]?.label || 'Present';
  };

  const Tooth = ({ number, className = "" }: { number: string; className?: string }) => {
    const color = getToothColor(number);
    const condition = getToothCondition(number);
    
    return (
      <div 
        className={`relative ${className}`}
        style={{ minWidth: '32px', minHeight: '32px' }}
      >
        <div
          className="w-8 h-8 border border-gray-400 flex items-center justify-center text-xs font-medium cursor-pointer hover:scale-110 transition-transform"
          style={{ 
            backgroundColor: color,
            color: color === '#F6FF2E' || color === '#fff' ? '#000' : '#fff'
          }}
          title={`Tooth ${number}: ${condition}`}
        >
          {number}
        </div>
      </div>
    );
  };

  const renderDentalChart = () => {
    if (verticalChart) {
      return (
        <div className="relative w-96 h-96 mx-auto">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-1">
              <Tooth number="18" />
              <Tooth number="17" />
              <Tooth number="16" />
              <Tooth number="15" />
              <Tooth number="14" />
              <Tooth number="13" />
              <Tooth number="12" />
              <Tooth number="11" />
              <Tooth number="21" />
              <Tooth number="22" />
              <Tooth number="23" />
              <Tooth number="24" />
              <Tooth number="25" />
              <Tooth number="26" />
              <Tooth number="27" />
              <Tooth number="28" />
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-1">
              <Tooth number="48" />
              <Tooth number="47" />
              <Tooth number="46" />
              <Tooth number="45" />
              <Tooth number="44" />
              <Tooth number="43" />
              <Tooth number="42" />
              <Tooth number="41" />
              <Tooth number="31" />
              <Tooth number="32" />
              <Tooth number="33" />
              <Tooth number="34" />
              <Tooth number="35" />
              <Tooth number="36" />
              <Tooth number="37" />
              <Tooth number="38" />
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gray-400"></div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium mr-4">Left</span>
              <div className="flex gap-1">
                <Tooth number="18" />
                <Tooth number="17" />
                <Tooth number="16" />
                <Tooth number="15" />
                <Tooth number="14" />
                <Tooth number="13" />
                <Tooth number="12" />
                <Tooth number="11" />
              </div>
              <div className="w-px h-8 bg-gray-400 mx-2"></div>
              <div className="flex gap-1">
                <Tooth number="21" />
                <Tooth number="22" />
                <Tooth number="23" />
                <Tooth number="24" />
                <Tooth number="25" />
                <Tooth number="26" />
                <Tooth number="27" />
                <Tooth number="28" />
              </div>
              <span className="text-sm font-medium ml-4">Right</span>
            </div>
          </div>
          
          {/* Lower teeth */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium mr-4">Left</span>
              <div className="flex gap-1">
                <Tooth number="48" />
                <Tooth number="47" />
                <Tooth number="46" />
                <Tooth number="45" />
                <Tooth number="44" />
                <Tooth number="43" />
                <Tooth number="42" />
                <Tooth number="41" />
              </div>
              <div className="w-px h-8 bg-gray-400 mx-2"></div>
              <div className="flex gap-1">
                <Tooth number="31" />
                <Tooth number="32" />
                <Tooth number="33" />
                <Tooth number="34" />
                <Tooth number="35" />
                <Tooth number="36" />
                <Tooth number="37" />
                <Tooth number="38" />
              </div>
              <span className="text-sm font-medium ml-4">Right</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <EmployeeAppSidebarLayout breadcrumbs={[
      { title: 'Dashboard', href: '/employee/dashboard' },
      { title: 'Dental Record', href: '/employee/dental-record' }
    ]}>
      <Head title="Dental Record" />
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
            <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-200">
              <div className="w-full max-w-4xl">
                <div className="font-bold text-xl mb-6">DENTAL RECORD</div>
                <div style={{ background: '#F5F6FA', borderRadius: 12, padding: '2rem', marginBottom: 24, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ minWidth: 220 }}>
                      <div style={{ fontWeight: 700, color: '#16355D', fontSize: 18, marginBottom: 16 }}>Dental Chart</div>
                    </div>
                    
                    <div style={{ minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
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
                      {verticalChart && (
                        <button style={{ 
                          background: '#FFAB2ECC', 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: 6, 
                          padding: '8px 16px', 
                          fontWeight: 600, 
                          fontSize: 14,
                          marginTop: 8
                        }}>
                          PRINT DR2
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16 }}>
                    {renderDentalChart()}
                    
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: 24 }}>
                      <div style={{ color: '#16355D', fontWeight: 600, fontSize: 14, marginBottom: 8, marginRight: 32 }}>LEGEND:</div>
                      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <LegendItem color="#fff" label="Present (/)" />
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
                    
                    {!verticalChart && (
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button style={{ 
                          background: '#FFAB2ECC', 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: 6, 
                          padding: '10px 32px', 
                          fontWeight: 600, 
                          fontSize: 16 
                        }}>
                          PRINT DR1
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl shadow p-6">
                  <div className="font-bold text-lg mb-4">Dental Treatment Record</div>
                  <div className="flex items-center gap-2 mb-4 justify-end">
                    <input type="text" className="border rounded px-2 py-2" placeholder="Search" />
                  </div>                  <table className="min-w-full">
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
                    </tbody>                  </table>
                  <div className="flex items-center gap-2 mt-4">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployeeAppSidebarLayout>
  );
};

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
