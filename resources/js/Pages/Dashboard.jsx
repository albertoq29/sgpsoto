import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard({ 
    auth, 
    empleadosCount, 
    profesionalizacionCount, 
    empleadosConHijosCount, 
    gastosMensuales,
    primerQuincenaDetallado,
    segundaQuincenaDetallado 
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfessionalHistogramOpen, setIsProfessionalHistogramOpen] = useState(false);
    const [isChildrenHistogramOpen, setIsChildrenHistogramOpen] = useState(false);
    const [isExpensesHistogramOpen, setIsExpensesHistogramOpen] = useState(false);

    // Estado para los filtros de gastos
    const [selectedExpenseTypes, setSelectedExpenseTypes] = useState({
        sueldo: true,
        profesionalizacion: true,
        hijos: true,
        antiguedad: true,
        cestaticket: true,
        horas_extra: true,
        bono_nocturno: true,
        dias_feriados: true, // Añadido días feriados
    });

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleProfessionalHistogram = () => setIsProfessionalHistogramOpen(!isProfessionalHistogramOpen);
    const toggleChildrenHistogram = () => setIsChildrenHistogramOpen(!isChildrenHistogramOpen);
    const toggleExpensesHistogram = () => setIsExpensesHistogramOpen(!isExpensesHistogramOpen);

    // Datos para el gráfico de profesionalización
    const professionalData = [
        { name: 'Total Empleados', cantidad: empleadosCount },
        { name: 'Con Profesionalización', cantidad: profesionalizacionCount }
    ];

    // Datos para el gráfico de hijos
    const childrenData = [
        { name: 'Total Empleados', cantidad: empleadosCount },
        { name: 'Con Hijos', cantidad: empleadosConHijosCount }
    ];

    // Configuración de tipos de gastos (se añade días feriados)
    const expenseTypes = {
        sueldo: { name: 'Sueldo Básico Quincenal', color: '#4F46E5' },
        profesionalizacion: { name: 'Prima Profesionalización', color: '#10B981' },
        hijos: { name: 'Prima por Hijos', color: '#F59E0B' },
        antiguedad: { name: 'Prima por Antigüedad', color: '#EC4899' },
        cestaticket: { name: 'Cestaticket', color: '#8B5CF6' },
        horas_extra: { name: 'Horas Extra', color: '#F87171' },
        bono_nocturno: { name: 'Bono Nocturno', color: '#6366F1' },
        dias_feriados: { name: 'Días Feriados', color: '#14B8A6' }, // Color verde azulado para días feriados
    };

    // Preparar datos para el gráfico detallado de gastos (se añade días feriados)
    const detailedExpensesData = [
        {
            name: 'Primera Quincena',
            sueldo: primerQuincenaDetallado.sueldo || 0,
            profesionalizacion: primerQuincenaDetallado.profesionalizacion || 0,
            hijos: primerQuincenaDetallado.hijos || 0,
            antiguedad: primerQuincenaDetallado.antiguedad || 0,
            horas_extra: primerQuincenaDetallado.horas_extra || 0,
            bono_nocturno: primerQuincenaDetallado.bono_nocturno || 0,
            dias_feriados: primerQuincenaDetallado.dias_feriados || 0, // Añadido días feriados
        },
        {
            name: 'Segunda Quincena',
            sueldo: segundaQuincenaDetallado.sueldo || 0,
            profesionalizacion: segundaQuincenaDetallado.profesionalizacion || 0,
            hijos: segundaQuincenaDetallado.hijos || 0,
            antiguedad: segundaQuincenaDetallado.antiguedad || 0,
            cestaticket: segundaQuincenaDetallado.cestaticket || 0,
            horas_extra: segundaQuincenaDetallado.horas_extra || 0,
            bono_nocturno: segundaQuincenaDetallado.bono_nocturno || 0,
            dias_feriados: segundaQuincenaDetallado.dias_feriados || 0, // Añadido días feriados
        }
    ];

    // Calcular totales para el gráfico de pastel
    const calculateTotals = () => {
        const totals = {};
        
        // Para cada tipo de gasto, excepto cestaticket que solo se registra en la segunda quincena
        Object.keys(expenseTypes).forEach(key => {
            if (key !== 'cestaticket') {
                totals[key] = (primerQuincenaDetallado[key] || 0) + (segundaQuincenaDetallado[key] || 0);
            } else {
                totals[key] = segundaQuincenaDetallado[key] || 0;
            }
        });
        
        return totals;
    };
    
    const totals = calculateTotals();
    
    // Crear datos para gráfico tipo pie de gastos generales
    const pieData = Object.entries(totals).map(([key, value]) => ({
        name: expenseTypes[key]?.name || key,
        value,
        color: expenseTypes[key]?.color || '#999'
    }));

    const toggleExpenseType = (type) => {
        setSelectedExpenseTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Sistema de Gestión
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Welcome Card with Logo */}
                    <div className="bg-gradient-to-r from-blue-800 to-indigo-900 shadow-xl rounded-xl text-white p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="space-y-4 mb-6 md:mb-0">
                                <h1 className="text-4xl font-bold">Bienvenido al Sistema de Gestión</h1>
                                <h2 className="text-2xl font-semibold">Recibos de Pagos</h2>
                                <p className="text-xl">Fundación Museo de Arte Moderno Jesús Soto</p>
                            </div>
                            <div className="bg-white p-3 rounded-full">
                                {/* Logo del museo */}
                                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                    FMAMJS
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Layout with Sidebar */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Main Content Area */}
                        <div className="lg:w-3/4 space-y-6">
                            {/* Quick Access Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {auth.user.rol === 1 && (
                                    <>
                                        {/* Users Card */}
                                        <Link href={route('modify-users.index')} className="p-6 bg-white shadow-md rounded-lg hover:bg-gray-50 transition group">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-gray-800 font-semibold text-xl">Usuarios</div>
                                                    <p className="mt-1 text-gray-500">Administra usuarios del sistema</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Employees Card */}
                                        <Link href={route('empleados.index')} className="p-6 bg-white shadow-md rounded-lg hover:bg-gray-50 transition group">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-gray-800 font-semibold text-xl">Empleados</div>
                                                    <p className="mt-1 text-gray-500">Gestiona información laboral</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Statistics Card */}
                                        <div
                                            onClick={toggleModal}
                                            className="p-6 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-50 transition group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-gray-800 font-semibold text-xl">Estadísticas</div>
                                                    <p className="mt-1 text-gray-500">Visualiza datos actuales</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                        </div>

                        {/* Sidebar with Statistics */}
                        <div className="lg:w-1/4 space-y-6">
                            {/* Gastos Mensuales Summary Card */}
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumen de Gastos</h3>
                                <div className="text-center mb-4">
                                    <div className="text-gray-500 text-sm">Total Mensual</div>
                                    <div className="text-3xl font-bold text-indigo-600">
                                        Bs {gastosMensuales.toLocaleString('es-VE')}
                                    </div>
                                </div>
                                
                                {/* Mini pie chart for expenses */}
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={80}
                                                paddingAngle={2}
                                                dataKey="value"
                                                nameKey="name"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                
                                <button
                                    onClick={toggleExpensesHistogram}
                                    className="w-full mt-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Ver Detalles
                                </button>
                            </div>
                            
                            {/* Employment Stats */}
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas de Personal</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Empleados:</span>
                                        <span className="font-semibold">{empleadosCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Con Profesionalización:</span>
                                        <span className="font-semibold">{profesionalizacionCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Con Hijos:</span>
                                        <span className="font-semibold">{empleadosConHijosCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Statistics */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">📊 Estadísticas</h2>

                        <div
                            onClick={toggleProfessionalHistogram}
                            className="p-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">Empleados con Profesionalización</h3>
                            <p className="text-gray-600">Haz clic para ver el histograma.</p>
                        </div>

                        <div
                            onClick={toggleChildrenHistogram}
                            className="p-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">Empleados con Hijos</h3>
                            <p className="text-gray-600">Haz clic para ver el histograma.</p>
                        </div>

                        <div
                            onClick={toggleExpensesHistogram}
                            className="p-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">Gastos Mensuales</h3>
                            <p className="text-gray-600">Haz clic para ver el histograma.</p>
                        </div>

                        <button
                            onClick={toggleModal}
                            className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Professionalization Histogram */}
            {isProfessionalHistogramOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">📈 Histograma de Profesionalización</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={professionalData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cantidad" fill="#4F46E5" />
                            </BarChart>
                        </ResponsiveContainer>
                        <button
                            onClick={toggleProfessionalHistogram}
                            className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Employees with Children Histogram */}
            {isChildrenHistogramOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">📈 Histograma de Empleados con Hijos</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={childrenData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cantidad" fill="#F59E0B" />
                            </BarChart>
                        </ResponsiveContainer>
                        <button
                            onClick={toggleChildrenHistogram}
                            className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Monthly Expenses Histogram */}
            {isExpensesHistogramOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">📊 Gastos Mensuales</h2>
                        <div className="text-center text-2xl font-bold text-indigo-600">
                            Total: BS {gastosMensuales.toLocaleString('es-VE')}
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {Object.entries(expenseTypes).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => toggleExpenseType(key)}
                                    className={`p-2 rounded text-sm ${
                                        selectedExpenseTypes[key] 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {value.name}
                                </button>
                            ))}
                        </div>

                        {/* Detailed Chart */}
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={detailedExpensesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {Object.entries(expenseTypes).map(([key, value]) => (
                                        selectedExpenseTypes[key] && (
                                            <Bar 
                                                key={key}
                                                dataKey={key}
                                                name={value.name}
                                                fill={value.color}
                                            />
                                        )
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <button
                            onClick={toggleExpensesHistogram}
                            className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}