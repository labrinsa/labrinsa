import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer id="colophon" className="bg-white border-t border-gray-100 font-sans text-[#444] relative overflow-hidden">
            {/* Capa de Fondo - Espejada y opaca solo en móvil */}
            <div
                className="absolute inset-0 z-0 bg-no-repeat bg-[length:50%_auto] md:bg-contain bg-left-top md:bg-left opacity-30 md:opacity-100 transform -scale-x-100 md:scale-x-100 transition-all duration-300"
                style={{
                    backgroundImage: `url('/a.png')`,
                }}
            />

            {/* Sección Superior: Contenido */}
            <div className="relative z-10 py-12 md:py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        {/* Widget 1: Logo */}
                        <div className="flex flex-col z-10">
                            <img
                                src="/cropped-Logo-Labrin-solo-small.png"
                                alt="Logo Laboratorios Rincón"
                                className="w-48 md:w-full max-w-[220px] h-auto object-contain mb-4"
                            />
                        </div>

                        {/* Widget 2: Espacio vacío (Solo en desktop) */}
                        <div className="hidden md:block"></div>

                        {/* Widget 3: Enlaces Rápidos */}
                        <div className="flex flex-col z-10">
                            <h2 className="text-[1.2rem] font-bold text-[#1a1a1a] mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-10 after:bg-red-600">
                                Enlaces rápidos
                            </h2>
                            <ul className="space-y-3 font-medium">
                                <li><NavLink to="/" className="hover:text-red-600 transition-colors">Inicio</NavLink></li>
                                <li><NavLink to="/products" className="hover:text-red-600 transition-colors">Productos</NavLink></li>
                                <li><NavLink to="/about" className="hover:text-red-600 transition-colors">Nosotros</NavLink></li>
                                <li><NavLink to="/contact" className="hover:text-red-600 transition-colors">Contáctenos</NavLink></li>
                            </ul>
                        </div>

                        {/* Widget 4: Información de Contacto */}
                        <div className="flex flex-col z-10">
                            <h2 className="text-[1.2rem] font-bold text-[#1a1a1a] mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-10 after:bg-red-600">
                                Información de contacto
                            </h2>
                            <div className="text-[#333] leading-relaxed space-y-2">
                                <p className="max-w-[250px] md:max-w-full">
                                    Av. 59, Nº. 140-535, Zona industrial primera etapa, Maracaibo
                                </p>
                                <p className="hover:text-red-600 cursor-pointer transition-colors break-words">
                                    labrin.atencionalcliente@gmail.com
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Barra Inferior */}
            <div className="bg-[#f5f5f5] border-t border-gray-200 py-6">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center md:text-left text-[0.85rem] text-gray-500">
                    <p>© 2020 Laboratorios Rincón S.A., todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;