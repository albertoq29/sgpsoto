import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function EmpleadosCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        apellido: '',
        cedula: '',
        centro_pago: '',
        fecha_ingreso: '',
        tipo_personal: '',
        cargo: '',
        numero_hijos: '',
        tiene_profesionalizacion: 0,
        gana_mas_sueldo_basico: false,
        sueldo_quincenal: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('empleados.store'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Empleado creado!',
                    text: 'El empleado ha sido registrado correctamente.',
                    confirmButtonColor: '#3085d6',
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear empleado',
                    text: 'Por favor, revisa los campos marcados.',
                    confirmButtonColor: '#d33',
                });
            },
        });
    };

    const handleNombreApellidoChange = (e, field) => {
        const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setData(field, e.target.value);
        }
    };

    const handleCedulaChange = (e) => {
        const regex = /^[0-9]*$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setData('cedula', e.target.value);
        }
    };

    const handleSueldoQuincenalChange = (e) => {
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setData('sueldo_quincenal', e.target.value);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Crear Empleado</h2>}
        >
            <Head title="Crear Empleado" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-gray-700">Nombre</label>
                                        <input
                                            type="text"
                                            value={data.nombre}
                                            onChange={e => handleNombreApellidoChange(e, 'nombre')}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.nombre && <p className="text-sm text-red-600">{errors.nombre}</p>}
                                    </div>

                                    {/* Apellido */}
                                    <div>
                                        <label className="block text-gray-700">Apellido</label>
                                        <input
                                            type="text"
                                            value={data.apellido}
                                            onChange={e => handleNombreApellidoChange(e, 'apellido')}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.apellido && <p className="text-sm text-red-600">{errors.apellido}</p>}
                                    </div>

                                    {/* Cédula */}
                                    <div>
                                        <label className="block text-gray-700">Cédula</label>
                                        <input
                                            type="text"
                                            value={data.cedula}
                                            onChange={handleCedulaChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.cedula && <p className="text-sm text-red-600">{errors.cedula}</p>}
                                    </div>

                                    {/* Centro de Pago */}
                                    <div>
                                        <label className="block text-gray-700">Centro de Pago</label>
                                        <select
                                            value={data.centro_pago}
                                            onChange={e => setData('centro_pago', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">Seleccione un banco</option>
                                            <option value="Mercantil Banco Universal">Mercantil Banco Universal</option>
                                            <option value="Banco de Venezuela">Banco de Venezuela</option>
                                            <option value="Venezolano de Crédito">Venezolano de Crédito</option>
                                            <option value="Banco Provincial">Banco Provincial</option>
                                            <option value="Banco del Caribe">Banco del Caribe</option>
                                            <option value="Banco Exterior">Banco Exterior</option>
                                            <option value="Banco Occidental de Descuento">Banco Occidental de Descuento</option>
                                            <option value="Banco Caroní">Banco Caroní</option>
                                            <option value="Banesco Banco Universal">Banesco Banco Universal</option>
                                            <option value="Banco Sofitasa">Banco Sofitasa</option>
                                            <option value="Banco Plaza">Banco Plaza</option>
                                            <option value="Fondo Común">Fondo Común</option>
                                            <option value="100% Banco">100% Banco</option>
                                            <option value="Del Sur Banco Universal">Del Sur Banco Universal</option>
                                            <option value="Banco del Tesoro">Banco del Tesoro</option>
                                            <option value="Banco Agrícola de Venezuela">Banco Agrícola de Venezuela</option>
                                            <option value="Bancrecer">Bancrecer</option>
                                            <option value="MiBanco">MiBanco</option>
                                            <option value="Banco Activo">Banco Activo</option>
                                            <option value="Bancamiga">Bancamiga</option>
                                            <option value="Banplus">Banplus</option>
                                            <option value="Banco Bicentenario">Banco Bicentenario</option>
                                            <option value="Banco de la Fuerza Armada Nacional Bolivariana">
                                                Banco de la Fuerza Armada Nacional Bolivariana
                                            </option>
                                            <option value="Banco Nacional de Crédito">Banco Nacional de Crédito</option>
                                        </select>
                                        {errors.centro_pago && <p className="text-sm text-red-600">{errors.centro_pago}</p>}
                                    </div>

                                    {/* Fecha de Ingreso */}
                                    <div>
                                        <label className="block text-gray-700">Fecha de Ingreso</label>
                                        <input
                                            type="date"
                                            value={data.fecha_ingreso}
                                            onChange={e => setData('fecha_ingreso', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                        {errors.fecha_ingreso && <p className="text-sm text-red-600">{errors.fecha_ingreso}</p>}
                                    </div>

                                    {/* Tipo de Personal */}
                                    <div>
                                        <label className="block text-gray-700">Tipo de Personal</label>
                                        <input
                                            type="text"
                                            value={data.tipo_personal}
                                            onChange={e => handleNombreApellidoChange(e, 'tipo_personal')}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.tipo_personal && <p className="text-sm text-red-600">{errors.tipo_personal}</p>}
                                    </div>

                                    {/* Número de Hijos */}
                                    <div>
                                        <label className="block text-gray-700">Número de Hijos</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.numero_hijos}
                                            onChange={e => setData('numero_hijos', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.numero_hijos && <p className="text-sm text-red-600">{errors.numero_hijos}</p>}
                                    </div>

                                    {/* Cargo */}
                                    <div>
                                        <label className="block text-gray-700">Cargo</label>
                                        <input
                                            type="text"
                                            value={data.cargo}
                                            onChange={e => handleNombreApellidoChange(e, 'cargo')}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.cargo && <p className="text-sm text-red-600">{errors.cargo}</p>}
                                    </div>

                                    {/* Profesionalización */}
                                    <div>
                                        <label className="block text-gray-700">Profesionalización</label>
                                        <select
                                            value={data.tiene_profesionalizacion}
                                            onChange={e => setData('tiene_profesionalizacion', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="0">NO PROFESIONAL</option>
                                            <option value="1">TÉCNICO SUPERIOR UNIVERSITARIO</option>
                                            <option value="2">PROFESIONAL</option>
                                            <option value="3">ESPECIALISTA</option>
                                            <option value="4">MAESTRÍA</option>
                                            <option value="5">DOCTORADO</option>
                                        </select>
                                        {errors.tiene_profesionalizacion && (
                                            <p className="text-sm text-red-600">{errors.tiene_profesionalizacion}</p>
                                        )}
                                    </div>

                                    {/* Gana más sueldo básico */}
                                    <div>
                                        <label className="block text-gray-700">
                                            ¿Gana más que el sueldo básico quincenal?
                                        </label>
                                        <div className="mt-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.gana_mas_sueldo_basico}
                                                    onChange={e =>
                                                        setData('gana_mas_sueldo_basico', e.target.checked)
                                                    }
                                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                />
                                                <span className="ml-2">Sí</span>
                                            </label>
                                        </div>
                                    </div>

                                    {data.gana_mas_sueldo_basico && (
                                        <div>
                                            <label className="block text-gray-700">Sueldo Quincenal (Bs)</label>
                                            <input
                                                type="text"
                                                value={data.sueldo_quincenal}
                                                onChange={handleSueldoQuincenalChange}
                                                placeholder="Ej: 1500.50"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                            {errors.sueldo_quincenal && (
                                                <p className="text-sm text-red-600">{errors.sueldo_quincenal}</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="mr-2 px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md"
                                    >
                                        Volver a Empleados
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                        disabled={processing}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}