import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    // Función para bloquear caracteres no deseados en el campo de "Nombre", permitiendo letras y espacios, incluidas la "ñ"
    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-ZñÑ\s]/g, '');  // Permitimos "ñ" y "Ñ"
        setData('name', value);
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-3xl font-semibold text-gray-900">Información del perfil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Actualiza la información de tu cuenta, incluyendo tu nombre y correo electrónico.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Campo de Nombre */}
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
                        value={data.name}
                        onChange={handleNameChange} // Validación en tiempo real
                        required
                        isFocused
                        autoComplete="name"
                        placeholder="Escribe tu nombre completo"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Campo de Correo Electrónico */}
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Introduce tu correo electrónico"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Verificación de Correo Electrónico */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Tu correo electrónico no está verificado.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-indigo-600 hover:text-indigo-700"
                            >
                                Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm text-green-600">
                                Se ha enviado un nuevo enlace de verificación a tu correo electrónico.
                            </div>
                        )}
                    </div>
                )}

                {/* Botón de Guardar y Estado de Éxito */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-200"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
