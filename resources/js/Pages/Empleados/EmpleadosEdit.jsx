import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function EmpleadosEdit({ empleado, numeroHijos, tieneProfesionalizacion, extraSueldo }) {
  const { data, setData, put, processing, errors } = useForm({
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    cedula: empleado.cedula,
    centro_pago: empleado.centro_pago,
    fecha_ingreso: empleado.fecha_ingreso,
    tipo_personal: empleado.tipo_personal,
    cargo: empleado.cargo,
    numero_hijos: numeroHijos,
    tiene_profesionalizacion: typeof tieneProfesionalizacion === 'undefined'
      ? 0
      : parseInt(tieneProfesionalizacion),
    extra_sueldo: extraSueldo || 0,
  });

  const submit = (e) => {
    e.preventDefault();

    put(route('empleados.update', empleado.id), {
      onSuccess: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El empleado ha sido actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3B82F6',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = route('empleados.index');
          }
        });
      },
      onError: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el empleado. Revisa los campos marcados.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d33',
        });
      },
    });
  };

  const bancos = [
    "Mercantil Banco Universal",
    "Banco de Venezuela",
    "Venezolano de Crédito",
    "Banco Provincial",
    "Banco del Caribe",
    "Banco Exterior",
    "Banco Occidental de Descuento",
    "Banco Caroní",
    "Banesco Banco Universal",
    "Banco Sofitasa",
    "Banco Plaza",
    "Fondo Común",
    "100% Banco",
    "Del Sur Banco Universal",
    "Banco del Tesoro",
    "Banco Agrícola de Venezuela",
    "Bancrecer",
    "MiBanco",
    "Banco Activo",
    "Bancamiga",
    "Banplus",
    "Banco Bicentenario",
    "Banco de la Fuerza Armada Nacional Bolivariana",
    "Banco Nacional de Crédito"
  ];

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Editar Empleado
        </h2>
      }
    >
      <Head title="Editar Empleado" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={submit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      value={data.nombre}
                      onChange={e => setData('nombre', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                      pattern="[A-Za-zÑñáéíóúÁÉÍÓÚ\s]+"
                      title="Solo se permiten letras, acentos y espacios."
                    />
                    {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
                  </div>

                  {/* Apellido */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                      type="text"
                      value={data.apellido}
                      onChange={e => setData('apellido', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                      pattern="[A-Za-zÑñáéíóúÁÉÍÓÚ\s]+"
                      title="Solo se permiten letras, acentos y espacios."
                    />
                    {errors.apellido && <div className="text-red-500">{errors.apellido}</div>}
                  </div>

                  {/* Cédula */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cédula</label>
                    <input
                      type="text"
                      value={data.cedula}
                      onChange={e => setData('cedula', e.target.value.replace(/[^0-9]/g, ''))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                      pattern="\d+"
                      title="Solo se permiten números."
                    />
                    {errors.cedula && <div className="text-red-500">{errors.cedula}</div>}
                  </div>

                  {/* Centro de Pago */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Centro de Pago</label>
                    <select
                      value={data.centro_pago}
                      onChange={e => setData('centro_pago', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                    >
                      <option value="" disabled>Seleccione un banco</option>
                      {bancos.map((banco, idx) => (
                        <option key={idx} value={banco}>{banco}</option>
                      ))}
                    </select>
                    {errors.centro_pago && <div className="text-red-500">{errors.centro_pago}</div>}
                  </div>

                  {/* Fecha de Ingreso */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
                    <input
                      type="date"
                      value={data.fecha_ingreso}
                      onChange={e => setData('fecha_ingreso', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                    />
                    {errors.fecha_ingreso && <div className="text-red-500">{errors.fecha_ingreso}</div>}
                  </div>

                  {/* Tipo de Personal */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Personal</label>
                    <input
                      type="text"
                      value={data.tipo_personal}
                      onChange={e => setData('tipo_personal', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                      pattern="[A-Za-zÑñáéíóúÁÉÍÓÚ\s]+"
                      title="Solo se permiten letras, acentos y espacios."
                    />
                    {errors.tipo_personal && <div className="text-red-500">{errors.tipo_personal}</div>}
                  </div>

                  {/* Cargo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cargo</label>
                    <input
                      type="text"
                      value={data.cargo}
                      onChange={e => setData('cargo', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                      pattern="[A-Za-zÑñáéíóúÁÉÍÓÚ\s]+"
                      title="Solo se permiten letras, acentos y espacios."
                    />
                    {errors.cargo && <div className="text-red-500">{errors.cargo}</div>}
                  </div>

                  {/* Número de Hijos */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Número de Hijos</label>
                    <input
                      type="number"
                      min="0"
                      value={data.numero_hijos}
                      onChange={e => setData('numero_hijos', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.numero_hijos && <div className="text-red-500">{errors.numero_hijos}</div>}
                  </div>

                  {/* Profesionalización */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profesionalización</label>
                    <select
                      value={data.tiene_profesionalizacion}
                      onChange={e => setData('tiene_profesionalizacion', parseInt(e.target.value))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      required
                    >
                      <option value={0}>NO PROFESIONAL</option>
                      <option value={1}>TÉCNICO SUPERIOR UNIVERSITARIO</option>
                      <option value={2}>PROFESIONAL</option>
                      <option value={3}>ESPECIALISTA</option>
                      <option value={4}>MAESTRÍA</option>
                      <option value={5}>DOCTORADO</option>
                    </select>
                    {errors.tiene_profesionalizacion && (
                      <p className="text-sm text-red-600">{errors.tiene_profesionalizacion}</p>
                    )}
                  </div>

                {/* Extra Sueldo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Extra Sueldo</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={data.extra_sueldo}
                      onChange={e => setData('extra_sueldo', parseFloat(e.target.value) || 0)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.extra_sueldo && <div className="text-red-500">{errors.extra_sueldo}</div>}
                  </div>

                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    disabled={processing}
                  >
                    Actualizar Empleado
                  </button>
                  <a
                    href={route('empleados.index')}
                    className="ml-2 px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md"
                  >
                    Volver a Empleados
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
