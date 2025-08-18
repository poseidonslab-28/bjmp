// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
            <div className="flex flex-1 justify-center items-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 flex flex-col gap-7">
                    <Head title="Forgot password" />

                    <div className="flex justify-center mb-2">
                        <img src="/images/hrms-logo.png" alt="HRMS Logo" className="h-20" />
                    </div>

                    <div className="text-center mb-4">
                        <h1 className="text-2xl font-extrabold text-[#F9A825] tracking-wide mb-1">FORGOT PASSWORD</h1>
                        <p className="text-[#1E3A5C] text-base font-medium leading-snug">
                            Reset your password securely by verifying your identity.<br />
                            Enter your registered email or phone number to regain access to your account effortlessly.
                        </p>
                    </div>

                    {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email" className="text-[#1E3A5C] font-semibold">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="example@gmail.com"
                                className="text-black border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-[#F9A825] focus:ring-0"
                            />
                            <InputError message={errors.email} />
                            <span className="text-xs text-gray-500 mt-1">Use mobile number instead</span>
                        </div>

                        <Button className="w-full bg-[#1E3A5C] hover:bg-[#163250] text-white font-bold py-3 rounded-lg text-lg tracking-wide shadow" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 inline" />}
                            Send Code
                        </Button>
                    </form>

                    <div className="text-center text-sm mt-2">
                        <span className="text-gray-500">Return to </span>
                        <TextLink href={route('login')} className="text-[#1E3A5C] font-semibold hover:underline">Login</TextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
