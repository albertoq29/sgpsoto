import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ListarEmpleados({ empleados }) {
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-2 sm:px-4 py-4 max-w-6xl">
                <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
                    <h1 className="text-xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-3">
                        Empleados
                    </h1>
                    
                    {/* Tabla para pantallas medianas y grandes */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Apellido
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Cédula
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {empleados.map((empleado) => (
                                    <tr 
                                        key={empleado.id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-3 sm:px-6 py-3 text-sm text-gray-700">
                                            {empleado.nombre}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 text-sm text-gray-700">
                                            {empleado.apellido}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 text-sm text-gray-700">
                                            {empleado.cedula}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3">
                                            <Link
                                                href={route('quincenas.ver', empleado.id)}
                                                className="inline-flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                                            >
                                                Ver pagos
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Vista de tarjetas para móviles */}
                    <div className="md:hidden space-y-4">
                        {empleados.map((empleado) => (
                            <div 
                                key={empleado.id} 
                                className="bg-gray-50 rounded-lg p-4 shadow-sm"
                            >
                                <div className="flex flex-col space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Nombre:</span>
                                        <span>{empleado.nombre}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Apellido:</span>
                                        <span>{empleado.apellido}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Cédula:</span>
                                        <span>{empleado.cedula}</span>
                                    </div>
                                    <div className="mt-2 flex justify-center">
                                        <Link
                                            href={route('quincenas.ver', empleado.id)}
                                            className="w-full text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Ver registros de pago
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}