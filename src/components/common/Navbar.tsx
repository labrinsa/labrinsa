'use client'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { useQuote } from '../../context/QuoteContext'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalItems } = useQuote();

    return (
        <nav className="bg-white border-b border-gray-100 px-4 py-3 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <img src="/cropped-Logo-Labrin-solo-small.png" alt="Logo" className="h-8 md:h-10 w-auto" />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-700 hover:text-red-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `transition-colors text-sm ${isActive ? 'text-gray-900 font-bold hover:text-red-600' : 'text-gray-400 font-medium hover:text-gray-600'}`
                        }
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `transition-colors text-sm ${isActive ? 'text-gray-900 font-bold hover:text-red-600' : 'text-gray-400 font-medium hover:text-gray-600'}`
                        }
                    >
                        Productos
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `transition-colors text-sm ${isActive ? 'text-gray-900 font-bold hover:text-red-600' : 'text-gray-400 font-medium hover:text-gray-600'}`
                        }
                    >
                        Nosotros
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `transition-colors text-sm ${isActive ? 'text-gray-900 font-bold hover:text-red-600' : 'text-gray-400 font-medium hover:text-gray-600'}`
                        }
                    >
                        Contáctenos
                    </NavLink>

                    <NavLink
                        to="/quote"
                        className={({ isActive }) =>
                            `transition-colors text-sm flex items-center gap-1 ${isActive ? 'text-gray-900 font-bold hover:text-red-600' : 'text-gray-400 font-medium hover:text-gray-600'}`
                        }
                    >
                        <div className="relative">
                            <FileText size={18} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                        Presupuesto
                    </NavLink>

                    <button className="text-gray-700 hover:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                <div className="hidden lg:flex flex-col items-end gap-3">
                    <div className="flex gap-3">
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>

                    </div>
                    <div className="flex gap-3">
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>

                    </div>
                    <div className="flex gap-3">
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>

                    </div>
                    <div className="flex gap-3">
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>

                    </div>
                    <div className="flex gap-3">
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                        <span className="w-2 h-1 bg-red-700"></span>
                    </div>
                </div>

            </div>

            {/* Mobile Menu Backdrop */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <img src="/cropped-Logo-Labrin-solo-small.png" alt="Logo" className="h-8" />
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-500 hover:text-red-600 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `hover:text-red-600 text-lg border-b border-gray-100 pb-2 ${isActive ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}`
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `hover:text-red-600 text-lg border-b border-gray-100 pb-2 ${isActive ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}`
                            }
                        >
                            Productos
                        </NavLink>
                        <NavLink
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `hover:text-red-600 text-lg border-b border-gray-100 pb-2 ${isActive ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}`
                            }
                        >
                            Nosotros
                        </NavLink>
                        <NavLink
                            to="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `hover:text-red-600 text-lg border-b border-gray-100 pb-2 ${isActive ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}`
                            }
                        >
                            Contáctenos
                        </NavLink>
                        <NavLink
                            to="/quote"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `hover:text-red-600 text-lg border-b border-gray-100 pb-2 flex items-center justify-between ${isActive ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}`
                            }
                        >
                            Presupuesto
                            {totalItems > 0 && (
                                <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                    {totalItems}
                                </span>
                            )}
                        </NavLink>
                        <button className="flex items-center text-gray-600 hover:text-red-600 font-medium text-lg border-b border-gray-100 pb-2 w-full text-left">
                            <span className="mr-2">Buscar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
