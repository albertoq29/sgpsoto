import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { getDaysInMonth } from "date-fns";
import Swal from "sweetalert2";

export default function RegistrarQuincena({ auth, empleados }) {
    const { data, setData, post, errors } = useForm({
        empleado_id: "",
        tipo_quincena: "primer",
        fecha_pago: "",
        tiene_horas_extras: false,
        horas_extras: "",
        aplicar_bono_nocturno: false,
        tiene_dias_feriados: false, // Nueva propiedad para días feriados
        dias_feriados: "", // Nueva propiedad para cantidad de días feriados
    });

    const [mes, setMes] = useState("");
    const [errorFrontend, setErrorFrontend] = useState("");

    const handleTipoQuincenaChange = (tipo) => {
        setData((prevData) => ({
            ...prevData,
            tipo_quincena: tipo,
        }));

        if (mes) {
            const añoActual = new Date().getFullYear();
            const dia = tipo === "primer" ? 15 : getDaysInMonth(new Date(añoActual, mes - 1));
            setData((prevData) => ({
                ...prevData,
                fecha_pago: `${añoActual}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`,
            }));
        }
    };

    const handleMesChange = (e) => {
        const nuevoMes = e.target.value;
        setMes(nuevoMes);

        if (nuevoMes) {
            actualizarFecha(data.tipo_quincena, nuevoMes);
        }
    };

    const actualizarFecha = (tipoQuincena, mesSeleccionado) => {
        const añoActual = new Date().getFullYear();
        const dia = tipoQuincena === "primer" ? 15 : getDaysInMonth(new Date(añoActual, mesSeleccionado - 1));
        setData(
            "fecha_pago",
            `${añoActual}-${String(mesSeleccionado).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.empleado_id || !mes || !data.fecha_pago) {
            setErrorFrontend("Por favor complete todos los campos.");
            return;
        }

        setErrorFrontend("");

        post(route("quincena.registrar"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Quincena Registrada",
                    text: "La quincena ha sido registrada con éxito.",
                    confirmButtonText: "Aceptar",
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error al registrar la quincena.",
                    confirmButtonText: "Aceptar",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Registrar Quincena" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-6 text-gray-800">Registrar Quincena</h1>

                            {errorFrontend && (
                                <div className="mb-4 p-4 rounded-md bg-red-50 text-red-600">
                                    {errorFrontend}
                                </div>
                            )}

                            {errors && Object.keys(errors).length > 0 && (
                                <div className="mb-4 p-4 rounded-md bg-red-50">
                                    {Object.values(errors).map((error, index) => (
                                        <div key={index} className="text-sm text-red-600">
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Empleado
                                    </label>
                                    <select
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.empleado_id}
                                        onChange={(e) => setData("empleado_id", e.target.value)}
                                    >
                                        <option value="">Seleccione un empleado</option>
                                        {empleados.map((empleado) => (
                                            <option key={empleado.id} value={empleado.id}>
                                                {empleado.nombre} {empleado.apellido} - {empleado.cedula}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Quincena
                                        </label>
                                        <select
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.tipo_quincena}
                                            onChange={(e) => handleTipoQuincenaChange(e.target.value)}
                                        >
                                            <option value="primer">Primera Quincena</option>
                                            <option value="segunda">Segunda Quincena</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mes de Pago
                                        </label>
                                        <select
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={mes}
                                            onChange={handleMesChange}
                                        >
                                            <option value="">Seleccione un mes</option>
                                            {[...Array(12)].map((_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {new Date(0, index).toLocaleString("es-ES", {
                                                        month: "long",
                                                    })}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha de Pago
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                                        value={data.fecha_pago}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="tiene_horas_extras"
                                        checked={data.tiene_horas_extras}
                                        onChange={(e) => setData("tiene_horas_extras", e.target.checked)}
                                    />
                                    <label htmlFor="tiene_horas_extras" className="ml-2 text-sm text-gray-700">
                                        ¿Tiene horas extras registradas esta quincena?
                                    </label>
                                </div>

                                {data.tiene_horas_extras && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cantidad de Horas Extras
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.horas_extras}
                                            onChange={(e) => setData("horas_extras", e.target.value)}
                                        />
                                    </div>
                                )}

                                <div>
                                    <input
                                        type="checkbox"
                                        id="aplicar_bono_nocturno"
                                        checked={data.aplicar_bono_nocturno}
                                        onChange={(e) => setData("aplicar_bono_nocturno", e.target.checked)}
                                    />
                                    <label htmlFor="aplicar_bono_nocturno" className="ml-2 text-sm text-gray-700">
                                        ¿Aplicar bono nocturno?
                                    </label>
                                </div>

                                {/* Nuevo bloque para días feriados */}
                                <div>
                                    <input
                                        type="checkbox"
                                        id="tiene_dias_feriados"
                                        checked={data.tiene_dias_feriados}
                                        onChange={(e) => setData("tiene_dias_feriados", e.target.checked)}
                                    />
                                    <label htmlFor="tiene_dias_feriados" className="ml-2 text-sm text-gray-700">
                                        ¿Trabajó en días feriados durante esta quincena?
                                    </label>
                                </div>

                                {data.tiene_dias_feriados && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cantidad de Días Feriados Trabajados
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="15"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.dias_feriados}
                                            onChange={(e) => setData("dias_feriados", e.target.value)}
                                        />
                                    </div>
                                )}
                                {/* Fin del bloque para días feriados */}

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Registrar Quincena
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