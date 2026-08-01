import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function VariablesPagoIndex({ variables }) {
  const { data, setData, post, put, processing, errors } = useForm({
    sueldo_basico_quincenal: '',
    prima_hijos: '',
    cestaticket: '',
  });

  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      put(route('variables.update', editing), {
        onSuccess: () => setEditing(null),
      });
    } else {
      post(route('variables.store'));
    }
  };

  const handleEdit = (variable) => {
    setEditing(variable.id);
    const filteredData = Object.fromEntries(
      Object.entries(variable).filter(
        ([key]) =>
          ![
            'id',
            'created_at',
            'updated_at',
            'seguro_social_obligatorio',
            'regimen_prestaciones_empleo',
            'ley_vivienda_habitat',
            'tesoreria_seguridad_social',
            'caja_ahorro',
          ].includes(key)
      )
    );
    setData(filteredData);
  };

  const resetForm = () => {
    setEditing(null);
    setData({
      sueldo_basico_quincenal: '',
      prima_hijos: '',
      cestaticket: '',
    });
  };

  const basicFields = [
    { key: 'sueldo_basico_quincenal', label: 'Sueldo Básico Quincenal' },
    { key: 'prima_hijos', label: 'Prima Hijos' },
    { key: 'cestaticket', label: 'Cestaticket' },
  ];

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Gestión de Variables de Pago
        </h2>
      }
    >
      <Head title="Variables de Pago" />

      <div className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Sección del formulario */}
        {(!variables.length || editing) && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editing ? 'Editar Variable' : 'Crear Nueva Variable'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <fieldset className="border p-4 rounded-md">
                  <legend className="px-2 text-lg font-semibold text-gray-700">
                    Datos Básicos
                  </legend>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
                    {basicFields.map(({ key, label }) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {label}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={data[key]}
                          onChange={(e) => setData(key, e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-150 ease-in-out"
                          required
                        />
                        {errors[key] && (
                          <p className="text-sm text-red-600">{errors[key]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-150 ease-in-out"
                    disabled={processing}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition duration-150 ease-in-out ${
                      editing
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={processing}
                  >
                    {editing ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Listado de Variables */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variable
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto / Porcentaje
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {variables.map((variable) => (
                    <tr key={variable.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {Object.keys(variable)
                            .filter(
                              (key) =>
                                ![
                                  'id',
                                  'created_at',
                                  'updated_at',
                                  'seguro_social_obligatorio',
                                  'regimen_prestaciones_empleo',
                                  'ley_vivienda_habitat',
                                  'tesoreria_seguridad_social',
                                  'caja_ahorro',
                                ].includes(key)
                            )
                            .map((key) => (
                              <div
                                key={key}
                                className="text-sm text-gray-900"
                              >
                                {key.replace(/_/g, ' ').toUpperCase()}
                              </div>
                            ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2 text-right">
                          {Object.keys(variable)
                            .filter(
                              (key) =>
                                ![
                                  'id',
                                  'created_at',
                                  'updated_at',
                                  'seguro_social_obligatorio',
                                  'regimen_prestaciones_empleo',
                                  'ley_vivienda_habitat',
                                  'tesoreria_seguridad_social',
                                  'caja_ahorro',
                                ].includes(key)
                            )
                            .map((key) => (
                              <div
                                key={key}
                                className="text-sm text-gray-500"
                              >
                                {variable[key]}
                              </div>
                            ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEdit(variable)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista móvil */}
            <div className="sm:hidden">
              {variables.map((variable) => (
                <div
                  key={variable.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div className="p-4 space-y-4">
                    {Object.keys(variable)
                      .filter(
                        (key) =>
                          ![
                            'id',
                            'created_at',
                            'updated_at',
                            'seguro_social_obligatorio',
                            'regimen_prestaciones_empleo',
                            'ley_vivienda_habitat',
                            'tesoreria_seguridad_social',
                            'caja_ahorro',
                          ].includes(key)
                      )
                      .map((key) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">
                            {key.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-900">
                            {variable[key]}
                          </span>
                        </div>
                      ))}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleEdit(variable)}
                        className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition duration-150 ease-in-out"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
