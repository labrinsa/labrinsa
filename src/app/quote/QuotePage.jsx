import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Send, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';

const QuotePage = () => {
    const { quoteItems, updateQuantity, removeFromQuote, clearQuote } = useQuote();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        honeypot: '' // Anti-spam field
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendQuote = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    quoteItems: quoteItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity
                    }))
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                clearQuote();
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error sending quote:', error);
            setStatus('error');
            setErrorMessage('No se pudo conectar con el servidor. Revisa tu conexión.');
        }
    };

    if (quoteItems.length === 0 && status !== 'success') {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu lista de presupuesto está vacía</h1>
                    <p className="text-gray-500 mb-8">Agrega algunos productos para solicitar una cotización.</p>
                    <Link to="/products" className="bg-[#e63946] text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg inline-block">
                        Ver Productos
                    </Link>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-green-50 p-12 rounded-3xl shadow-sm border border-green-100 max-w-lg">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <Send size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Solicitud Enviada!</h2>
                    <p className="text-gray-600 mb-8">
                        Hemos recibido tu solicitud de presupuesto correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad posible.
                    </p>
                    <Link
                        to="/products"
                        className="bg-[#005fa3] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg inline-block"
                    >
                        Seguir Explorando
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-yellow-400 via-red-600 to-red-700 py-12 px-6 md:px-20 text-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Presupuesto Sugerido</h1>
                    <nav className="flex items-center text-sm opacity-90 italic">
                        <Link to="/" className="hover:underline">Inicio</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span>Presupuesto</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Lista de Productos */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50">
                                <h2 className="text-xl font-bold text-gray-800">Productos Seleccionados</h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {quoteItems.map((item) => (
                                    <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group">
                                        <div className="w-20 h-20 flex-shrink-0 bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                                            <p className="text-xs text-gray-400 italic">{item.category}</p>
                                        </div>
                                        <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="font-bold text-gray-800 min-w-[20px] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromQuote(item.id)}
                                            className="text-gray-300 hover:text-red-600 transition-colors p-2"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <button
                                onClick={clearQuote}
                                className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2"
                                disabled={status === 'loading'}
                            >
                                <Trash2 size={16} /> Limpiar lista
                            </button>
                            <Link to="/products" className={`text-[#005fa3] font-bold hover:underline ${status === 'loading' ? 'pointer-events-none opacity-50' : ''}`}>
                                + Agregar más productos
                            </Link>
                        </div>
                    </div>

                    {/* Formulario de Contacto */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tus Datos</h2>
                            <form onSubmit={handleSendQuote} className="space-y-4">
                                {/* Honeypot field - hidden from users */}
                                <div className="hidden">
                                    <input
                                        type="text"
                                        name="honeypot"
                                        value={formData.honeypot}
                                        onChange={handleChange}
                                        tabIndex="-1"
                                        autoComplete="off"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1 italic">Nombre Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        disabled={status === 'loading'}
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:opacity-50"
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1 italic">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        disabled={status === 'loading'}
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:opacity-50"
                                        placeholder="ejemplo@correo.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1 italic">Mensaje (Opcional)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        disabled={status === 'loading'}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none disabled:opacity-50"
                                        placeholder="Comentarios adicionales sobre tu pedido..."
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-start gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm italic">
                                        <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                                        <p>{errorMessage}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-[#e63946] text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-3 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Solicitar Presupuesto
                                        </>
                                    )}
                                </button>
                                <p className="text-[10px] text-gray-400 text-center italic mt-4">
                                    Al hacer clic, nuestro equipo recibirá automáticamente tu solicitud para procesarla de inmediato.
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default QuotePage;
