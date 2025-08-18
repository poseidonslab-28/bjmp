import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
// import { useState } from 'react'; // Temporarily disabled
// import ReCAPTCHA from 'react-google-recaptcha'; // Temporarily disabled

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginProps = {
    status?: string;
    canResetPassword?: boolean;
};

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        emp_id: string;
        password: string;
        remember: boolean;
        recaptcha?: string;
    }>({
        emp_id: '',
        password: '',
        remember: false,
        recaptcha: '',
    });

    // const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null); // Temporarily disabled

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Temporarily disabled reCAPTCHA for testing
        // if (!recaptchaToken) {
        //     alert('Please complete the reCAPTCHA.');
        //     return;
        // }

        // setData('recaptcha', recaptchaToken);

        post('/login', {
            onFinish: () => {
                reset('password');
                // setRecaptchaToken(null); // Temporarily disabled
            },
        });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('/images/bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <form
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 flex flex-col gap-7"
                onSubmit={submit}
            >
                <Head title="Log in" />

                <div className="flex justify-center mb-2">
                    <img src="/images/hrms-logo.png" alt="HRMS Logo" className="h-20" />
                </div>

                <div className="text-center mb-4">
                    <h1 className="text-2xl font-extrabold text-[#F9A825] tracking-wide mb-1">LOGIN TO YOUR ACCOUNT</h1>
                    <p className="text-[#1E3A5C] text-base font-medium leading-snug">
                        Access your account securely by entering your account credentials to manage your documents and monitor your workflows effortlessly.
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="emp_id" className="text-[#1E3A5C] font-semibold">ID Number</Label>
                    <Input
                        id="emp_id"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="username"
                        value={data.emp_id}
                        onChange={(e) => setData('emp_id', e.target.value)}
                        placeholder="Enter your Employee ID"
                        className="text-black border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-[#F9A825] focus:ring-0"
                    />
                    <InputError message={errors.emp_id} />
                </div>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="password" className="text-[#1E3A5C] font-semibold">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Password"
                        className="text-black border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-[#F9A825] focus:ring-0"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={checked => setData('remember', checked === true)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember" className="ml-2 text-[#1E3A5C] font-medium">Remember me</Label>
                    </div>
                    {canResetPassword && (
                        <TextLink href={route('password.request')} className="text-sm text-[#1E3A5C] font-semibold hover:underline" tabIndex={5}>
                            Forgot Password?
                        </TextLink>
                    )}
                </div>

                {/* Temporarily disabled reCAPTCHA for testing */}
                {/* <div className="flex justify-center mt-2 mb-2">
                    <div className="w-full flex flex-col items-center">
                        <ReCAPTCHA
                            sitekey="6Let7hcrAAAAAKFiOzlh5VET4aoLLPQjVKkxDINo"
                            onChange={(token: string | null) => setRecaptchaToken(token)}
                        />
                        <InputError message={errors.recaptcha} />
                    </div>
                </div> */}

                <Button
                    type="submit"
                    className="mt-2 w-full bg-[#1E3A5C] hover:bg-[#163250] text-white font-bold py-3 rounded-lg text-lg tracking-wide shadow"
                    tabIndex={4}
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 inline" />}
                    LOGIN
                </Button>

                {status && <div className="mb-2 text-center text-sm font-medium text-green-600">{status}</div>}
            </form>
        </div>
    );
}
