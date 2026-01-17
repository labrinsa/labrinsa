import React from 'react';

const Footer = () => {
    return (
        <footer id="colophon" className="bg-white border-t border-gray-100 font-sans text-[#444]">

            {/* Sección Superior: Widgets con imagen de fondo */}
            <div
                className="py-12 md:py-20 bg-no-repeat bg-contain bg-left"
                style={{
                    backgroundImage: `url('/a.png')`,
                }}
            >
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        {/* Widget 1: Logo (Ajustado para que no tape la imagen de fondo en móvil si es necesario) */}
                        <div className="flex flex-col z-10">
                            <img
                                src="/cropped-Logo-Labrin-solo-small.png"
                                alt="Logo Labrin"
                                className="w-full max-w-[220px] h-auto object-contain"
                            />
                        </div>

                        {/* Widget 2: Espacio vacío para dejar ver la imagen de fondo */}
                        <div className="hidden md:block"></div>

                        {/* Widget 3: Enlaces Rápidos */}
                        <div className="flex flex-col z-10">
                            <h2 className="text-[1.3rem] font-bold text-[#1a1a1a] mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-10 after:bg-red-600">
                                Enlaces rápidos
                            </h2>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Inicio</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Productos</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Nosotros</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Contáctenos</a></li>
                            </ul>
                        </div>

                        {/* Widget 4: Información de Contacto */}
                        <div className="flex flex-col z-10">
                            <h2 className="text-[1.3rem] font-bold text-[#1a1a1a] mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-10 after:bg-red-600">
                                Información de contacto
                            </h2>
                            <div className="text-[#666] leading-[1.8] space-y-1">
                                <p>Av. 59, Nº. 140-535, Zona industrial primera etapa, Maracaibo</p>
                                <p className="hover:text-red-600 cursor-pointer transition-colors">info@labrinsa.com</p>
                                <p>(0261) 736 2383</p>
                                <p>(0261) 717 0689</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Barra Inferior: Copyright */}
            <div className="bg-[#fcfcfc] border-t border-gray-100 py-6">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-[0.9rem] text-gray-500">
                    <p>© 2020 Laboratorios Rincón S.A., todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;