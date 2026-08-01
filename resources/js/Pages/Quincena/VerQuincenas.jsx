import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import { Link, router } from '@inertiajs/react';  // Añadido router para manejar la eliminación
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';

dayjs.extend(localeData);
dayjs.locale('es');

// Componente para mostrar un detalle
const DetailItem = ({ label, value }) => ( <div> <p className="text-sm font-medium text-gray-500">{label}</p> <p className="text-lg font-semibold text-gray-800">{value || 'N/A'}</p> </div>
);

export default function VerQuincenas({ auth, empleado, quincenas }) {
const [selectedQuincena, setSelectedQuincena] = useState(null);
const [selectedTipo, setSelectedTipo] = useState(null);

// Verificar si el usuario tiene rol 1 (administrador)
const isAdmin = auth.user.rol === 1;

// Formatear fechas
const formatDate = (isoDate) => dayjs(isoDate).format('DD [de] MMMM [de] YYYY');

// Ordenar las quincenas cronológicamente
quincenas.sort((a, b) => new Date(a.mes) - new Date(b.mes));

// Ver detalles de una quincena
const handleViewDetails = (quincena, tipo) => {
    if (!quincena) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Esta quincena aún no está registrada.',
            confirmButtonColor: '#3B82F6',
        });
    } else {
        setSelectedQuincena(quincena);
        setSelectedTipo(tipo);
    }
};

// Manejar la eliminación de quincena
const handleDeleteQuincena = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed && selectedQuincena && selectedTipo) {
            router.delete(route('quincena.destroy', {
                tipo: selectedTipo,
                id: selectedQuincena.id
            }), {
                onSuccess: () => {
                    setSelectedQuincena(null);
                    Swal.fire(
                        '¡Eliminada!',
                        'La quincena ha sido eliminada.',
                        'success'
                    );
                }
            });
        }
    });
};

// Generar reporte completo
const handleGenerateReport = (quincenaPrimera, quincenaSegunda, e) => {
    if (!quincenaPrimera || !quincenaSegunda) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ambas quincenas deben estar registradas para generar el recibo de pago.',
            confirmButtonColor: '#3B82F6',
        });
    }
};

// Generar reporte de la primera quincena
const handleGenerateFirstQuincenaReport = (quincenaPrimera, e) => {
    if (!quincenaPrimera) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La primera quincena no está registrada.',
            confirmButtonColor: '#3B82F6',
        });
    }
};

return (
    <AuthenticatedLayout>
        <div className="container mx-auto p-6 max-w-6xl">
            {/* Botón para regresar */}
            <div className="mb-6">
                <Link
                    href={route('quincenas.empleados')}
                    className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Volver a la lista de empleados
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
                    Quincenas de {empleado.nombre} {empleado.apellido}
                </h1>

                {/* Vista para pantallas medianas en adelante (tabla) */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Mes
                                </th>
                                <th className="px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Primera Quincena
                                </th>
                                <th className="px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Segunda Quincena
                                </th>
                                <th className="px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {quincenas.map((quincena, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                        {dayjs(quincena.mes).format('MMMM YYYY')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleViewDetails(quincena.primera, 'primera')}
                                            className={`text-sm font-medium transition-colors duration-200 ${
                                                !quincena.primera ? 'text-red-500 hover:text-red-700' : 'text-blue-500 hover:text-blue-700'
                                            }`}
                                        >
                                            Ver detalles
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleViewDetails(quincena.segunda, 'segunda')}
                                            className={`text-sm font-medium transition-colors duration-200 ${
                                                !quincena.segunda ? 'text-red-500 hover:text-red-700' : 'text-blue-500 hover:text-blue-700'
                                            }`}
                                        >
                                            Ver detalles
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <a
                                            href={quincena.primera ? route('empleado.generar-pdf.primera', {
                                                empleadoId: empleado.id,
                                                quincenaId: quincena.primera.id
                                            }) : '#'}
                                            onClick={(e) => handleGenerateFirstQuincenaReport(quincena.primera, e)}
                                            className={`px-4 py-2 rounded ${
                                                quincena.primera ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            }`}
                                        >
                                            Generar Primera Quincena
                                        </a>
                                        <a
                                            href={quincena.primera && quincena.segunda ? route('empleado.generar-pdf', {
                                                empleadoId: empleado.id,
                                                quincenaId: quincena.segunda.id,
                                                tipo: quincena.segunda ? 'segunda' : 'primera'
                                            }) : '#'}
                                            onClick={(e) => handleGenerateReport(quincena.primera, quincena.segunda, e)}
                                            className={`px-4 py-2 rounded ${
                                                quincena.primera && quincena.segunda ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            }`}
                                        >
                                            Generar Recibo Completo
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Vista para dispositivos móviles (cards) */}
                <div className="block sm:hidden space-y-4">
                    {quincenas.map((quincena, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg shadow p-4">
                            <div className="mb-2">
                                <p className="text-lg font-semibold text-gray-800">
                                    {dayjs(quincena.mes).format('MMMM YYYY')}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Primera Quincena</p>
                                    <button
                                        onClick={() => handleViewDetails(quincena.primera, 'primera')}
                                        className={`text-sm font-medium transition-colors duration-200 ${
                                            !quincena.primera ? 'text-red-500 hover:text-red-700' : 'text-blue-500 hover:text-blue-700'
                                        }`}
                                    >
                                        Ver detalles
                                    </button>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Segunda Quincena</p>
                                    <button
                                        onClick={() => handleViewDetails(quincena.segunda, 'segunda')}
                                        className={`text-sm font-medium transition-colors duration-200 ${
                                            !quincena.segunda ? 'text-red-500 hover:text-red-700' : 'text-blue-500 hover:text-blue-700'
                                        }`}
                                    >
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <a
                                    href={quincena.primera ? route('empleado.generar-pdf.primera', {
                                        empleadoId: empleado.id,
                                        quincenaId: quincena.primera.id
                                    }) : '#'}
                                    onClick={(e) => handleGenerateFirstQuincenaReport(quincena.primera, e)}
                                    className={`flex-1 px-4 py-2 rounded text-center ${
                                        quincena.primera ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    }`}
                                >
                                    Primera
                                </a>
                                <a
                                    href={quincena.primera && quincena.segunda ? route('empleado.generar-pdf', {
                                        empleadoId: empleado.id,
                                        quincenaId: quincena.segunda.id,
                                        tipo: quincena.segunda ? 'segunda' : 'primera'
                                    }) : '#'}
                                    onClick={(e) => handleGenerateReport(quincena.primera, quincena.segunda, e)}
                                    className={`flex-1 px-4 py-2 rounded text-center ${
                                        quincena.primera && quincena.segunda ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    }`}
                                >
                                    Recibo Completo
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Modal para ver detalles */}
        {selectedQuincena && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Detalles de la Quincena
                        </h2>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Sueldo Básico Quincenal" value={selectedQuincena.sueldo_basico_quincenal} />
                            <DetailItem label="Prima de Profesionalización" value={selectedQuincena.prima_profesionalizacion} />
                            <DetailItem label="Prima por Hijos" value={selectedQuincena.prima_hijos} />
                            <DetailItem label="Prima de Antigüedad" value={selectedQuincena.prima_antiguedad} />
                            <DetailItem label="Cestaticket" value={selectedQuincena.cestaticket} />
                        </div>
                        {/* Texto adicional en los detalles */}
                        <div className="px-6 text-sm italic text-gray-600">
                            Nota: Esta ficha no incluye las deducciones.
                        </div>
                    </div>

                    <div className="p-6 border-t flex justify-between">
                        {isAdmin && (
                            <button
                                onClick={handleDeleteQuincena}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        )}
                        <button
                            onClick={() => setSelectedQuincena(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </AuthenticatedLayout>
);
}