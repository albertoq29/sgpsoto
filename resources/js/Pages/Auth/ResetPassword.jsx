import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400">
            <Head title="Restablecer Contraseña" />

            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
                {/* Logo */}
                <img
                    src="https://i.ibb.co/L1Fvkpf/LOGO-NEGROFINAL-1.png"
                    alt="Logo SGCOMCAR"
                    className="w-60 mx-auto mb-6"
                />

                {/* Título */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Restablecer Contraseña</h1>
                <p className="text-gray-600 mb-6">Por favor ingresa tu nueva contraseña.</p>

                {/* Formulario */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Correo electrónico */}
                    <div>
                        <InputLabel htmlFor="email" value="Correo Electrónico" className="text-left" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="username"
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
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirmación de Contraseña */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmar Contraseña"
                            className="text-left"
                        />
                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {/* Botón de restablecer contraseña */}
                    <div className="mt-4">
                        <PrimaryButton
                            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition focus:ring-4 focus:ring-gray-500"
                            disabled={processing}
                        >
                            Restablecer Contraseña
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
