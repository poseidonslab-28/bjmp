import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Help() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Help', href: '/medical/help' }]}> 
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
                        <div className="bg-white rounded-lg shadow-md p-5 min-w-[300px] max-w-full" style={{ boxShadow: '0 4px 8px 0 #00000014' }}>
                            <div className="mb-2 text-sm">
                                Click the link below to download the PDF file:
                            </div>
                            <a
                                href="/sample.pdf"
                                className="text-blue-700 underline text-sm"
                                download
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
