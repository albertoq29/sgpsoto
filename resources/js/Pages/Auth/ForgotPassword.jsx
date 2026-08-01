import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400">
            <Head title="Olvidé mi Contraseña" />

            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
                {/* Logo */}
                <img
                    src="https://i.ibb.co/L1Fvkpf/LOGO-NEGROFINAL-1.png"
                    alt="Logo SGSOTO"
                    className="w-60 mx-auto mb-8"
                />

                {/* Mensaje de recuperación */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Recupera tu Contraseña</h1>
                <p className="text-gray-600 mb-8">
                    ¿Olvidaste tu contraseña? Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
                </p>

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
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            placeholder="Correo electrónico"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Botón para enviar enlace de restablecimiento */}
                    <div>
                        <PrimaryButton
                            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition focus:ring-4 focus:ring-gray-500"
                            disabled={processing}
                        >
                            Enviar Enlace para Restablecer Contraseña
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
