import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Search, Check } from 'lucide-react';
import { products } from '../../data/mockData';
import { useQuote } from '../../context/QuoteContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToQuote } = useQuote();
    const [added, setAdded] = React.useState(false);

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">Producto no encontrado</h1>
            </div>
        );
    }

    const handleAddToQuote = () => {
        addToQuote(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* --- BANNER SUPERIOR CON DEGRADADO --- */}
            <div className="bg-gradient-to-r from-yellow-400 via-red-600 to-red-700 py-12 px-6 md:px-20 text-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {product.name}
                    </h1>
                    <nav className="flex items-center text-sm opacity-90">
                        <Link to="/" className="hover:underline">Inicio</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <Link to="/products" className="hover:underline">Productos</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:underline opacity-80">{product.category}</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span>{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* --- SECCIÓN DE CONTENIDO --- */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Columna Izquierda: Imagen del Producto */}
                <div className="relative flex justify-center items-start group">
                    <div className="relative w-full max-w-md">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto object-contain"
                        />
                        {/* Icono de Lupa (Zoom) */}
                        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                            <Search size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Columna Derecha: Información Técnica */}
                <div className="text-gray-800">
                    {/* Tabla de Composición */}
                    {product.composition && product.composition.length > 0 && (
                        <table className="w-full border-collapse border border-gray-200 mb-8">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th colSpan="2" className="border border-gray-200 p-3 text-left font-bold">
                                        Composición:
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.composition.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 p-3">{item.name}</td>
                                        <td className="border border-gray-200 p-3 w-32">{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Secciones de Texto */}
                    <div className="space-y-6 text-sm leading-relaxed">
                        {product.indications && product.indications.length > 0 && (
                            <section>
                                <h3 className="font-bold mb-1 uppercase tracking-tight">Indicaciones:</h3>
                                <ul className="list-none space-y-1">
                                    {product.indications.map((indication, index) => (
                                        <li key={index}>{indication}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {product.warnings && product.warnings.length > 0 && (
                            <section>
                                <h3 className="font-bold mb-1 uppercase tracking-tight">Advertencias:</h3>
                                <ul className="list-none space-y-1">
                                    {product.warnings.map((warning, index) => (
                                        <li key={index}>{warning}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {product.pdfPath && (
                            <div className="pt-4">
                                <a
                                    href={product.pdfPath}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black font-bold inline-flex items-center hover:text-red-600 transition-colors underline underline-offset-4"
                                >
                                    Descargar ficha técnica
                                </a>
                            </div>
                        )}

                        {/* Botón de Acción */}
                        <div className="pt-6">
                            <button
                                onClick={handleAddToQuote}
                                className={`flex items-center justify-center gap-2 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg ${added ? 'bg-green-600' : 'bg-[#005fa3] hover:bg-[#004a80]'
                                    }`}
                            >
                                {added ? (
                                    <>
                                        <Check size={20} />
                                        Agregado
                                    </>
                                ) : (
                                    'Agregar a presupuesto'
                                )}
                            </button>
                        </div>

                        {/* Categoría */}
                        <div className="pt-8 text-xs border-t border-gray-100">
                            <span className="text-gray-500">Categoría: </span>
                            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="text-gray-800 font-medium italic hover:text-red-600 transition-colors">{product.category}</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;
