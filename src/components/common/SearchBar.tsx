import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { products } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    onItemClick?: (productId: number) => void;
    showSuggestions?: boolean;
    className?: string;
    initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Buscar productos...",
    onSearch,
    onItemClick,
    showSuggestions = true,
    className = "",
    initialValue = ""
}) => {
    const [searchQuery, setSearchQuery] = useState(initialValue);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSearchQuery(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsSuggestionsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredProducts = searchQuery.trim() === ''
        ? []
        : products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 8);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            if (onSearch) {
                onSearch(trimmedQuery);
            } else {
                navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
            }
            setIsSuggestionsOpen(false);
        }
    };

    const handleItemClick = (productId: number) => {
        // Always navigate to product
        navigate(`/products/${productId}`);

        if (onItemClick) {
            onItemClick(productId);
        }
        setSearchQuery('');
        setIsSuggestionsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="relative flex-1 flex items-center">
                    <SearchIcon size={18} className="absolute left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="w-full pl-10 pr-10 py-2 text-sm bg-gray-50 border border-transparent focus:border-red-200 focus:bg-white transition-all rounded-full outline-none"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsSuggestionsOpen(true);
                        }}
                        onFocus={() => setIsSuggestionsOpen(true)}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                if (onSearch) onSearch('');
                            }}
                            className="absolute right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
                {onSearch && (
                    <button
                        type="submit"
                        className="bg-[#e63946] hover:bg-red-700 transition-colors text-white px-6 py-2 rounded-full text-sm font-bold flex items-center"
                    >
                        Buscar
                    </button>
                )}
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && isSuggestionsOpen && searchQuery.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden z-[60]">
                    <div className="max-h-80 overflow-y-auto">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => handleItemClick(product.id)}
                                    className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                                >
                                    <img src={product.image} alt={product.name} className="w-10 h-10 object-contain bg-white rounded border border-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{product.category}</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500 italic">
                                No se encontraron productos
                            </div>
                        )}
                    </div>
                    {searchQuery.trim() !== '' && (
                        <button
                            onClick={handleSubmit}
                            className="w-full p-3 text-center text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50"
                        >
                            Ver todos los resultados para "{searchQuery}"
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
