import React from 'react';
import { CheckCircle } from 'lucide-react'; // Opcional: para iconos más limpios

const About = () => {
    const valores = [
        "Innovación en procesos y productos",
        "Brindar Confianza y lealtad",
        "Primero la Responsabilidad y el respeto",
        "Brindar el mejor servicio y atención al cliente",
        "Trabajar en equipo para alcanzar metas comunes",
        "Apoyo educacional",
        "Resaltar la calidad en los productos de uso veterinario",
        "Sentirnos felices en nuestro trabajo"
    ];

    return (
        <div className="bg-white font-sans text-gray-700">
            {/* Sección Reseña Histórica */}
            <section className="max-w-4xl mx-auto px-6 py-16 text-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="https://labrinsa.com/wp-content/uploads/2020/08/Logo-Labrin-solo-small.png"
                        alt="Labrin Logo"
                        className="h-16 object-contain"
                    />
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-2">Reseña Histórica</h2>
                <div className="w-16 h-1 bg-red-600 mx-auto mb-8"></div>

                <div className="space-y-6 text-lg leading-relaxed text-justify md:text-center">
                    <p>
                        Laboratorios Rincón sucesora de Laboratorio Esteva nace en las adyacencias del Parque Urdaneta en el Centro de la ciudad de Maracaibo, dedicada a la fabricación de productos farmacéuticos de uso humano dirigidos a ambulatorios y hospitales del Estado Zulia, la cual fue adquirida por el Dr. Temístocles Rincón Martínez en el año 1945.
                    </p>
                    <p>
                        En 1962, el laboratorio cambia su sede a la zona industrial I etapa, donde se encuentra actualmente. En el año 1965 su fundador decide el cambio de denominación a Laboratorios Rincón S.A., cuyo objetivo sería la manufactura, venta y distribución no sólo de productos farmacéuticos de uso humano sino también de uso veterinario. Con el paso del tiempo se comienza a fabricar a mayor escala productos veterinarios, hasta que en el año 1999 deciden fabricar únicamente este grupo de productos...
                    </p>
                </div>
            </section>

            {/* Sección Misión (Imagen a la derecha) */}
            <section className="flex flex-col md:flex-row items-stretch">
                <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-16 bg-white">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Misión</h2>
                    <div className="w-12 h-1 bg-red-600 mb-6"></div>
                    <p className="text-lg italic text-gray-600 leading-relaxed">
                        “Laboratorios Rincón tiene como misión la fabricación y venta de fármacos de uso veterinario de alta calidad para satisfacer los requerimientos de médicos veterinarios y productores agropecuarios de Venezuela a precios competitivos...”
                    </p>
                </div>
                <div className="md:w-1/2 min-h-[400px]">
                    <img
                        src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=1000"
                        alt="Laboratorio"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Sección Visión (Imagen a la izquierda) */}
            <section className="flex flex-col md:flex-row-reverse items-stretch">
                <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-16 bg-white">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Visión</h2>
                    <div className="w-12 h-1 bg-red-600 mb-6"></div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Laboratorios Rincón tiene como visión ser el Laboratorio líder en el mercado nacional Venezolano a través del crecimiento organizacional, la ampliación y actualización de sus líneas de productos, utilizando una tecnología de vanguardia...
                    </p>
                </div>
                <div className="md:w-1/2 min-h-[400px]">
                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                        alt="Ganado"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Sección Valores */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Valores</h2>
                    <div className="w-16 h-1 bg-red-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {valores.map((valor, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="text-red-500 flex-shrink-0 w-6 h-6" />
                            <span className="text-gray-700 font-medium">{valor}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;

