import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const [showSidebar, setShowSidebar] = useState(true); // Inicialmente abierto
    const [showPagosMenu, setShowPagosMenu] = useState(false);
    const [showGestionMenu, setShowGestionMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const userMenuRef = useRef(null);
    
    // Cerrar el menú de usuario al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Efecto para manejar el tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowSidebar(false);
            } else {
                setShowSidebar(true);
            }
        };

        // Establecer estado inicial
        handleResize();

        // Agregar listener
        window.addEventListener('resize', handleResize);
        
        // Limpiar listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render different sidebar content based on user role
    const renderSidebarContent = () => {
        if (user.rol === 0) {
            // Simple sidebar for rol=0 users
            return (
                <nav className="space-y-1 text-gray-600">
                    <Link 
                        href={route('dashboard')} 
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition-colors ${
                            route().current('dashboard') 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'hover:bg-gray-50 hover:text-blue-500'
                        }`}
                    >
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-3">🏠</span>
                        <span>Inicio</span>
                    </Link>
                    
                    <Link 
                        href={route('quincenas.empleados')} 
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition-colors ${
                            route().current('quincenas.empleados') 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'hover:bg-gray-50 hover:text-blue-500'
                        }`}
                    >
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-3">📊</span>
                        <span>Listados de quincenas</span>
                    </Link>
                    
                    <Link 
                        href={route('empleados.index')} 
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition-colors ${
                            route().current('empleados.index') 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'hover:bg-gray-50 hover:text-blue-500'
                        }`}
                    >
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-3">👥</span>
                        <span>Empleados</span>
                    </Link>
                    
                    <Link 
                        href={route('incidencias.index')} 
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition-colors ${
                            route().current('incidencias.index') 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'hover:bg-gray-50 hover:text-blue-500'
                        }`}
                    >
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-3">⚠️</span>
                        <span>Incidencias</span>
                    </Link>

                                       <div>
                              {/* Botón para descargar manual */}
          <a
            href={route('download.manual')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-gray-400 transition flex items-center space-x-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span>Descargar Manual</span>
          </a>
          </div>
                </nav>
            );
        }

        // Original sidebar for rol=1 users
        return (
            <nav className="space-y-1 text-gray-600">
                <Link 
                    href={route('dashboard')} 
                    className={`flex items-center px-4 py-3 text-base rounded-lg transition-colors ${
                        route().current('dashboard') 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'hover:bg-gray-50 hover:text-blue-500'
                    }`}
                >
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-3">🏠</span>
                    <span>Inicio</span>
                </Link>

                <div className="py-1">
                    <button
                        onClick={() => setShowPagosMenu(!showPagosMenu)}
                        className={`flex items-center justify-between w-full px-4 py-3 text-base rounded-lg transition-colors ${
                            showPagosMenu 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'hover:bg-gray-50 hover:text-blue-500'
                        }`}
                    >
                        <span className="flex items-center">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-3">💰</span>
                            <span>Pagos</span>
                        </span>
                        <svg 
                            className={`w-4 h-4 transition-transform ${showPagosMenu ? 'rotate-90' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    
                    {showPagosMenu && (
                        <div className="mt-1 ml-6 pl-4 border-l-2 border-blue-100 space-y-1">
                            <Link 
                                href={route('quincena.index')} 
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                    route().current('quincena.index') 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'hover:bg-gray-50 hover:text-blue-500'
                                }`}
                            >
                                Pago de quincenas
                            </Link>
                            <Link 
                                href={route('quincenas.empleados')} 
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                    route().current('quincenas.empleados') 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'hover:bg-gray-50 hover:text-blue-500'
                                }`}
                            >
                                Listados de quincenas
                            </Link>
                            <Link 
                                href={route('variables.index')} 
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                    route().current('variables.index') 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'hover:bg-gray-50 hover:text-blue-500'
                                }`}
                            >
                                Variables de pago
                            </Link>
                        </div>
                    )}
                </div>

                <div className="py-1">
                    <button
                        onClick={() => setShowGestionMenu(!showGestionMenu)}
                        className={`flex items-center justify-between w-full px-4 py-3 text-base rounded-lg transition-colors ${
                            showGestionMenu 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'hover:bg-gray-50 hover:text-blue-500'
                        }`}
                    >
                        <span className="flex items-center">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-3">📋</span>
                            <span>Gestión</span>
                        </span>
                        <svg 
                            className={`w-4 h-4 transition-transform ${showGestionMenu ? 'rotate-90' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    
                    {showGestionMenu && (
                        <div className="mt-1 ml-6 pl-4 border-l-2 border-blue-100 space-y-1">
                            <Link 
                                href={route('empleados.index')} 
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                    route().current('empleados.index') 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'hover:bg-gray-50 hover:text-blue-500'
                                }`}
                            >
                                Empleados
                            </Link>

                            <Link 
                                href={route('modify-users.index')} 
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                    route().current('modify-users.index') 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'hover:bg-gray-50 hover:text-blue-500'
                                }`}
                            >
                                Modificar Usuarios
                            </Link>
                            <Link 
                                href={route('backups.index')} 
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                    route().current('backups.index') 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'hover:bg-gray-50 hover:text-blue-500'
                                }`}
                            >
                                Backups
                            </Link>
                            <Link 
                                href={route('incidencias.index')} 
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                    route().current('incidencias.index') 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'hover:bg-gray-50 hover:text-blue-500'
                                }`}
                            >
                                Incidencias
                            </Link>
                            
                        </div>
                    )}
                    <div>
                              {/* Botón para descargar manual */}
          <a
            href={route('download.manual')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-gray-400 transition flex items-center space-x-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span>Descargar Manual</span>
          </a>
          </div>
                </div>
            </nav>
        );
    };

    return (
        <div className="relative min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md fixed w-full top-0 z-30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            {/* Botón para abrir sidebar cuando está cerrado */}
                            {!showSidebar && (
                                <button
                                    onClick={() => setShowSidebar(true)}
                                    className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none transition duration-150 mr-3"
                                    aria-label="Abrir menú"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            )}
                            <div className="flex items-center">
                                <img
                                    src="http://www.logobook.com/wp-content/uploads/2016/10/Museo_de_Arte_Moderno_Jesus_Soto_logo.svg"
                                    alt="Logo"
                                    className="h-8 w-auto mr-4"
                                />
                                <span className="text-lg font-medium text-gray-800 hidden md:block">
                                    Fundación Museo de Arte Moderno Jesús Soto
                                </span>
                                <span className="text-lg font-medium text-gray-800 md:hidden">
                                    FMAMJS
                                </span>
                            </div>
                        </div>

                        {/* User dropdown menu - Right side */}
                        <div className="relative" ref={userMenuRef}>
                            <button 
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-3 py-2 px-3 rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none transition duration-150 border border-gray-200"
                                aria-label="User menu"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden md:block text-gray-700 font-medium">{user.name}</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 z-50 transform origin-top-right transition-all duration-200 border border-gray-200">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                                    </div>
                                    
                                    <div className="py-1">
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <svg className="mr-3 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Mi Perfil
                                        </Link>
                                    </div>
                                    
                                    <div className="py-1 border-t border-gray-100">
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                        >
                                            <svg className="mr-3 w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Cerrar sesión
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Layout */}
            <div className="flex pt-16">
                {/* Sidebar */}
                <div
                    className={`fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                        showSidebar ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="p-4">
                        {/* Botón para cerrar sidebar - Dentro del sidebar */}
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="mb-4 p-2 rounded-md w-full text-gray-600 hover:bg-gray-100 focus:outline-none transition duration-150 flex items-center justify-between"
                            aria-label="Cerrar sidebar"
                        >
                            <span>Cerrar menú</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* User Info */}
                        <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center justify-center w-full text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md py-2 px-3 transition-colors border border-blue-200"
                            >
                                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Editar Perfil
                            </Link>
                        </div>

                        {/* Navigation Links - Rendered based on user role */}
                        {renderSidebarContent()}
                        
                        {/* Logout Button */}
                        <div className="mt-6 px-4">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center justify-center w-full text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md py-2 px-3 transition-colors border border-red-200"
                            >
                                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Cerrar sesión
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className={`flex-1 transition-all duration-300 ${
                    showSidebar ? 'md:ml-72' : 'ml-0'
                }`}>
                    {header && (
                        <header className="bg-white shadow-sm">
                            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {showSidebar && (
                <div
                    className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
                    onClick={() => setShowSidebar(false)}
                ></div>
            )}
        </div>
    );
}
