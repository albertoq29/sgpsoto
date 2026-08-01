import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function VariablesPagoIndex({ empleados, auth }) {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [extraSueldo, setExtraSueldo] = useState('');
    const { post, processing, errors } = useForm();

    const handleEmpleadoChange = (e) => {
        const empleadoId = parseInt(e.target.value);
        const empleado = empleados.find((emp) => emp.id === empleadoId);

        setSelectedEmpleado(empleado);
        setExtraSueldo(empleado?.extrasueldo?.sueldo_quincenal || '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedEmpleado) {
            alert('Por favor seleccione un empleado.');
            return;
        }

        post(route('extrasueldo.store'), {
            data: {
                empleado_id: selectedEmpleado.id,
                sueldo_quincenal: extraSueldo,
            },
            onSuccess: () => {
                alert('Sueldo extra guardado exitosamente.');
                setExtraSueldo('');
                setSelectedEmpleado(null);
            },
            onError: (err) => {
                console.error('Error al guardar:', err);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Sueldo Extra</h2>}
        >
            <Head title="Sueldo Extra" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Asignar Sueldo Extra</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Empleado</label>
                            <select
                                value={selectedEmpleado?.id || ''}
                                onChange={handleEmpleadoChange}
                                className="block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Seleccione un empleado</option>
                                {empleados.map((empleado) => (
                                    <option key={empleado.id} value={empleado.id}>
                                        {`${empleado.nombre} ${empleado.apellido} - CI: ${empleado.cedula}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedEmpleado && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Sueldo Quincenal Extra
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={extraSueldo}
                                    onChange={(e) => setExtraSueldo(e.target.value)}
                                    className="block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    placeholder="Ingrese el sueldo quincenal extra"
                                />
                                {errors.sueldo_quincenal && (
                                    <p className="text-sm text-red-600 mt-1">{errors.sueldo_quincenal}</p>
                                )}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded-lg text-white ${
                                    processing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                                disabled={processing}
                            >
                                {processing ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="max-w-4xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Empleados con Sueldo Extra</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Empleado
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Cédula
                                </th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Sueldo Extra
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {empleados
                                .filter((emp) => emp.extrasueldo)
                                .map((empleado) => (
                                    <tr key={empleado.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {`${empleado.nombre} ${empleado.apellido}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{empleado.cedula}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            {empleado.extrasueldo.sueldo_quincenal}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
