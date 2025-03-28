import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div
        className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
        style={{
            backgroundImage: 'url("/imagenes/p1.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}
    >
    
            {/* Overlay Oscuro */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Logo con Animación */}
            <motion.div 
                className="relative z-10 mb-6 flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <Link href="/">
                    <img
                        src="/imagenes/logo (2).png" // Ruta del logo
                        alt="Mi Logo"
                        className="h-24 w-24 drop-shadow-lg"
                    />
                </Link>
                <motion.h1 
                    className="mt-3 text-3xl text-white font-extrabold tracking-widest uppercase drop-shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Travel Tunnel VR
                </motion.h1>
            </motion.div>

            {/* Contenedor de Formulario */}
            <motion.div 
                className="relative z-10 mt-6 w-full bg-black/90 px-8 py-6 shadow-2xl sm:max-w-md sm:rounded-lg border border-cyan-500 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {children}
            </motion.div>
        </div>
    );
}
