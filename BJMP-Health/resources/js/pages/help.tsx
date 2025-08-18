import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface HelpData {
    ID: number;
    Date: string;
    Doc_Name: string;
    Doc_File: string;
}

interface Props {
    helpData: HelpData[];
}

export default function Help({ helpData }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return (
        <AppLayout breadcrumbs={[{ title: 'Help', href: '/help' }]}>
            <Head title="Help" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex flex-col py-10 px-0">
                    <div className="flex justify-between items-center mb-6 px-14">
                        <h1 className="text-3xl font-bold">HELP</h1>
                        <button className="bg-blue-900 text-white px-5 py-2 rounded text-sm font-semibold">
                            UPLOAD FILE
                        </button>
                    </div>
                    <div className="px-14">
                        {helpData.length > 0 ? (
                            <div className="space-y-4">
                                {helpData.map((help) => (
                                    <div key={help.ID} className="bg-white rounded-lg shadow-md p-5 min-w-[300px] max-w-full" style={{ boxShadow: '0 4px 8px 0 #00000014' }}>
                                        <div className="mb-3">
                                            <div className="text-sm text-gray-500 mb-1">
                                                Uploaded on: {formatDate(help.Date)}
                                            </div>
                                            <div className="mb-2 text-sm">
                                                Click the link below to download the PDF file:
                                            </div>
                                        </div>
                                        <a
                                            href={`/help-files/${help.Doc_File}`}
                                            className="flex items-center gap-2 text-black font-medium hover:underline text-sm"
                                            download
                                        >
                                            <img src="/icons/pdf.png" alt="PDF" className="w-5 h-5" />
                                            {help.Doc_Name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center" style={{ boxShadow: '0 4px 8px 0 #00000014' }}>
                                <div className="text-gray-500 text-lg mb-2">No help documents available</div>
                                <div className="text-gray-400 text-sm">Please upload help documents using the "UPLOAD FILE" button.</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}