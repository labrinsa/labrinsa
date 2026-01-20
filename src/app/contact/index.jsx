import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Sección Superior: Info Cards y Formulario */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                    {/* Columna Izquierda: Tarjetas de Información */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {/* Card Teléfono 
                            <div className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="bg-red-50 p-3 rounded-full mb-4">
                                    <Phone className="text-red-600 w-6 h-6" />
                                </div>
                                <p className="text-gray-600 font-medium">(0261) 736 2383</p>
                                <p className="text-gray-600 font-medium">(0261) 717 0689</p>
                            </div>
                                */}
                            {/* Card Email */}
                            <div className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="bg-red-50 p-3 rounded-full mb-4">
                                    <Mail className="text-red-600 w-6 h-6" />
                                </div>
                                <a href="mailto:info@labrinsa.com" className="text-gray-600 font-medium hover:text-red-600 transition-colors">
                                    labrin.atencionalcliente@gmail.com
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
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre *</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Correo electrónico *</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Asunto *</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje *</label>
                                <textarea
                                    rows="4"
                                    className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#e3342f] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors shadow-md"
                            >
                                Enviar
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