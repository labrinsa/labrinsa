import React, { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Cliente Labrinsa.net',
        message: '',
        honeypot: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Hubo un error al enviar el mensaje.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setErrorMessage('No se pudo conectar con el servidor.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Sección Superior: Info Cards y Formulario */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                    {/* Columna Izquierda: Tarjetas de Información */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {/* Card Email */}
                            <div className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center rounded-xl">
                                <div className="bg-red-50 p-3 rounded-full mb-4">
                                    <Mail className="text-red-600 w-6 h-6" />
                                </div>
                                <a href="mailto:labrin.atencionalcliente@gmail.com" className="text-gray-600 font-medium hover:text-red-600 transition-colors">
                                    labrin.atencionalcliente@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Card Dirección */}
                        <div className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center rounded-xl">
                            <div className="bg-red-50 p-3 rounded-full mb-4">
                                <MapPin className="text-red-600 w-6 h-6" />
                            </div>
                            <p className="text-gray-600 font-medium">
                                Av. 59, Nº. 140-535, Zona industrial primera etapa, Maracaibo
                            </p>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario de Contacto */}
                    <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-xl relative overflow-hidden">
                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                <div className="bg-green-100 p-4 rounded-full mb-6">
                                    <CheckCircle className="text-green-600 w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                                <p className="text-gray-600 mb-8">Gracias por contactarnos. Te responderemos lo antes posible.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="bg-[#e3342f] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot */}
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
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nombre *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                                        required
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Correo electrónico *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                                        required
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all disabled:opacity-50 resize-none"
                                        required
                                        disabled={status === 'loading'}
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg text-sm italic">
                                        <AlertCircle size={18} className="flex-shrink-0" />
                                        <p>{errorMessage}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-[#e3342f] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="animate-spin w-5 h-5" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Enviar
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Sección Inferior: Mapa */}
                <div className="w-full h-[450px] shadow-lg rounded-2xl overflow-hidden border border-gray-200">
                    <iframe
                        title="Google Maps Location"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7843.757524524806!2d-71.66197!3d10.588651!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e89974a2fa0d881%3A0xaf2554328ea314d4!2sLaboratorio%20Rincon!5e0!3m2!1sen!2sus!4v1768773971812!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;