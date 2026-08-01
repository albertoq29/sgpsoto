import React, { useRef, useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function ModifyUsers({ users, auth, flash }) {
    const [confirmingAction, setConfirmingAction] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [action, setAction] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const passwordInput = useRef();

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    // Mostrar SweetAlert cuando hay mensajes flash
    useEffect(() => {
        if (flash && flash.success) {
            Swal.fire({
                title: '¡Éxito!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });
        } else if (flash && flash.error) {
            Swal.fire({
                title: 'Error',
                text: flash.error,
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            });
        }
    }, [flash]);

    const openModal = (user, action) => {
        setCurrentUser(user);
        setAction(action);
        setConfirmingAction(true);
    };

    const showSuccessAlert = (message) => {
        Swal.fire({
            title: '¡Completado!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
    };

    const showErrorAlert = (message) => {
        Swal.fire({
            title: 'Error',
            text: message || 'Ha ocurrido un error al procesar tu solicitud.',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        });
    };

    const confirmAction = (e) => {
        e.preventDefault();
        
        const actionMessages = {
            assignAdmin: {
                success: `${currentUser.name} ha sido asignado como administrador exitosamente.`,
                error: 'No se pudo asignar el rol de administrador.'
            },
            deleteUser: {
                success: `El usuario ${currentUser.name} ha sido eliminado exitosamente.`,
                error: 'No se pudo eliminar el usuario.'
            },
            removeAdmin: {
                success: `${currentUser.name} ya no es administrador.`,
                error: 'No se pudo modificar el rol de administrador.'
            }
        };

        if (action === 'assignAdmin') {
            post(route('assign-admin', currentUser.id), {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    showSuccessAlert(actionMessages.assignAdmin.success);
                },
                onError: (errors) => {
                    passwordInput.current.focus();
                    if (errors.password) {
                        showErrorAlert(errors.password);
                    } else {
                        showErrorAlert(actionMessages.assignAdmin.error);
                    }
                },
                onFinish: reset,
            });
        } else if (action === 'deleteUser') {
            // Confirmar eliminación con SweetAlert
            Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Realmente deseas eliminar al usuario ${currentUser.name}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    destroy(route('delete-user', currentUser.id), {
                        preserveScroll: true,
                        onSuccess: () => {
                            closeModal();
                            showSuccessAlert(actionMessages.deleteUser.success);
                        },
                        onError: (errors) => {
                            passwordInput.current.focus();
                            if (errors.password) {
                                showErrorAlert(errors.password);
                            } else {
                                showErrorAlert(actionMessages.deleteUser.error);
                            }
                        },
                        onFinish: reset,
                    });
                }
            });
        } else if (action === 'removeAdmin') {
            post(route('remove-admin', currentUser.id), {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    showSuccessAlert(actionMessages.removeAdmin.success);
                },
                onError: (errors) => {
                    passwordInput.current.focus();
                    if (errors.password) {
                        showErrorAlert(errors.password);
                    } else {
                        showErrorAlert(actionMessages.removeAdmin.error);
                    }
                },
                onFinish: reset,
            });
        }
    };

    const closeModal = () => {
        setConfirmingAction(false);
        reset();
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cedula.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const adminUsers = filteredUsers.filter(user => user.rol === 1);
    const regularUsers = filteredUsers.filter(user => user.rol !== 1);

    const handleSearch = (e) => {
        e.preventDefault();
        // La búsqueda ya se actualiza automáticamente con el estado searchTerm
        Swal.fire({
            title: 'Búsqueda aplicada',
            text: searchTerm ? `Mostrando resultados para "${searchTerm}"` : 'Mostrando todos los usuarios',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const renderUserCard = (user, isAdmin) => (
        <div key={user.id} className="bg-white rounded-lg shadow-md p-5 mb-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-blue-800">{user.name}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {isAdmin ? 'Administrador' : 'Usuario'}
                    </span>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                    <p className="flex items-center"><span className="w-16 inline-block font-medium">Email:</span> {user.email}</p>
                    <p className="flex items-center"><span className="w-16 inline-block font-medium">Cédula:</span> {user.cedula}</p>
                </div>
                <div className="pt-4 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                    {isAdmin ? (
                        user.email !== 'sgcomcar@gmail.com' && (
                            <DangerButton onClick={() => openModal(user, 'removeAdmin')} className="w-full sm:w-auto transition-colors duration-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Convertir a Usuario
                            </DangerButton>
                        )
                    ) : (
                        <>
                            <PrimaryButton onClick={() => openModal(user, 'assignAdmin')} className="w-full sm:w-auto transition-colors duration-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Asignar como Admin
                            </PrimaryButton>
                            <DangerButton onClick={() => openModal(user, 'deleteUser')} className="w-full sm:w-auto transition-colors duration-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar Usuario
                            </DangerButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modificar Usuarios</h2>}
        >
            <Head title="Modificar Usuarios" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-blue-800 pb-2 border-b border-gray-200">Gestión de Usuarios</h2>
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <TextInput
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por nombre o cédula"
                                    className="pl-10 w-full focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <PrimaryButton type="submit" className="w-full sm:w-auto">
                                Buscar
                            </PrimaryButton>
                        </form>
                    </div>

                    {filteredUsers.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
                            <p className="text-gray-600">No hay usuarios que coincidan con tu búsqueda "{searchTerm}"</p>
                            {searchTerm && (
                                <PrimaryButton onClick={() => setSearchTerm('')} className="mt-4">
                                    Mostrar todos los usuarios
                                </PrimaryButton>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Desktop View */}
                            <div className="hidden md:block">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">Nombre</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">Rol</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {adminUsers.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="5" className="text-lg font-bold bg-blue-50 text-blue-800 px-6 py-3">
                                                            Administradores ({adminUsers.length})
                                                        </td>
                                                    </tr>
                                                    {adminUsers.map((user) => (
                                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                                    Administrador
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {user.email !== 'sgcomcar@gmail.com' && (
                                                                    <DangerButton onClick={() => openModal(user, 'removeAdmin')} className="transition-colors duration-300 flex items-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                        Convertir a Usuario
                                                                    </DangerButton>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}
                                            {regularUsers.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="5" className="text-lg font-bold bg-gray-50 text-gray-800 px-6 py-3">
                                                            Usuarios ({regularUsers.length})
                                                        </td>
                                                    </tr>
                                                    {regularUsers.map((user) => (
                                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                                                    Usuario
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                                                <PrimaryButton onClick={() => openModal(user, 'assignAdmin')} className="transition-colors duration-300 flex items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                                    </svg>
                                                                    Asignar como Admin
                                                                </PrimaryButton>
                                                                <DangerButton onClick={() => openModal(user, 'deleteUser')} className="transition-colors duration-300 flex items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    Eliminar Usuario
                                                                </DangerButton>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile View */}
                            <div className="md:hidden space-y-6">
                                {adminUsers.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 bg-blue-50 text-blue-800 p-3 rounded-lg shadow-sm">
                                            Administradores ({adminUsers.length})
                                        </h3>
                                        <div className="space-y-4">
                                            {adminUsers.map((user) => renderUserCard(user, true))}
                                        </div>
                                    </div>
                                )}
                                {regularUsers.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 bg-gray-50 text-gray-800 p-3 rounded-lg shadow-sm">
                                            Usuarios ({regularUsers.length})
                                        </h3>
                                        <div className="space-y-4">
                                            {regularUsers.map((user) => renderUserCard(user, false))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <Modal show={confirmingAction} onClose={closeModal}>
                        <form onSubmit={confirmAction} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                {action === 'assignAdmin' ? 'Asignar como Admin' : 
                                 action === 'deleteUser' ? 'Eliminar Usuario' : 'Convertir a Usuario'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                {action === 'assignAdmin'
                                    ? 'Por favor, confirma tu contraseña para asignar a este usuario como administrador.'
                                    : action === 'deleteUser'
                                    ? 'Por favor, confirma tu contraseña para eliminar a este usuario.'
                                    : 'Por favor, confirma tu contraseña para convertir a este administrador en usuario.'}
                            </p>
                            <div className="mt-4">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="Contraseña"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
                                <SecondaryButton onClick={closeModal}>
                                    Cancelar
                                </SecondaryButton>
                                <PrimaryButton disabled={processing}>
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </>
                                    ) : 'Confirmar'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}