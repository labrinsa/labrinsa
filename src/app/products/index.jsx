import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products, categories } from '../../data/mockData';
import SearchBar from '../../components/common/SearchBar';

const ProductsPage = () => {
    const ITEMS_PER_PAGE = 8; // Configurable max items per page

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedCategory = searchParams.get('category');
    const urlSearchQuery = searchParams.get('search') || '';

    // Estado para la página actual y búsqueda
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

    // Sync search query from URL when it changes
    useEffect(() => {
        if (urlSearchQuery !== searchQuery) {
            setSearchQuery(urlSearchQuery);
        }
    }, [urlSearchQuery]);


    // Reset pagination when category or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });


    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Simulación de productos (esto vendría de tu API)
    // const products = ... (removed)

    return (
        <main className="min-h-screen bg-white pb-20">
            {/* 1. Hero Banner (Diseño previo) */}
            <section className="bg-gradient-to-r from-[#ffdf00] via-[#ffdf00] to-[#e63946] py-12 px-6 md:px-20 mb-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedCategory ? selectedCategory : 'Productos'}</h1>
                    <nav className="text-sm text-gray-800 font-medium italic">
                        <Link to="/">Inicio</Link> <span className="mx-1">›</span> <Link to="/products" className="hover:underline">Productos</Link>
                        {selectedCategory && (
                            <>
                                <span className="mx-1">›</span>
                                <span className="font-bold">{selectedCategory}</span>
                            </>
                        )}
                    </nav>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Lado Izquierdo: Galería y Paginación */}
                    <div className="flex-1">

                        {/* Grid de Productos */}
                        {currentProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
                                {currentProducts.map((product) => (
                                    <Link to={`/products/${product.id}`} key={product.id} className="group flex flex-col items-center text-center">
                                        <div className="h-40 w-full flex items-center justify-center mb-4 bg-white border border-gray-50 rounded-xl p-4 overflow-hidden shadow-sm">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 className="text-[14px] font-medium text-gray-800 leading-tight group-hover:text-red-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                <p>No se encontraron productos en esta categoría.</p>
                                <Link to="/products" className="text-red-600 hover:underline mt-4 inline-block">Ver todos los productos</Link>
                            </div>
                        )}

                        {/* --- ENUMERACIÓN / PAGINACIÓN --- */}
                        <div className="flex justify-center items-center space-x-4 mt-12 border-t border-gray-100 pt-8">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                const isActive = currentPage === pageNum;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all
                                            ${isActive
                                                ? 'bg-[#e63946] text-white shadow-md scale-110'
                                                : 'text-gray-400 hover:text-red-600'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* Botón Siguiente (Flecha) */}
                            {currentPage < totalPages && (
                                <button
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="text-gray-400 hover:text-red-600 font-bold text-lg ml-2"
                                >
                                    →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar (Categorías) */}
                    <aside className="w-full md:w-72 space-y-12">
                        {/* Buscador y categorías como el diseño anterior... */}
                        <SearchBar
                            className="mb-10"
                            initialValue={searchQuery}
                            onSearch={(query) => setSearchQuery(query)}
                            showSuggestions={false}
                        />


                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Categorías del producto</h2>
                            <ul className="space-y-4 text-[15px] font-medium text-gray-700">
                                <Link to="/products" className={`block hover:text-red-600 cursor-pointer transition-colors ${!selectedCategory ? 'text-red-600 font-bold' : ''}`}>
                                    Todos los productos
                                </Link>
                                {categories.map((category, index) => (
                                    <Link
                                        key={index}
                                        to={`/products?category=${encodeURIComponent(category)}`}
                                        className={`block hover:text-red-600 cursor-pointer transition-colors ${selectedCategory === category ? 'text-red-600 font-bold' : ''}`}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default ProductsPage;