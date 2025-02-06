import{q as g,r as a,j as e,Y as v,y as b}from"./app-RqH-pmAi.js";import{A as w}from"./AuthenticatedLayout-4ajSe-j3.js";import{S as c}from"./sweetalert2.esm.all-D3pEHXw3.js";function k({auth:x}){const{flash:s}=g().props,[r,o]=a.useState(!1),[t,i]=a.useState(!1),[m,l]=a.useState(!1),[h,n]=a.useState(!1),p=()=>{i(!0),n(!0),setTimeout(()=>{n(!1),i(!1),window.location.href=route("copia.descarga"),c.fire({title:"¡Descarga Iniciada!",text:"El archivo de respaldo se está descargando",icon:"success",confirmButtonText:"Entendido",confirmButtonColor:"#3B82F6"})},2200)},u=()=>{l(!0),setTimeout(()=>{l(!1),c.fire({title:"¡Restauración Completada!",text:"La base de datos ha sido restaurada exitosamente",icon:"success",confirmButtonText:"Entendido",confirmButtonColor:"#10B981"})},2200)};return e.jsxs(w,{user:x.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Gestión de Respaldos"}),children:[e.jsx(v,{title:"Respaldos"}),h&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center",children:e.jsx("div",{className:"bg-white p-8 rounded-lg shadow-xl max-w-md w-full",children:e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsxs("div",{className:"transfer-animation mb-4",children:[e.jsx("div",{className:"server-download",children:e.jsx("div",{className:"server-lights"})}),e.jsx("div",{className:"files-download",children:e.jsx("div",{className:"file-download"})}),e.jsxs("div",{className:"computer-download",children:[e.jsx("div",{className:"screen-download"}),e.jsx("div",{className:"keyboard-download"})]})]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-700",children:"Preparando Descarga"}),e.jsx("p",{className:"text-gray-500 text-center mt-2",children:"El servidor está preparando tu archivo de respaldo..."})]})})}),m&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center",children:e.jsx("div",{className:"bg-white p-8 rounded-lg shadow-xl max-w-md w-full",children:e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsxs("div",{className:"transfer-animation mb-4",children:[e.jsxs("div",{className:"computer",children:[e.jsx("div",{className:"screen"}),e.jsx("div",{className:"keyboard"})]}),e.jsx("div",{className:"files",children:e.jsx("div",{className:"file"})}),e.jsx("div",{className:"server",children:e.jsx("div",{className:"server-lights"})})]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-700",children:"Procesando Restauración"}),e.jsx("p",{className:"text-gray-500 text-center mt-2",children:"Enviando datos al servidor y restaurando la base de datos..."})]})})}),e.jsx("div",{className:"py-12",children:e.jsxs("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6",children:[(s==null?void 0:s.success)&&e.jsx("div",{className:"p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded animate-fade-in",children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("svg",{className:"h-5 w-5 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})})}),e.jsx("div",{className:"ml-3",children:e.jsx("p",{className:"text-sm",children:s.success})})]})}),(s==null?void 0:s.error)&&e.jsx("div",{className:"p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded animate-fade-in",children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("svg",{className:"h-5 w-5 text-red-500",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})})}),e.jsx("div",{className:"ml-3",children:e.jsx("p",{className:"text-sm",children:s.error})})]})}),e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition-shadow duration-300",children:e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("svg",{className:"h-8 w-8 text-blue-500 mr-3",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})}),e.jsx("h3",{className:"text-xl font-bold text-gray-800",children:"Descargar Backup"})]}),e.jsx("p",{className:"text-gray-600 mb-6",children:"Descarga una copia de seguridad completa de la base de datos para mantener tus datos seguros."}),e.jsx("button",{onClick:p,disabled:t,className:`
                                    ${t?"bg-gray-500":"bg-blue-500 hover:bg-blue-600"}
                                    text-white font-bold py-3 px-6 rounded-lg
                                    transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                    flex items-center
                                `,children:t?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Preparando descarga..."]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"h-5 w-5 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})}),"Descargar Backup"]})})]})}),e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition-shadow duration-300",children:e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("svg",{className:"h-8 w-8 text-green-500 mr-3",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"})}),e.jsx("h3",{className:"text-xl font-bold text-gray-800",children:"Restaurar Backup"})]}),e.jsx("p",{className:"text-gray-600 mb-6",children:"Selecciona un archivo .sql para restaurar la base de datos a un estado anterior."}),e.jsxs("form",{onSubmit:d=>{d.preventDefault(),o(!0),u();const f=new FormData(d.target);b.post(route("restore.database"),f,{onFinish:()=>o(!1)})},className:"space-y-6",children:[e.jsx("div",{className:"relative",children:e.jsx("input",{type:"file",name:"backup_file",accept:".sql",className:`block w-full text-sm text-gray-500\r
                                            file:mr-4 file:py-3 file:px-6\r
                                            file:rounded-lg file:border-0\r
                                            file:text-sm file:font-semibold\r
                                            file:bg-green-50 file:text-green-700\r
                                            hover:file:bg-green-100\r
                                            cursor-pointer transition-all duration-300\r
                                            border-2 border-dashed border-gray-300\r
                                            rounded-lg p-4 hover:border-green-500`,required:!0})}),e.jsx("button",{type:"submit",disabled:r,className:`
                                        w-full ${r?"bg-gray-500":"bg-green-500 hover:bg-green-600"}
                                        text-white font-bold py-3 px-6 rounded-lg
                                        transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                                        flex items-center justify-center
                                    `,children:r?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Restaurando..."]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"h-5 w-5 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"})}),"Restaurar Backup"]})})]})]})})]})}),e.jsx("style",{jsx:!0,children:`
                .transfer-animation {
                    position: relative;
                    width: 200px;
                    height: 100px;
                }

                /* Estilos para la animación de restauración (PC a Servidor) */
                .computer {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 60px;
                    height: 50px;
                }

                .screen {
                    background: #333;
                    width: 100%;
                    height: 35px;
                    border-radius: 5px;
                }

                .keyboard {
                    background: #666;
                    width: 100%;
                    height: 10px;
                    margin-top: 5px;
                    border-radius: 2px;
                }

                .server {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 40px;
                    height: 70px;
                    background: #444;
                    border-radius: 5px;
                }

                /* Estilos para la animación de descarga (Servidor a PC) */
                .server-download {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 40px;
                    height: 70px;
                    background: #444;
                    border-radius: 5px;
                }

                .computer-download {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 60px;
                    height: 50px;
                }

                .screen-download {
                    background: #333;
                    width: 100%;
                    height: 35px;
                    border-radius: 5px;
                }

                .keyboard-download {
                    background: #666;
                    width: 100%;
                    height: 10px;
                    margin-top: 5px;
                    border-radius: 2px;
                }

                .server-lights {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    width: 4px;
                    height: 4px;
                    background: #00ff00;
                    border-radius: 50%;
                    animation: blink 1s infinite;
                }

                .files, .files-download {
                    position: absolute;
                    top: 20px;
                }

                .files {
                    left: 70px;
                }

                .files-download {
                    right: 70px;
                }

                .file, .file-download {
                    width: 15px;
                    height: 15px;
                    background: #3498db;
                    position: relative;
                }

                .file:before, .file-download:before {
                    content: '';
                    position: absolute;
                    top: -3px;
                    right: -3px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 6px 6px 0;
                    border-color: transparent #fff transparent transparent;
                }

                .file {
                    animation: transfer 1.5s infinite;
                }

                .file-download {
                    animation: transfer-download 1.5s infinite;
                }

                @keyframes transfer {
                    0% {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: translateX(50px) scale(0.8);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateX(100px) scale(0.6);
                        opacity: 0;
                    }
                }

                @keyframes transfer-download {
                    0% {
                        transform: translateX(0) scale(0.6);
                        opacity: 0;
                    }
                    50% {
                        transform: translateX(-50px) scale(0.8);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateX(-100px) scale(1);
                        opacity: 1;
                    }
                }

                @keyframes blink {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in;
                }

                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `})]})}export{k as default};
