import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface AboutUsData {
    ID: number;
    Name: string;
    Position: string;
    Picture: string;
}

interface Props {
    aboutUsData: AboutUsData[];
}

export default function AboutUs({ aboutUsData }: Props) {


    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing } = useForm({
        name: "",
        position: "",
        picture: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/about-us/insert", {
            onSuccess: () => {
                setShowForm(false); // 👈 close modal
                setData({ name: "", position: "", picture: "" }); // reset form
            },
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'About Us', href: '/about-us' }]}>
            <Head title="About Us" />


            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex flex-col py-10 px-0">

                    {/* Add Person Button */}
                    <div className="flex justify-end mb-4 px-14">
                        <button
                            onClick={() => setShowForm(true)} // 👈 open modal
                            className="bg-gray-200 text-black px-5 py-2 rounded text-sm font-semibold"
                        >
                            ADD PERSON
                        </button>
                    </div>

                    {/* Form Modal */}
                    {showForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
                                <h2 className="text-xl font-bold mb-4 text-black">Add New Person</h2>

                                <form onSubmit={submit}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="w-full border p-2 rounded mb-3 text-black"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="position"
                                        placeholder="Position"
                                        value={data.position}
                                        onChange={(e) => setData("position", e.target.value)}
                                        className="w-full border p-2 rounded mb-3 text-black"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="picture"
                                        placeholder="Picture (URL or filename)"
                                        value={data.picture}
                                        onChange={(e) => setData("picture", e.target.value)}
                                        className="w-full border p-2 rounded mb-3 text-black"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="px-4 py-2 bg-gray-300 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-blue-600 text-white rounded"
                                        >
                                            {processing ? "Saving…" : "Save"}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    )}

                    <div className="px-14">

                        {/* About Us Section */}
                        <div className="bg-white rounded-xl shadow-md p-10 max-w-full">
                            <h1 className="text-4xl font-bold text-center mb-2 text-black">
                                ABOUT US
                            </h1>
                            <div className="text-center mb-8 text-sm text-gray-700">
                                The Office of Health Service is an essential part of our Bureau in providing
                                professional service, individual approach, and holistic management to our Person
                                Deprived of Liberty (PDL) and personnel to achieve and promote wellness to the
                                entire institution.
                            </div>
                            <div className="grid grid-cols-3 gap-y-8 gap-x-2 justify-items-center">
                                {aboutUsData.map((person) => (
                                    <div key={person.ID} className="flex flex-col items-center text-black">
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
                        </div>

                        {/* Developer Team Section */}
                        <div className="bg-white rounded-xl shadow-md p-10 max-w-full mt-8">
                            <h2 className="text-4xl font-bold text-center mb-8 text-black">
                                DEVELOPER TEAM
                            </h2>
                            <div className="text-center mb-8 text-sm text-gray-700">
                                We are a group of passionate BSIT students major in web and mobile application
                                development of<br />
                                Bulacan State University - Main Campus.
                            </div>

                            {/* Coordinator */}
                            <div className="flex flex-col items-center mb-12">
                                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="font-bold text-lg text-center text-black">Jayson A. Batoon, MIT</div>
                                <div className="text-sm text-gray-600 text-center">
                                    Capstone Coordinator and Adviser
                                </div>
                            </div>

                            {/* Developer Team Grid */}
                            <div className="grid grid-cols-5 gap-8 justify-items-center">

                                {/* Dev 1 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                        <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="font-bold text-sm text-center text-black">Abbygaille Las Pinas</div>
                                    <div className="text-xs text-gray-600 text-center">Documentation Writer</div>
                                </div>

                                {/* Dev 2 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                        <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="font-bold text-sm text-center text-black">John Patrick Soliman</div>
                                    <div className="text-xs text-gray-600 text-center">Full Stack Developer</div>
                                </div>

                                {/* Dev 3 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                        <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="font-bold text-sm text-center text-black">Eunice Loren T. Pelonio</div>
                                    <div className="text-xs text-gray-600 text-center">Full Stack Developer</div>
                                </div>

                                {/* Dev 4 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                        <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="font-bold text-sm text-center text-black">Kyle Dayne Constantino</div>
                                    <div className="text-xs text-gray-600 text-center">Full Stack Developer</div>
                                </div>

                                {/* Dev 5 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                        <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="font-bold text-sm text-center text-black">Judy Masdasarie Santos</div>
                                    <div className="text-xs text-gray-600 text-center">Documentation Writer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
