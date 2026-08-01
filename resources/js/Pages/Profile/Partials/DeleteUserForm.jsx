import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SotoKineticArtGallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [artIndex, setArtIndex] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [keys, setKeys] = useState(new Set());

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeys(prev => new Set(prev).add(e.key));
        };
        const handleKeyUp = (e) => {
            setKeys(prev => {
                const newKeys = new Set(prev);
                newKeys.delete(e.key);
                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        });
    }, []);

    const nextArt = () => {
        setArtIndex((prev) => (prev + 1) % sotoArtworks.length);
    };

    // Obras cinéticas automáticas
    const AutomaticArtworks = {
        VibracionPura: (
            <motion.div className="w-full h-full bg-white relative overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-full w-1"
                        style={{ left: `${(i / 40) * 100}%` }}
                        animate={{
                            x: [0, 4, 0, -4, 0],
                            backgroundColor: ['#000', '#2563eb', '#000']
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.05,
                        }}
                    />
                ))}
            </motion.div>
        ),

        EscriturasVibratorias: (
            <motion.div className="w-full h-full bg-black relative overflow-hidden">
                {Array.from({ length: 100 }).map((_, i) => {
                    const row = Math.floor(i / 10);
                    const col = i % 10;
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-8 h-8"
                            style={{
                                left: `${col * 10}%`,
                                top: `${row * 10}%`,
                            }}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: (row + col) * 0.1,
                            }}
                        >
                            <div className="w-full h-full rounded-full bg-blue-500 opacity-50" />
                        </motion.div>
                    );
                })}
            </motion.div>
        ),

        PenetrableVirtual: (
            <motion.div className="w-full h-full bg-gray-900 relative overflow-hidden">
                {Array.from({ length: 200 }).map((_, i) => {
                    const col = i % 20;
                    return (
                        <motion.div
                            key={i}
                            className="absolute h-full w-0.5"
                            style={{ left: `${(col / 20) * 100}%` }}
                            animate={{
                                y: [0, 20, 0],
                                opacity: [0.2, 1, 0.2],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: col * 0.1,
                            }}
                        >
                            <div className="h-full w-full bg-yellow-400" />
                        </motion.div>
                    );
                })}
            </motion.div>
        ),

        OndasCromaticas: (
            <motion.div className="w-full h-full relative overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full"
                        style={{ top: `${(i / 15) * 100}%` }}
                        animate={{
                            scaleX: [1, 1.2, 1],
                            backgroundColor: ['#2563eb', '#000', '#2563eb'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    >
                        <div className="h-8 w-full" />
                    </motion.div>
                ))}
            </motion.div>
        ),
    };


    const MoreArtworks = {
        CampoMagnetico: (
            <motion.div 
                className="w-full h-full bg-black relative overflow-hidden"
                onMouseMove={handleMouseMove}
            >
                {Array.from({ length: 100 }).map((_, i) => {
                    const row = Math.floor(i / 10);
                    const col = i % 10;
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-4 h-4"
                            style={{
                                left: `${col * 10}%`,
                                top: `${row * 10}%`,
                            }}
                            animate={{
                                x: mousePos.x * 50 - 25,
                                y: mousePos.y * 50 - 25,
                                rotate: [0, 360],
                                backgroundColor: ['#fff', '#2563eb', '#fff'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: (row + col) * 0.05,
                            }}
                        />
                    );
                })}
            </motion.div>
        ),

        EspejoVibratorio: (
            <motion.div className="w-full h-full bg-gradient-to-br from-blue-900 to-black relative overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-1"
                        style={{
                            top: `${(i / 20) * 100}%`,
                            backgroundColor: i % 2 ? '#fff' : '#2563eb',
                            opacity: 0.5,
                        }}
                        animate={{
                            scaleX: [1, 1.2, 1],
                            opacity: [0.3, 0.7, 0.3],
                            rotate: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={`v-${i}`}
                        className="absolute h-full w-1"
                        style={{
                            left: `${(i / 20) * 100}%`,
                            backgroundColor: i % 2 ? '#2563eb' : '#fff',
                            opacity: 0.5,
                        }}
                        animate={{
                            scaleY: [1, 1.1, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </motion.div>
        ),

        TecladoCinetico: (
            <motion.div className="w-full h-full bg-black relative overflow-hidden">
                {Array.from({ length: 26 }).map((_, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const isPressed = keys.has(letter.toLowerCase());
                    return (
                        <motion.div
                            key={letter}
                            className="absolute rounded-full"
                            style={{
                                width: '40px',
                                height: '40px',
                                left: `${(i % 7) * 15}%`,
                                top: `${Math.floor(i / 7) * 25}%`,
                                backgroundColor: isPressed ? '#2563eb' : '#fff',
                            }}
                            animate={{
                                scale: isPressed ? [1, 1.5, 1] : 1,
                                opacity: isPressed ? [0.5, 1, 0.5] : 0.5,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                        >
                            <div className="w-full h-full flex items-center justify-center text-black font-bold">
                                {letter}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        ),

        OndaInteractiva: (
            <motion.div 
                className="w-full h-full bg-gradient-to-br from-purple-900 to-black relative overflow-hidden"
                onMouseMove={handleMouseMove}
            >
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-8"
                        style={{
                            top: `${(i / 15) * 100}%`,
                        }}
                        animate={{
                            x: mousePos.x * 100 - 50,
                            scaleX: [1, 1.1, 1],
                            backgroundColor: ['#4f46e5', '#2563eb', '#4f46e5'],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </motion.div>
        ),

        EspiralesVibrantes: (
            <motion.div className="w-full h-full bg-white relative overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 rounded-full border-2 border-blue-600"
                        style={{
                            width: `${(i + 1) * 8}%`,
                            height: `${(i + 1) * 8}%`,
                            marginLeft: `-${(i + 1) * 4}%`,
                            marginTop: `-${(i + 1) * 4}%`,
                        }}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </motion.div>
        ),
    };

    const sotoArtworks = [
        ...Object.values(AutomaticArtworks),
        ...Object.values(MoreArtworks),
    ];


const artworkInfo = [
    { title: "Vibración Pura", type: "Automática" },
    { title: "Escrituras Vibratorias", type: "Automática" },
    { title: "Penetrable Virtual", type: "Automática" },
    { title: "Ondas Cromáticas", type: "Automática" },
    { title: "Campo Magnético", type: "Interactiva - Mouse" },
    { title: "Espejo Vibratorio", type: "Automática" },
    { title: "Teclado Cinético", type: "Interactiva - Teclado" },
    { title: "Onda Interactiva", type: "Interactiva - Mouse" },
    { title: "Espirales Vibrantes", type: "Automática" }
];

return (
    <div className="p-4">
        <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     shadow-lg hover:shadow-xl transition-all duration-300"
        >
            Galería de Arte Cinético
        </button>

        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="relative bg-white rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="w-full max-w-4xl">
                            {/* Área principal de la obra */}
                            <div className="relative h-[60vh] bg-black">
                                {sotoArtworks[artIndex]}
                            </div>

                            {/* Panel de información y controles */}
                            <div className="p-6 bg-white">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {artworkInfo[artIndex].title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            {artworkInfo[artIndex].type}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {artIndex + 1} / {sotoArtworks.length}
                                    </div>
                                </div>

                                {/* Instrucciones específicas */}
                                <div className="mb-6">
                                    {artworkInfo[artIndex].type.includes("Mouse") && (
                                        <p className="text-blue-600">
                                            Mueve el mouse sobre la obra para interactuar
                                        </p>
                                    )}
                                    {artworkInfo[artIndex].type.includes("Teclado") && (
                                        <p className="text-blue-600">
                                            Presiona cualquier tecla para crear efectos visuales
                                        </p>
                                    )}
                                </div>

                                {/* Controles de navegación */}
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setArtIndex((prev) => 
                                                prev === 0 ? sotoArtworks.length - 1 : prev - 1
                                            )}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg 
                                                     hover:bg-gray-200 transition-colors"
                                        >
                                            Anterior
                                        </button>
                                        <button
                                            onClick={() => setArtIndex((prev) => 
                                                (prev + 1) % sotoArtworks.length
                                            )}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                                                     hover:bg-blue-700 transition-colors"
                                        >
                                            Siguiente
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg 
                                                 hover:bg-gray-300 transition-colors"
                                    >
                                        Cerrar
                                    </button>
                                </div>

                                {/* Miniaturas de navegación */}
                                <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                                    {sotoArtworks.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setArtIndex(idx)}
                                            className={`w-3 h-3 rounded-full transition-colors ${
                                                idx === artIndex 
                                                    ? 'bg-blue-600' 
                                                    : 'bg-gray-300 hover:bg-blue-400'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
);
}