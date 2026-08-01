import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Backups({ auth }) {
    const { flash } = usePage().props;
    const [isUploading, setIsUploading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showRestoreOverlay, setShowRestoreOverlay] = useState(false);
    const [showDownloadOverlay, setShowDownloadOverlay] = useState(false);
    const [fileName, setFileName] = useState('Ningún archivo seleccionado');

    const handleDownloadBackup = () => {
        setIsDownloading(true);
        setShowDownloadOverlay(true);
        setTimeout(() => {
            setShowDownloadOverlay(false);
            setIsDownloading(false);
            window.location.href = route('copia.descarga');
            Swal.fire({
                title: '¡Descarga Iniciada!',
                text: 'El archivo de respaldo se está descargando',
                icon: 'success',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#3B82F6',
                customClass: {
                    popup: 'swal-modern-popup',
                    title: 'swal-modern-title',
                    confirmButton: 'swal-modern-button'
                }
            });
        }, 2200);
    };

    const simulateLoading = () => {
        setShowRestoreOverlay(true);
        setTimeout(() => {
            setShowRestoreOverlay(false);
            Swal.fire({
                title: '¡Restauración Completada!',
                text: 'La base de datos ha sido restaurada exitosamente',
                icon: 'success',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#10B981',
                customClass: {
                    popup: 'swal-modern-popup',
                    title: 'swal-modern-title',
                    confirmButton: 'swal-modern-button'
                }
            });
        }, 2200);
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('Ningún archivo seleccionado');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gestión de Respaldos
                </h2>
            }
        >
            <Head title="Respaldos" />

            {/* Download Loading Overlay */}
            {showDownloadOverlay && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Preparando tu respaldo</h3>
                                <p className="text-gray-600 text-center mb-6">
                                    Estamos generando una copia completa de la base de datos para ti
                                </p>
                                
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                                    <div className="h-2 rounded-full bg-blue-600 progress-animation"></div>
                                </div>
                                
                                <p className="text-sm text-gray-500">
                                    Esto puede tomar unos momentos...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Restore Loading Overlay */}
            {showRestoreOverlay && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-green-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                    </svg>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Restaurando base de datos</h3>
                                <p className="text-gray-600 text-center mb-6">
                                    Estamos restaurando tu información desde el archivo de respaldo
                                </p>
                                
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                                    <div className="h-2 rounded-full bg-green-600 progress-animation"></div>
                                </div>
                                
                                <p className="text-sm text-gray-500">
                                    No cierres esta ventana durante el proceso...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Banner informativo */}
                    <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full -mt-12 -mr-12 opacity-30"></div>
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-4">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-1">Administración de copias de seguridad</h2>
                                    <p className="text-blue-100 max-w-3xl">
                                        Este módulo le permite crear y restaurar respaldos completos de su base de datos.
                                        Se recomienda realizar copias de seguridad periódicas para prevenir pérdida de información.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mensajes de éxito o error */}
                    {flash?.success && (
                        <div className="mb-6 bg-white border-l-4 border-green-500 rounded-lg shadow-md p-5 transform transition-all duration-300 animate-fade-in">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                                    <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="font-medium text-green-800">{flash.success}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-6 bg-white border-l-4 border-red-500 rounded-lg shadow-md p-5 transform transition-all duration-300 animate-fade-in">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                                    <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="font-medium text-red-800">{flash.error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Sección de Descarga de Backup */}
                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="border-b border-gray-100 p-6">
                                <div className="flex items-center">
                                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                                        <svg className="h-8 w-8 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Descargar Backup</h3>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                La copia de seguridad incluirá todos los datos del sistema, incluyendo usuarios, configuración y registros.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Formato:</span>
                                        <span className="font-medium text-gray-700">SQL Database Dump (.sql)</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Incluye:</span>
                                        <span className="font-medium text-gray-700">Estructura y datos completos</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Compatibilidad:</span>
                                        <span className="font-medium text-gray-700">MySQL</span>
                                    </div>
                                </div>
                                
                                <div className="mt-8">
                                    <button
                                        onClick={handleDownloadBackup}
                                        disabled={isDownloading}
                                        className={`
                                            w-full flex items-center justify-center gap-3
                                            px-6 py-3 rounded-xl
                                            font-medium text-white text-base
                                            transition-all duration-300
                                            shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                                            ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}
                                        `}
                                    >
                                        {isDownloading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Preparando descarga...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                                </svg>
                                                Descargar copia de seguridad
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sección de Restauración de Backup */}
                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="border-b border-gray-100 p-6">
                                <div className="flex items-center">
                                    <div className="rounded-full bg-green-100 p-3 mr-4">
                                        <svg className="h-8 w-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Restaurar Backup</h3>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-100">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">
                                                ¡Advertencia! Este proceso sobrescribirá todos los datos actuales. Asegúrese de tener una copia de seguridad reciente antes de continuar.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <form 
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setIsUploading(true);
                                        simulateLoading();
                                        const formData = new FormData(e.target);
                                        router.post(route('restore.database'), formData, {
                                            onFinish: () => setIsUploading(false)
                                        });
                                    }}
                                    className="space-y-6"
                                >
                                    <div className="relative">
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 transition-all hover:border-green-500 bg-gray-50">
                                            <input
                                                type="file"
                                                id="backup_file"
                                                name="backup_file"
                                                accept=".sql"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                required
                                            />
                                            <div className="text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="mt-2 text-sm font-medium text-gray-900">
                                                    <span className="text-green-600 hover:text-green-700">Seleccione un archivo</span> o arrastre y suelte
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Solo archivos SQL (máx. 50MB)
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {fileName !== 'Ningún archivo seleccionado' && (
                                            <div className="mt-3 flex items-center justify-between px-3 py-2 bg-green-50 rounded-lg border border-green-100">
                                                <div className="flex items-center">
                                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm text-gray-700 truncate max-w-xs">{fileName}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setFileName('Ningún archivo seleccionado')}
                                                    className="text-gray-400 hover:text-gray-500"
                                                >
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isUploading || fileName === 'Ningún archivo seleccionado'}
                                        className={`
                                            w-full flex items-center justify-center gap-3
                                            px-6 py-3 rounded-xl
                                            font-medium text-white text-base
                                            transition-all duration-300
                                            shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                                            ${isUploading || fileName === 'Ningún archivo seleccionado' 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}
                                        `}
                                    >
                                        {isUploading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Restaurando datos...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                                </svg>
                                                Restaurar base de datos
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .progress-animation {
                    animation: progressAnimation 2s infinite;
                    width: 0%;
                }

                @keyframes progressAnimation {
                    0% { width: 0%; }
                    50% { width: 70%; }
                    75% { width: 90%; }
                    100% { width: 95%; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in;
                }

                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                /* SweetAlert modern styling */
                :global(.swal-modern-popup) {
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
                
                :global(.swal-modern-title) {
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                
                :global(.swal-modern-button) {
                    padding: 0.75rem 2rem;
                    border-radius: 0.5rem;
                    font-weight: 500;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
            `}</style>
        </AuthenticatedLayout>
    );
}