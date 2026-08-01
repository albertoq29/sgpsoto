import React from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default function Index({ auth, incidencias }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('incidencias.destroy', id), {
                    onSuccess: () => {
                        Swal.fire(
                            '¡Eliminado!',
                            'La incidencia ha sido eliminada.',
                            'success'
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Incidencias</h2>}
        >
            <Head title="Incidencias" />

            <div className="py-6 sm:py-12">
                <div className="max-w-7xl mx-auto space-y-4 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                            <h3 className="text-lg sm:text-2xl font-bold text-gray-700">Lista de Incidencias</h3>
                            <Link
                                href={route('incidencias.create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base py-2 px-4 rounded-md transition duration-150"
                            >
                                Reportar Incidencia
                            </Link>
                        </div>

                        {/* Vista tipo tarjeta en móvil */}
                        <div className="sm:hidden space-y-4">
                            {incidencias.map((incidencia) => (
                                <div key={incidencia.id} className="border border-gray-200 rounded-md p-4 shadow-sm">
                                    <Link
                                        href={route('incidencias.show', incidencia.id)}
                                        className="text-blue-600 hover:text-blue-800 font-semibold block mb-1"
                                    >
                                        {incidencia.titulo}
                                    </Link>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium">Fecha:</span> {dayjs(incidencia.fecha).format('DD/MM/YYYY')}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium">Empleado:</span> {incidencia.empleado.nombre} {incidencia.empleado.apellido}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(incidencia.id)}
                                        className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Vista en tabla para pantallas grandes */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                                        <th className="px-4 py-2 border-b">Título</th>
                                        <th className="px-4 py-2 border-b">Fecha</th>
                                        <th className="px-4 py-2 border-b">Empleado</th>
                                        <th className="px-4 py-2 border-b">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incidencias.map((incidencia) => (
                                        <tr key={incidencia.id} className="text-gray-700 hover:bg-gray-50 transition duration-150">
                                            <td className="px-4 py-2 border-b whitespace-nowrap">
                                                <Link
                                                    href={route('incidencias.show', incidencia.id)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    {incidencia.titulo}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-2 border-b whitespace-nowrap">
                                                {dayjs(incidencia.fecha).format('DD/MM/YYYY')}
                                            </td>
                                            <td className="px-4 py-2 border-b whitespace-nowrap">
                                                {incidencia.empleado.nombre} {incidencia.empleado.apellido}
                                            </td>
                                            <td className="px-4 py-2 border-b whitespace-nowrap">
                                                <button
                                                    onClick={() => handleDelete(incidencia.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
