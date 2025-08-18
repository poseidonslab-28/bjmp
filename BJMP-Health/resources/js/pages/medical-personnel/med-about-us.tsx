import MedicalAppSidebarLayout from '@/layouts/app/medical-app-sidebar-layout';
import { Head } from '@inertiajs/react';

interface AboutUsData {
    ID: number;
    Name: string;
    Position: string;
    Picture: string;
}

interface Props {
    aboutUsData: AboutUsData[];
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
};

export default function AboutUs({ aboutUsData }: Props) {
    return (
        <MedicalAppSidebarLayout>
            <Head title="About Us" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex flex-col py-10 px-0">
                    <div className="px-14">
                        <div className="bg-white rounded-xl shadow-md p-10 max-w-full">
                            <h1 className="text-4xl font-bold text-center mb-2">ABOUT US</h1>
                            <div className="text-center mb-8 text-sm text-gray-700">
                                The Office of Health Service is an essential part of our Bureau in providing professional service, individual approach, and holistic management to our Person Deprived of Liberty (PDL) and personnel to achieve and promote wellness to the entire institution.
                            </div>
                            <div className="grid grid-cols-3 gap-y-8 gap-x-2 justify-items-center">
                                {aboutUsData.map((person) => (
                                    <div key={person.ID} className="flex flex-col items-center">
                                        {person.Picture ? (
                                            <img
                                                src={`/images/about-us/${person.Picture}`}
                                                alt={person.Name}
                                                className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-2 border-2 border-gray-200">
                                                <span className="text-gray-600 text-lg font-semibold">
                                                    {getInitials(person.Name)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="font-bold text-base text-center">{person.Name}</div>
                                        <div className="text-xs text-gray-600 text-center">{person.Position}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Developer Team Section */}
                        <div className="bg-white rounded-xl shadow-md p-10 max-w-full mt-8">
                            <h2 className="text-4xl font-bold text-center mb-8">DEVELOPER TEAM</h2>
                            <div className="text-center mb-8 text-sm text-gray-700">
                                We are a group of passionate BSIT students major in web and mobile application development of<br />
                                Bulacan State University - Main Campus.
                            </div>
                            
                            {/* Coordinator */}
                            <div className="flex flex-col items-center mb-12">
                                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="font-bold text-lg text-center">Jayson A. Batoon, MIT</div>
                                <div className="text-sm text-gray-600 text-center">Capstone Coordinator and Adviser</div>
                            </div>
                            
                            {/* Developer Team Grid */}
                            <div className="grid grid-cols-5 gap-8 justify-items-center">
                                {[
                                    { name: 'Abbygaille Las Pinas', role: 'Documentation Writer' },
                                    { name: 'John Patrick Soliman', role: 'Full Stack Developer' },
                                    { name: 'Eunice Loren T. Pelonio', role: 'Full Stack Developer' },
                                    { name: 'Kyle Dayne Constantino', role: 'Full Stack Developer' },
                                    { name: 'Judy Marie Santos', role: 'Documentation Writer' },
                                ].map((member, idx) => (
                                    <div key={idx} className="flex flex-col items-center">
                                        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                            <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="font-bold text-sm text-center">{member.name}</div>
                                        <div className="text-xs text-gray-600 text-center">{member.role}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MedicalAppSidebarLayout>
    );
}
