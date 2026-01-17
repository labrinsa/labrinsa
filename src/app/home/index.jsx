import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/mockData'
import Slider from '../../components/common/Slider'
export default function Home() {
    const [count, setCount] = useState(0)
    // Categories imported from mockData

    return (
        <>
            <Slider />
            <section className="bg-white py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Tarjeta de Misión (Ocupa 2 columnas en desktop) */}
                    <div className="md:col-span-2 bg-[#e8f4f9] p-8 md:p-12 rounded-sm flex flex-col justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Laboratorios Rincón S.A.
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-8">
                                Laboratorios Rincón tiene como misión la fabricación y venta de fármacos de uso
                                veterinario de alta calidad para satisfacer los requerimientos de médicos veterinarios y
                                productores agropecuarios de Venezuela a precios competitivos, aportando a través de
                                su trabajo el crecimiento organizacional e integral de su personal, sus clientes y el país.
                            </p>
                        </div>
                        <button className="bg-[#d32f2f] hover:bg-red-700 text-white font-medium py-3 px-10 rounded-full transition-colors">
                            Ver más
                        </button>
                    </div>

                    {/* Tarjeta de Contacto (Ocupa 1 columna) */}
                    <div className="bg-[#f2ebe4] p-8 md:p-12 rounded-sm flex flex-col justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Contacto
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-8">
                                Comuníquese con nosotros de la forma que más le convenga
                            </p>
                        </div>
                        <button className="bg-[#d32f2f] hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
                            Enviar mensaje
                        </button>
                    </div>

                </div>
            </section>
            <section className="bg-white py-12 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Título de la sección */}
                <h2 className="text-2xl font-bold text-black mb-8">
                    Categorías
                </h2>

                {/* Lista de categorías */}
                <div className="flex flex-col space-y-4">
                    {categories.map((category, index) => (
                        <Link
                            to={`/products?category=${encodeURIComponent(category)}`}
                            key={index}
                            className="group cursor-pointer w-fit"
                        >
                            <span className="text-xl md:text-2xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-red-600">
                                {category}
                            </span>
                            {/* Opcional: Una línea decorativa sutil que aparece al hacer hover */}
                            <div className="h-0.5 bg-red-600 w-0 transition-all duration-300 group-hover:w-full"></div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

