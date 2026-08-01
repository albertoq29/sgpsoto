import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import dayjs from 'dayjs';

export default function Show({ auth, incidencia }) {
    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="text-2xl font-semibold text-gray-800">Detalle de la Incidencia</h2>}
        >
            <Head title="Detalle de Incidencia" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg overflow-x-auto">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 break-words">
                            {incidencia.titulo}
                        </h3>
                        <div className="text-gray-700 space-y-4 text-sm sm:text-base break-words">
                            <p>
                                <span className="font-semibold">Descripción:</span> {incidencia.descripcion}
                            </p>
                            <p>
                                <span className="font-semibold">Fecha:</span> {dayjs(incidencia.fecha).format('DD/MM/YYYY')}
                            </p>
                            <p>
                                <span className="font-semibold">Empleado:</span> {incidencia.empleado.nombre} {incidencia.empleado.apellido}
                            </p>
                        </div>
                        <div className="mt-6">
                            <Link 
                                href={route('incidencias.index')} 
                                className="inline-flex items-center text-blue-600 font-semibold hover:underline hover:text-blue-800 transition duration-150 text-sm sm:text-base"
                            >
                                &larr; Volver a la lista de incidencias
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
