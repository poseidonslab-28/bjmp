import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";

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
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [docName, setDocName] = useState("");
    const [helpList, setHelpList] = useState<HelpData[]>(helpData);
    const [successMessage, setSuccessMessage] = useState("");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const [isUploading, setIsUploading] = useState(false);



    const props = usePage().props;

    console.log("All Inertia props:", props); // ✅ Logs everything
    console.log("Flash messages:", (props as any).flash || {}); // Only flash messagesÍ

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !docName) return alert("Please provide a name and file.");

        console.log("Uploading file info:", {
            name: file.name,
            type: file.type,
            size: file.size,
        });

        const formData = new FormData();
        formData.append("Doc_Name", docName);
        formData.append("Doc_File", file);

        setIsUploading(true);

        router.post("/help/upload", formData, {
            forceFormData: true,
            onSuccess: (page) => {
                const updatedHelpData = page.props.helpData as HelpData[];
                setHelpList(updatedHelpData);  // auto-refresh list
                setShowModal(false);
                setDocName("");
                setFile(null);
            },
            onError: (errors) => {
                console.log("Upload errors:", errors);
            },
            onFinish: () => setIsUploading(false),
        });
    };



    return (
        <AppLayout breadcrumbs={[{ title: "Help", href: "/help" }]}>
            <Head title="Help" />
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-1 flex flex-col py-10 px-0">
                    <div className="flex justify-between items-center mb-6 px-14">
                        <h1 className="text-3xl font-bold text-black">HELP</h1>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-900 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-blue-800 transition"
                        >
                            UPLOAD FILE
                        </button>
                    </div>

                    {/* Success message toast */}
                    {successMessage && (
                        <div className="bg-green-200 text-black p-3 rounded mb-4 mx-14">
                            {successMessage}
                        </div>
                    )}

                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl font-bold mb-4 text-black">Upload Help File</h2>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Document Name"
                                        value={docName}
                                        onChange={(e) => setDocName(e.target.value)}
                                        className="border p-2 rounded text-black"
                                    />
                                    <input
                                        type="file"
                                        name="Doc_File"
                                        accept=".pdf"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="border p-2 rounded text-black"
                                    />

                                    <div className="flex justify-end gap-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 bg-gray-300 rounded text-black"
                                            disabled={isUploading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-900 text-white rounded text-black flex items-center gap-2"
                                            disabled={isUploading}
                                        >
                                            {isUploading && (
                                                <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            )}
                                            {isUploading ? "Uploading..." : "Upload"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}


                    <div className="px-14">
                        {helpList.length > 0 ? (
                            <div className="space-y-4">
                                {helpList.map((help) => (
                                    <div
                                        key={help.ID}
                                        className="bg-white rounded-lg shadow-md p-5 min-w-[300px] max-w-full text-black"
                                        style={{ boxShadow: "0 4px 8px 0 #00000014" }}
                                    >
                                        <div className="mb-3">
                                            <div className="text-sm text-gray-500 mb-1 text-black">
                                                Uploaded on: {formatDate(help.Date)}
                                            </div>
                                            <div className="mb-2 text-sm">
                                                Click the link below to download the PDF file:
                                            </div>
                                        </div>
                                        <a
                                            href={`/help-files/${help.Doc_File}`}
                                            className="flex items-center gap-2 text-black font-medium hover:underline text-sm text-black"
                                            download
                                        >
                                            <img src="/icons/pdf.png" alt="PDF" className="w-5 h-5" />
                                            {help.Doc_Name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="bg-white rounded-lg shadow-md p-8 text-center"
                                style={{ boxShadow: "0 4px 8px 0 #00000014" }}
                            >
                                <div className="text-gray-500 text-lg mb-2 text-black">
                                    No help documents available
                                </div>
                                <div className="text-gray-400 text-sm text-black">
                                    Please upload help documents using the "UPLOAD FILE" button.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
