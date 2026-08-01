import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-zÑñÁÉÍÓÚáéíóú\s]*$/;
        if (regex.test(value)) {
            setData('name', value);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400">
            <Head title="Registro" />
            
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
                <img
                    src="https://i.ibb.co/L1Fvkpf/LOGO-NEGROFINAL-1.png"
                    alt="Logo SGPSOTO"
                    className="w-60 mx-auto mb-6"
                />
                
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Registrarse en <span className="text-gray-600">SGPSOTO</span></h1>
                <p className="text-gray-600 mb-8">Plataforma de control de pagos</p>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="name"
                            isFocused={true}
                            onChange={handleNameChange}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Correo Electrónico" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            ¿Ya tienes cuenta?
                        </Link>

                        <PrimaryButton className="py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition focus:ring-4 focus:ring-gray-500" disabled={processing}>
                            Registrarse
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
