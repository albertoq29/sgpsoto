import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';



export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400">
            <Head title="Iniciar sesión" />
            
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
                {/* Logo */}
                <img
                    src="https://i.ibb.co/L1Fvkpf/LOGO-NEGROFINAL-1.png"
                    alt="Logo SGPSOTO"
                    className="w-60 mx-auto mb-45"
                />

                {/* Mensaje de bienvenida */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido a <span className="text-gray-600">SGPSOTO</span></h1>
                <p className="text-gray-600 mb-8">Plataforma de control de pagos</p>

                {/* Estado de notificación */}
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Correo electrónico */}
                    <div>
                        <InputLabel htmlFor="email" value="Correo electrónico" className="text-left" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" className="text-left" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Recordarme y enlace de contraseña */}
                    <div className="flex items-center justify-between">
 
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>

                    {/* Botón de inicio de sesión */}
                    <div>
                    <PrimaryButton
                        className="w-auto px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition focus:ring-4 focus:ring-gray-500 mx-auto block"
                        disabled={processing}
                    >
                        Iniciar sesión
                    </PrimaryButton>

                    </div>
                </form>
            </div>
        </div>

        
    );
}
