// resources/js/Pages/Incidencias/Create.jsx

import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';

export default function Create({ auth, empleados }) {
    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        descripcion: '',
        empleado_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('incidencias.store'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Incidencia reportada!',
                    text: 'La incidencia ha sido registrada correctamente.',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = route('incidencias.index');
                    }
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al reportar',
                    text: 'Por favor, revisa los campos marcados.',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#d33',
                });
            }
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="text-2xl font-semibold text-gray-800">Reportar Incidencia</h2>}
        >
            <Head title="Reportar Incidencia" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
                    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-6">
                        {/* Título */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Título</label>
                            <input
                                type="text"
                                value={data.titulo}
                                onChange={e => setData('titulo', e.target.value)}
                                className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                disabled={processing}
                            />
                            {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo}</span>}
                        </div>

                        {/* Empleado que reporta */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Empleado que reporta</label>
                            <select
                                value={data.empleado_id}
                                onChange={e => setData('empleado_id', e.target.value)}
                                className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                disabled={processing}
                            >
                                <option value="">Seleccione un empleado</option>
                                {empleados.map(emp => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.nombre} {emp.apellido}
                                    </option>
                                ))}
                            </select>
                            {errors.empleado_id && <span className="text-red-500 text-sm">{errors.empleado_id}</span>}
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Descripción</label>
                            <textarea
                                value={data.descripcion}
                                onChange={e => setData('descripcion', e.target.value)}
                                className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                disabled={processing}
                            ></textarea>
                            {errors.descripcion && <span className="text-red-500 text-sm">{errors.descripcion}</span>}
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end space-x-3">
                            <Link 
                                href={route('incidencias.index')} 
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-150"
                            >
                                Volver al listado
                            </Link>
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150"
                                disabled={processing}
                            >
                                {processing ? 'Reportando...' : 'Reportar Incidencia'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
