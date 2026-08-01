import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function EmpleadosShow({ empleados }) {
  const { auth } = usePage().props;
  const [search, setSearch] = useState('');
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(route('empleados.destroy', id), {
          onSuccess: () => {
            Swal.fire(
              '¡Eliminado!',
              'El empleado ha sido eliminado con éxito.',
              'success'
            );
          },
          onError: () => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el empleado.',
              'error'
            );
          }
        });
      }
    });
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  // Label según profesionalización
  const getProfesionalizacionLabel = (value) => {
    switch (parseInt(value, 10)) {
      case 1: return 'Técnico Superior Universitario';
      case 2: return 'Profesional';
      case 3: return 'Especialista';
      case 4: return 'Maestría';
      case 5: return 'Doctorado';
      default: return 'No Profesional';
    }
  };

  const filteredEmpleados = empleados.filter((e) =>
    Object.values(e).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  const TableHeader = () => (
    <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-left">
      {[
        { label: 'Nombre y Apellido', width: '15%' },
        { label: 'Cédula', width: '10%' },
        { label: 'Centro de Pago', width: '10%' },
        { label: 'Fecha de Ingreso', width: '10%' },
        { label: 'Tipo de Personal', width: '10%' },
        { label: 'Cargo', width: '15%' },
        { label: 'N° de Hijos', width: '8%' },
        { label: 'Profesionalización', width: '12%' },
        ...(auth.user.rol !== 0 ? [{ label: 'Acciones', width: '10%' }] : [])
      ].map((header, i) => (
        <th key={i} className={`w-[${header.width}] px-4 py-3 border-b-2 border-blue-200 text-sm font-medium text-gray-700 hidden md:table-cell`}>
          {header.label}
        </th>
      ))}
    </tr>
  );

  const TableRow = ({ empleado }) => (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
      <td className="px-4 py-4">
        <div className="md:hidden">
          <div className="font-bold text-gray-800 text-lg mb-1">
            {empleado.nombre} {empleado.apellido}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div className="col-span-1">
              <span className="text-gray-500 font-medium">Cédula:</span> 
              <span className="ml-1 text-gray-700">{empleado.cedula}</span>
            </div>
            <div className="col-span-1">
              <span className="text-gray-500 font-medium">Cargo:</span> 
              <span className="ml-1 text-gray-700">{empleado.cargo}</span>
            </div>
            <div className="col-span-1">
              <span className="text-gray-500 font-medium">Centro:</span> 
              <span className="ml-1 text-gray-700">{empleado.centro_pago}</span>
            </div>
            <div className="col-span-1">
              <span className="text-gray-500 font-medium">Ingreso:</span> 
              <span className="ml-1 text-gray-700">{formatDate(empleado.fecha_ingreso)}</span>
            </div>
            <div className="col-span-1">
              <span className="text-gray-500 font-medium">Tipo:</span> 
              <span className="ml-1 text-gray-700">{empleado.tipo_personal}</span>
            </div>
            <div className="col-span-1">
              <span className="text-gray-500 font-medium">Hijos:</span> 
              <span className="ml-1 text-gray-700">{empleado.numero_hijos}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500 font-medium">Profesionalización:</span> 
              <span className="ml-1 text-gray-700">{getProfesionalizacionLabel(empleado.tiene_profesionalizacion)}</span>
            </div>
          </div>
          {auth.user.rol !== 0 && (
            <div className="flex justify-start gap-4 pt-2 border-t border-gray-100">
              <Link href={route('empleados.edit', empleado.id)} className="text-blue-600 hover:text-blue-800 flex items-center">
                <i className="fas fa-pencil-alt mr-1"/>Editar
              </Link>
              <button 
                onClick={() => handleDelete(empleado.id)} 
                type="button" 
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <i className="fas fa-trash-alt mr-1"/>Eliminar
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:block">
          {empleado.nombre} {empleado.apellido}
        </div>
      </td>
      <td className="px-4 py-4 hidden md:table-cell">{empleado.cedula}</td>
      <td className="px-4 py-4 hidden md:table-cell">{empleado.centro_pago}</td>
      <td className="px-4 py-4 hidden md:table-cell">{formatDate(empleado.fecha_ingreso)}</td>
      <td className="px-4 py-4 hidden md:table-cell">{empleado.tipo_personal}</td>
      <td className="px-4 py-4 hidden md:table-cell">{empleado.cargo}</td>
      <td className="px-4 py-4 hidden md:table-cell">{empleado.numero_hijos}</td>
      <td className="px-4 py-4 hidden md:table-cell">{getProfesionalizacionLabel(empleado.tiene_profesionalizacion)}</td>
      {auth.user.rol !== 0 && (
        <td className="px-4 py-4 hidden md:table-cell">
          <div className="flex items-center space-x-3">
            <Link 
              href={route('empleados.edit', empleado.id)} 
              className="text-blue-600 hover:text-blue-800 hover:underline flex items-center transition-colors"
            >
              <i className="fas fa-pencil-alt mr-1"/>Editar
            </Link>
            <button 
              onClick={() => handleDelete(empleado.id)} 
              type="button" 
              className="text-red-600 hover:text-red-800 hover:underline flex items-center transition-colors"
            >
              <i className="fas fa-trash-alt mr-1"/>Eliminar
            </button>
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Empleados
        </h2>
      }
    >
      <Head title="Empleados" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar empleado..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            {auth.user.rol !== 0 && (
              <Link 
                href={route('empleados.create')} 
                className="px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Crear Empleado
              </Link>
            )}
          </div>
          <div className="overflow-hidden bg-white shadow-md rounded-xl">
            <div className="p-0 text-gray-900">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hidden md:table-header-group">
                    <TableHeader />
                  </thead>
                  <tbody>
                    {filteredEmpleados.length > 0 ? (
                      filteredEmpleados.map((empleado) => <TableRow key={empleado.id} empleado={empleado} />)
                    ) : (
                      <tr>
                        <td 
                          colSpan={auth.user.rol !== 0 ? 9 : 8} 
                          className="px-4 py-6 text-center text-gray-600 border-b"
                        >
                          <div className="flex flex-col items-center py-6">
                            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500">No se encontraron empleados que coincidan con la búsqueda.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}