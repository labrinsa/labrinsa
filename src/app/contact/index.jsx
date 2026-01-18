import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
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
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    honeypot: ''
                });
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setErrorMessage('No se pudo conectar con el servidor. Revisa tu conexión.');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-green-100 max-w-lg">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Mensaje Enviado!</h2>
                    <p className="text-gray-600 mb-8">
                        Gracias por contactarnos. Hemos recibido tu mensaje correctamente y nuestro equipo te responderá a la brevedad posible.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="bg-[#e3342f] text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg inline-block"
                    >
                        Enviar otro mensaje
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Sección Superior: Info Cards y Formulario */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                    {/* Columna Izquierda: Tarjetas de Información */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card Teléfono */}
                            <div className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="bg-red-50 p-3 rounded-full mb-4">
                                    <Phone className="text-red-600 w-6 h-6" />
                                </div>
                                <p className="text-gray-600 font-medium">(0261) 736 2383</p>
                                <p className="text-gray-600 font-medium">(0261) 717 0689</p>
                            </div>

                            {/* Card Email */}
                            <div className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="bg-red-50 p-3 rounded-full mb-4">
                                    <Mail className="text-red-600 w-6 h-6" />
                                </div>
                                <a href="mailto:info@labrinsa.com" className="text-gray-600 font-medium hover:text-red-600 transition-colors">
                                    info@labrinsa.com
                                </a>
                            </div>
                        </div>

                        {/* Card Dirección (Ancho completo en su columna) */}
                        <div className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="bg-red-50 p-3 rounded-full mb-4">
                                <MapPin className="text-red-600 w-6 h-6" />
                            </div>
                            <p className="text-gray-600 font-medium">
                                Av. 59, Nº. 140-535, Zona industrial primera etapa, Maracaibo
                            </p>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario de Contacto */}
                    <div className="bg-white p-8 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Honeypot field */}
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
                                    disabled={status === 'loading'}
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Correo electrónico *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={status === 'loading'}
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Asunto *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={status === 'loading'}
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={status === 'loading'}
                                    rows="4"
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 bg-white"
                                    required
                                ></textarea>
                            </div>

                            {status === 'error' && (
                                <div className="flex items-start gap-2 text-red-600 bg-red-50 p-4 rounded text-sm mb-4">
                                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-[#e3342f] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors shadow-md flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                    </div>
                </div>

                {/* Sección Inferior: Mapa */}
                <div className="w-full h-[450px] shadow-lg rounded-lg overflow-hidden border border-gray-200">
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