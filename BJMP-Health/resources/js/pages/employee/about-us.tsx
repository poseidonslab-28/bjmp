import EmployeeAppSidebarLayout from '../../layouts/app/employee-app-sidebar-layout';
import { Head } from '@inertiajs/react';

interface Employee {
    Emp_ID: string;
    First_Name: string;
    Last_Name: string;
    Middle_Name?: string;
    Position?: string;
}

interface AboutUsData {
    ID: number;
    Name: string;
    Position: string;
    Picture: string;
}

interface Props {
    user: Employee;
    aboutUsData: AboutUsData[];
}

export default function AboutUs({ user, aboutUsData }: Props) {
    const getFullName = () => {
        const parts = [user?.First_Name, user?.Middle_Name, user?.Last_Name];
        return parts.filter(Boolean).join(' ');
    };

    return (
        <EmployeeAppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/employee/dashboard' },
            { title: 'About Us', href: '/employee/about-us' }
        ]}>
            <Head title="About Us" />
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
                        
                        {/* Main Content */}
                        <div className="flex-1 flex flex-col bg-white rounded-xl shadow p-8 border border-gray-200">
                            <div className="w-full">
                                <h1 className="text-4xl font-bold text-center mb-2">ABOUT US</h1>
                                <div className="text-center mb-8 text-sm text-gray-700">
                                    The Office of Health Service is an essential part of our Bureau in providing professional service, individual approach, and holistic management to our Person Deprived of Liberty (PDL) and personnel to achieve and promote wellness to the entire institution.
                                </div>
                                <div className="grid grid-cols-3 gap-y-8 gap-x-2 justify-items-center mb-12">
                                    {aboutUsData.map((person) => (
                                        <div key={person.ID} className="flex flex-col items-center">
                                            <img
                                                src={`/images/about-us/${person.Picture}`}
                                                alt={person.Name}
                                                className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-200"
                                            />
                                            <div className="font-bold text-base text-center">{person.Name}</div>
                                            <div className="text-xs text-gray-600 text-center">{person.Position}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="bg-gray-50 rounded-xl p-8 mt-8">
                                    <h2 className="text-4xl font-bold text-center mb-8">DEVELOPER TEAM</h2>
                                    <div className="text-center mb-8 text-sm text-gray-700">
                                        We are a group of passionate BSIT students major in web and mobile application development of<br />
                                        Bulacan State University - Main Campus.
                                    </div>
                                    
                                    <div className="flex flex-col items-center mb-12">
                                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-3">
                                            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="font-bold text-lg text-center">Jayson A. Batoon, MIT</div>
                                        <div className="text-sm text-gray-600 text-center">Capstone Coordinator and Adviser</div>
                                    </div>
                                    
                                    <div className="grid grid-cols-5 gap-8 justify-items-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="font-bold text-sm text-center">Abbygaille Las Pinas</div>
                                            <div className="text-xs text-gray-600 text-center">Documentation Writer</div>
                                        </div>
                                        
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="font-bold text-sm text-center">John Patrick Soliman</div>
                                            <div className="text-xs text-gray-600 text-center">Full Stack Developer</div>
                                        </div>
                                        
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="font-bold text-sm text-center">Eunice Loren T. Pelonio</div>
                                            <div className="text-xs text-gray-600 text-center">Full Stack Developer</div>
                                        </div>
                                        
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="font-bold text-sm text-center">Kyle Dayne Constantino</div>
                                            <div className="text-xs text-gray-600 text-center">Full Stack Developer</div>
                                        </div>
                                        
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="font-bold text-sm text-center">Judy Marie Santos</div>
                                            <div className="text-xs text-gray-600 text-center">Documentation Writer</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EmployeeAppSidebarLayout>
    );
}
