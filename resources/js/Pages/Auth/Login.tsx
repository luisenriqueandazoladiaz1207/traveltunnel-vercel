import React, { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
        password: '',
        remember: false,
    });

    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!recaptchaValue) {
            alert('Por favor verifica el reCAPTCHA');
            return;
        }

        post(route('login'), { onFinish: () => reset("password") });
    };

    const handleRecaptchaChange = (value: string | null) => {
        setRecaptchaValue(value);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Título con Animación */}
            <motion.h2
                className="text-3xl font-bold text-center text-white font-sans mb-4 drop-shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Acceso Seguro
            </motion.h2>

            {status && (
                <motion.div 
                    className="mb-4 text-sm font-medium text-green-400 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {status}
                </motion.div>
            )}

            <motion.form 
                onSubmit={submit} 
                className="space-y-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-white font-sans" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-black/80 text-cyan-300 border border-cyan-500 rounded-md shadow-md focus:border-cyan-400 focus:ring focus:ring-cyan-300 focus:ring-opacity-50 transition-all"
                        autoComplete="username"
                        isFocused
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-red-400" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-white font-sans" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-black/80 text-cyan-300 border border-cyan-500 rounded-md shadow-md focus:border-cyan-400 focus:ring focus:ring-cyan-300 focus:ring-opacity-50 transition-all"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-[#88B1D5] font-sans">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2">Recuérdame</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-[#88B1D5] hover:text-cyan-300 transition-colors font-sans"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <div className="mt-4">
  {/* ReCAPTCHA */}
  <ReCAPTCHA
    sitekey="6LfOYgIrAAAAAOwY-E-rPRUGSzBskPKHv_pj-jtf"  // Aquí va tu clave pública de Google reCAPTCHA
    onChange={handleRecaptchaChange}
  />
</div>


                <div className="pt-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 border border-cyan-500 text-sm font-bold rounded-md text-gray-100 bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition duration-300 font-sans"
                            disabled={processing}
                        >
                            Iniciar sesión
                        </PrimaryButton>
                    </motion.div>
                </div>
            </motion.form>
        </GuestLayout>
    );
}
